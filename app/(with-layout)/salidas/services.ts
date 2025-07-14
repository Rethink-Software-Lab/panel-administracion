import { db } from "@/db/initial";
import {
  inventarioAjusteinventarioProductos,
  inventarioAreaventa,
  inventarioCategorias,
  inventarioProducto,
  inventarioProductoinfo,
  inventarioSalidaalmacen,
  inventarioUser,
} from "@/db/schema";
import {
  and,
  count,
  countDistinct,
  desc,
  eq,
  gt,
  isNull,
  sql,
} from "drizzle-orm";
import { ResponseDetalleSalida, ResponseSalidas } from "./types";

export async function getSalidas(): Promise<{
  data: ResponseSalidas | null;
  error: string | null;
}> {
  try {
    const salidas = await db
      .select({
        id: inventarioSalidaalmacen.id,
        createdAt: inventarioSalidaalmacen.createdAt,
        usuario: sql<string>`COALESCE (${inventarioUser.username}, 'Usuario eliminado')`,
        destino: sql<string>`COALESCE (${inventarioAreaventa.nombre}, 'Almacen Revoltosa')`,
        producto: countDistinct(inventarioProductoinfo),
        cantidad: count(inventarioProducto),
      })
      .from(inventarioSalidaalmacen)
      .leftJoin(
        inventarioUser,
        eq(inventarioSalidaalmacen.usuarioId, inventarioUser.id)
      )
      .leftJoin(
        inventarioAreaventa,
        eq(inventarioSalidaalmacen.areaVentaId, inventarioAreaventa.id)
      )
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.salidaId, inventarioSalidaalmacen.id)
      )
      .innerJoin(
        inventarioProductoinfo,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .groupBy(
        inventarioSalidaalmacen.id,
        inventarioUser.username,
        inventarioAreaventa.nombre
      )
      .orderBy(desc(inventarioSalidaalmacen.createdAt))
      .limit(10);

    const productos_en_almacen_principal = await db
      .selectDistinct({
        id: inventarioProductoinfo.id,
        nombre: inventarioProductoinfo.descripcion,
        esZapato: sql<boolean>`CASE WHEN ${inventarioCategorias.nombre} = 'Zapatos' THEN true ELSE false END`,
      })
      .from(inventarioProductoinfo)
      .innerJoin(
        inventarioProducto,
        and(
          eq(inventarioProducto.infoId, inventarioProductoinfo.id),
          isNull(inventarioProducto.ventaId),
          isNull(inventarioProducto.salidaId),
          isNull(inventarioProducto.salidaRevoltosaId)
        )
      )
      .innerJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioAjusteinventarioProductos.productoId,
          inventarioProducto.id
        )
      )
      .where(isNull(inventarioAjusteinventarioProductos.id))
      .having(gt(count(inventarioProducto), 0))
      .groupBy(
        inventarioProductoinfo.id,
        inventarioProductoinfo.descripcion,
        inventarioCategorias.nombre
      );

    const areasVenta = await db
      .select({
        id: inventarioAreaventa.id,
        nombre: inventarioAreaventa.nombre,
      })
      .from(inventarioAreaventa);

    return {
      data: { salidas, productos: productos_en_almacen_principal, areasVenta },
      error: null,
    };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al obtener las salidas" };
  }
}

export async function getDetalleSalida(
  salidaId: number
): Promise<{ data: ResponseDetalleSalida[] | null; error: string | null }> {
  try {
    const result = await db
      .select({
        id: inventarioProductoinfo.id,
        nombre: inventarioProductoinfo.descripcion,
        cantidad: count(inventarioProducto.id),
      })
      .from(inventarioProducto)
      .innerJoin(
        inventarioProductoinfo,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .where(eq(inventarioProducto.salidaId, salidaId))
      .groupBy(inventarioProductoinfo.id, inventarioProductoinfo.descripcion)
      .orderBy(inventarioProductoinfo.descripcion);
    return {
      data: result,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al obtener el detalle de la salida",
    };
  }
}
