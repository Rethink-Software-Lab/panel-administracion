"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { InferInput } from "valibot";
import { SalidaSchema } from "./schema";
import { db } from "@/db/initial";
import {
  inventarioAjusteinventarioProductos,
  inventarioProducto,
  inventarioSalidaalmacen,
} from "@/db/schema";
import { getSession } from "@/lib/getSession";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { ValidationError } from "@/lib/errors";

export async function addSalida(data: InferInput<typeof SalidaSchema>) {
  const { userId } = getSession();
  try {
    const esAlmacenRevoltosa = data.destino === "almacen-revoltosa";
    const areaVentaId = esAlmacenRevoltosa ? null : Number(data.destino);

    const salidaInsertada = await db
      .insert(inventarioSalidaalmacen)
      .values({
        usuarioId: Number(userId),
        areaVentaId: areaVentaId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    for (const producto of data.productos) {
      if (producto.esZapato) {
        const idsZapatos = producto
          .zapatos_id!.split(",")
          .map((s: string) => Number(s.trim()));

        const productosZapatos = await db
          .select({
            id: inventarioProducto.id,
          })
          .from(inventarioProducto)
          .leftJoin(
            inventarioAjusteinventarioProductos,
            eq(
              inventarioAjusteinventarioProductos.productoId,
              inventarioProducto.id
            )
          )
          .where(
            and(
              inArray(inventarioProducto.id, idsZapatos),
              eq(inventarioProducto.infoId, Number(producto.id)),
              eq(inventarioProducto.almacenRevoltosa, false),
              isNull(inventarioProducto.areaVentaId),
              isNull(inventarioProducto.ventaId),
              isNull(inventarioProducto.salidaId),
              isNull(inventarioProducto.salidaRevoltosaId),
              isNull(inventarioAjusteinventarioProductos.id)
            )
          );

        if (productosZapatos.length < idsZapatos.length) {
          return {
            data: null,
            error: "Verifique que los ids existan en el almacen.",
          };
        }

        await db
          .update(inventarioProducto)
          .set({
            salidaId: salidaInsertada[0].id,
            areaVentaId: areaVentaId,
            almacenRevoltosa: esAlmacenRevoltosa,
          })
          .where(inArray(inventarioProducto.id, idsZapatos));
      } else {
        const productos_en_almacen = await db
          .select({
            id: inventarioProducto.id,
          })
          .from(inventarioProducto)
          .leftJoin(
            inventarioAjusteinventarioProductos,
            eq(
              inventarioAjusteinventarioProductos.productoId,
              inventarioProducto.id
            )
          )
          .where(
            and(
              eq(inventarioProducto.infoId, Number(producto.id)),
              eq(inventarioProducto.almacenRevoltosa, false),
              isNull(inventarioProducto.areaVentaId),
              isNull(inventarioProducto.ventaId),
              isNull(inventarioProducto.salidaId),
              isNull(inventarioProducto.salidaRevoltosaId),
              isNull(inventarioAjusteinventarioProductos.id)
            )
          )
          .limit(Number(producto.cantidad));

        if (productos_en_almacen.length < Number(producto.cantidad)) {
          return {
            data: null,
            error: `No hay productos suficientes en el almacen.`,
          };
        }

        const idsAActualizar = productos_en_almacen.map((p) => p.id);

        await db
          .update(inventarioProducto)
          .set({
            salidaId: salidaInsertada[0].id,
            areaVentaId: areaVentaId,
            almacenRevoltosa: esAlmacenRevoltosa,
          })
          .where(inArray(inventarioProducto.id, idsAActualizar));
      }
    }
    revalidatePath("/salidas");
    return {
      data: "Salida agregada con éxito.",
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Error al agregar la salida.",
    };
  }
}

interface ProductoSchemaSalida {
  id: string;
  esZapato: boolean;
  cantidad?: number | undefined;
  zapatos_id?: string | undefined;
}

async function procesarZapatos(
  producto: ProductoSchemaSalida,
  salidaId: number,
  areaVentaId: number | null,
  esAlmacenRevoltosa: boolean
) {
  const idsZapatos = producto
    .zapatos_id!.split(",")
    .map((s: string) => Number(s.trim()));

  const productosZapatos = await db
    .select({
      id: inventarioProducto.id,
    })
    .from(inventarioProducto)
    .leftJoin(
      inventarioAjusteinventarioProductos,
      eq(inventarioAjusteinventarioProductos.productoId, inventarioProducto.id)
    )
    .where(
      and(
        eq(inventarioProducto.salidaId, salidaId),
        eq(inventarioProducto.infoId, Number(producto.id)),
        areaVentaId
          ? eq(inventarioProducto.areaVentaId, areaVentaId)
          : isNull(inventarioProducto.areaVentaId),
        eq(inventarioProducto.almacenRevoltosa, esAlmacenRevoltosa),
        isNull(inventarioProducto.ventaId),
        isNull(inventarioProducto.salidaRevoltosaId),
        isNull(inventarioAjusteinventarioProductos.id)
      )
    );

  const { agregados, eliminados } = obtenerDiferencias(
    productosZapatos.map((p) => p.id),
    idsZapatos
  );

  if (agregados.length > 0) {
    const validatedProducts = await db
      .select({
        id: inventarioProducto.id,
      })
      .from(inventarioProducto)
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioAjusteinventarioProductos.productoId,
          inventarioProducto.id
        )
      )
      .where(
        and(
          inArray(inventarioProducto.id, agregados),
          eq(inventarioProducto.infoId, Number(producto.id)),
          eq(inventarioProducto.almacenRevoltosa, false),
          isNull(inventarioProducto.ventaId),
          isNull(inventarioProducto.salidaId),
          isNull(inventarioProducto.salidaRevoltosaId),
          isNull(inventarioAjusteinventarioProductos.id)
        )
      );

    if (validatedProducts.length < agregados.length) {
      throw new ValidationError(
        "Algunos Ids no corresponden con productos disponibles."
      );
    }

    await db
      .update(inventarioProducto)
      .set({
        salidaId,
        areaVentaId,
        almacenRevoltosa: esAlmacenRevoltosa,
      })
      .where(inArray(inventarioProducto.id, agregados));
  }

  if (eliminados.length > 0) {
    await db
      .update(inventarioProducto)
      .set({
        salidaId: null,
        areaVentaId: null,
        almacenRevoltosa: false,
      })
      .where(inArray(inventarioProducto.id, eliminados));
  }
}

