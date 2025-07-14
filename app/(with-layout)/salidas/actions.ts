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

export async function addSalida(data: InferInput<typeof SalidaSchema>) {
  const { userId } = getSession();
  try {
    const salidaInsertada = await db
      .insert(inventarioSalidaalmacen)
      .values({
        usuarioId: Number(userId),
        areaVentaId: Number(data.destino),
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
            areaVentaId: Number(data.destino),
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
            areaVentaId: Number(data.destino),
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
