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
import { ResponseSalidas } from "./types";

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
        destino: sql<any>`COALESCE(json_build_object('id', ${inventarioAreaventa.id}, 'nombre', ${inventarioAreaventa.nombre}), json_build_object('id', 0, 'nombre', 'Almacen Revoltosa'))`,
        producto: countDistinct(inventarioProductoinfo),
        cantidad: count(inventarioProducto),
        detalle: sql<any>`COALESCE((
          SELECT json_agg(row_to_json(det))
          FROM (
            SELECT 
              pi2.id, 
              pi2.descripcion AS nombre, 
              COUNT(p2.id) AS cantidad,
              CASE WHEN c2.nombre = 'Zapatos' THEN true ELSE false END AS "esZapato",
              CASE 
                WHEN c2.nombre = 'Zapatos' THEN (
                  SELECT string_agg(p3.id::text, ', ')
                  FROM inventario_producto p3
                  INNER JOIN inventario_productoinfo pi3 ON p3."info_id" = pi3.id
                  INNER JOIN inventario_categorias c3 ON pi3."categoria_id" = c3.id
                  WHERE p3."salida_id" = ${inventarioSalidaalmacen.id} AND c3.nombre = 'Zapatos'
                )
                ELSE ''
              END AS zapatos_id
            FROM inventario_producto p2
            INNER JOIN inventario_productoinfo pi2 ON p2."info_id" = pi2.id
            INNER JOIN inventario_categorias c2 ON pi2."categoria_id" = c2.id
            WHERE p2."salida_id" = ${inventarioSalidaalmacen.id}
            GROUP BY pi2.id, pi2.descripcion, c2.nombre
            ORDER BY pi2.descripcion
          ) det
        ), '[]')`,
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
        inventarioAreaventa.id,
        inventarioAreaventa.nombre,
        inventarioSalidaalmacen.createdAt
      )
      .orderBy(desc(inventarioSalidaalmacen.createdAt));

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