async function procesarProducto(
  producto: ProductoSchemaSalida,
  salidaId: number,
  areaVentaId: number | null,
  esAlmacenRevoltosa: boolean
) {
  const productos = await db
    .select({
      id: inventarioProducto.id,
    })
    .from(inventarioProducto)
    .leftJoin(
      inventarioAjusteinventarioProductos,
      eq(inventarioAjusteinventarioProductos.productoId, inventarioProducto.id)
    )
    .where(
      and(
        eq(inventarioProducto.salidaId, salidaId),
        eq(inventarioProducto.infoId, Number(producto.id)),
        areaVentaId
          ? eq(inventarioProducto.areaVentaId, areaVentaId)
          : isNull(inventarioProducto.areaVentaId),
        eq(inventarioProducto.almacenRevoltosa, esAlmacenRevoltosa),
        isNull(inventarioProducto.ventaId),
        isNull(inventarioProducto.salidaRevoltosaId),
        isNull(inventarioAjusteinventarioProductos.id)
      )
    );
  const cantidad = producto.cantidad || 0;
  const diferencia = productos.length - cantidad;

  if (cantidad > productos.length) {
    // Los del almacen
    const productosParaActualizar = await db
      .select({
        id: inventarioProducto.id,
      })
      .from(inventarioProducto)
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioAjusteinventarioProductos.productoId,
          inventarioProducto.id
        )
      )
      .where(
        and(
          eq(inventarioProducto.infoId, Number(producto.id)),
          eq(inventarioProducto.almacenRevoltosa, false),
          isNull(inventarioProducto.ventaId),
          isNull(inventarioProducto.salidaId),
          isNull(inventarioProducto.salidaRevoltosaId),
          isNull(inventarioAjusteinventarioProductos.id)
        )
      )
      .limit(diferencia);

    if (productosParaActualizar.length < cantidad) {
      throw new ValidationError("No hay productos suficientes en el almacen.");
    }

    await db
      .update(inventarioProducto)
      .set({
        salidaId,
        areaVentaId,
        almacenRevoltosa: esAlmacenRevoltosa,
      })
      .where(
        inArray(
          inventarioProducto.id,
          productosParaActualizar.map((p) => p.id)
        )
      );
  }
  if (cantidad < productos.length) {
    const productosParaActualizar = productos.slice(0, diferencia);

    if (productosParaActualizar.length < diferencia) {
      throw new ValidationError("Algunos productos ya no estan en el area.");
    }

    await db
      .update(inventarioProducto)
      .set({
        salidaId: null,
        areaVentaId: null,
        almacenRevoltosa: false,
      })
      .where(
        inArray(
          inventarioProducto.id,
          productosParaActualizar.map((p) => p.id)
        )
      );
  }
}

function obtenerDiferencias(anteriores: number[], nuevos: number[]) {
  const anterioresSet = new Set(anteriores);
  const nuevosSet = new Set(nuevos);

  const agregados = nuevos.filter((id) => !anterioresSet.has(id));
  const eliminados = anteriores.filter((id) => !nuevosSet.has(id));

  return { agregados, eliminados };
}

export async function updateSalida(
  data: InferInput<typeof SalidaSchema>,
  salidaId: number
): Promise<{ data: string | null; error: string | null }> {
  try {
    const esAlmacenRevoltosa = data.destino === "almacen-revoltosa";
    const areaVentaId = esAlmacenRevoltosa ? null : Number(data.destino);

    const salida = await db.$count(
      inventarioSalidaalmacen,
      eq(inventarioSalidaalmacen.id, salidaId)
    );

    if (salida === 0) {
      throw new ValidationError("La salida no existe.");
    }

    for (const producto of data.productos) {
      if (producto.esZapato) {
        await procesarZapatos(
          producto,
          salidaId,
          areaVentaId,
          esAlmacenRevoltosa
        );
      } else if (!producto.esZapato && producto.cantidad) {
        await procesarProducto(
          producto,
          salidaId,
          areaVentaId,
          esAlmacenRevoltosa
        );
      }
    }
    revalidatePath("/salidas");
    return {
      data: "Salida editada con exito.",
      error: null,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      return {
        data: null,
        error: error.message,
      };
    } else {
      return {
        data: null,
        error: "Error al editar la salida.",
      };
    }
  }
}

export async function deleteSalida({ id }: { id: number }) {
  const token = cookies().get("session")?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + "/salidas/" + id + "/", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: "No autorizado",
      };
    if (res.status === 400)
      return {
        data: null,
        error: "Algunos productos ya han sido vendidos",
      };
    if (res.status === 404)
      return {
        data: null,
        error: "Salida no encontrada",
      };
    return {
      data: null,
      error: "Algo salió mal.",
    };
  }
  revalidatePath(`/salidas/`);
  return {
    data: "Salida eliminada con éxito.",
    error: null,
  };
}
