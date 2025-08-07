import { cookies } from "next/headers";
import { EndpointOneAreaVenta } from "./types";
import { db } from "@/db/initial";
import {
  inventarioAjusteinventarioProductos,
  inventarioAreaventa,
  inventarioCategorias,
  inventarioCuentas,
  inventarioHistorialprecioventasalon,
  inventarioProducto,
  inventarioProductoinfo,
  inventarioTransacciones,
  inventarioUser,
  inventarioVentas,
} from "@/db/schema";
import { and, eq, gte, isNull, not, sql, count, desc, gt } from "drizzle-orm";
import { ValidationError } from "@/lib/errors";

export async function getAreaVenta(
  id: number
): Promise<{ data: EndpointOneAreaVenta | null; error: string | null }> {
  const token = cookies().get("session")?.value;
  try {
    const areaVenta = await db
      .select()
      .from(inventarioAreaventa)
      .where(eq(inventarioAreaventa.id, id))
      .limit(1);

    if (!areaVenta || areaVenta.length === 0) {
      throw new ValidationError("No se encontro la area de venta");
    }

    const productoInfo = await db
      .select({
        id: inventarioProductoinfo.id,
        descripcion: inventarioProductoinfo.descripcion,
        precio_venta: sql<string>`(
          SELECT precio 
          FROM ${inventarioHistorialprecioventasalon} 
          WHERE ${inventarioHistorialprecioventasalon.productoInfoId} = ${inventarioProductoinfo.id}
          ORDER BY ${inventarioHistorialprecioventasalon.fechaInicio} DESC 
          LIMIT 1
        )`,
        cantidad: count(inventarioProducto.id),
        categoria_nombre: inventarioCategorias.nombre,
      })
      .from(inventarioProductoinfo)
      .innerJoin(
        inventarioProducto,
        eq(inventarioProductoinfo.id, inventarioProducto.infoId)
      )
      .leftJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioProducto.id,
          inventarioAjusteinventarioProductos.productoId
        )
      )
      .where(
        and(
          isNull(inventarioProducto.ventaId),
          isNull(inventarioAjusteinventarioProductos.ajusteinventarioId),
          eq(inventarioProducto.areaVentaId, Number(id))
        )
      )
      .groupBy(inventarioProductoinfo.id, inventarioCategorias.nombre)
      .having(({ cantidad }) =>
        and(gte(count(), 1), not(eq(inventarioCategorias.nombre, "Zapatos")))
      );

    const zapatos = await db
      .select({
        id: inventarioProducto.id,
        descripcion: inventarioProductoinfo.descripcion,
        color: inventarioProducto.color,
        numero: inventarioProducto.numero,
      })
      .from(inventarioProducto)
      .innerJoin(
        inventarioProductoinfo,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .innerJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioProducto.id,
          inventarioAjusteinventarioProductos.productoId
        )
      )
      .where(
        and(
          eq(inventarioCategorias.nombre, "Zapatos"),
          isNull(inventarioProducto.ventaId),
          eq(inventarioProducto.areaVentaId, Number(id)),
          isNull(inventarioAjusteinventarioProductos.ajusteinventarioId)
        )
      )
      .orderBy(desc(inventarioProducto.id));

    const allProductos = await db
      .select({
        id: inventarioProductoinfo.id,
        descripcion: inventarioProductoinfo.descripcion,
        categoria: inventarioCategorias.nombre,
      })
      .from(inventarioProductoinfo)
      .innerJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .innerJoin(
        inventarioProducto,
        eq(inventarioProductoinfo.id, inventarioProducto.infoId)
      )
      .leftJoin(
        inventarioAjusteinventarioProductos,
        eq(
          inventarioProducto.id,
          inventarioAjusteinventarioProductos.productoId
        )
      )
      .where(
        and(
          eq(inventarioProducto.areaVentaId, Number(id)),
          isNull(inventarioProducto.ventaId),
          isNull(inventarioAjusteinventarioProductos.ajusteinventarioId)
        )
      )
      .groupBy(
        inventarioProductoinfo.id,
        inventarioProductoinfo.descripcion,
        inventarioCategorias.nombre
      );

    const categorias = await db.select().from(inventarioCategorias);

    const ventas = await db
      .select({
        importe: sql<number>`SUM((
          SELECT precio 
          FROM ${inventarioHistorialprecioventasalon} 
          WHERE ${inventarioHistorialprecioventasalon.productoInfoId} = ${inventarioProductoinfo.id}
          ORDER BY ${inventarioHistorialprecioventasalon.fechaInicio} DESC 
          LIMIT 1
        )) - SUM(${inventarioProductoinfo.pagoTrabajador})`,
        created_at: inventarioVentas.createdAt,
        metodo_pago: inventarioVentas.metodoPago,
        usuario: { id: inventarioUser.id, username: inventarioUser.username },
        descripcion: inventarioProductoinfo.descripcion,
        cantidad: count(inventarioProducto.id),
        id: inventarioVentas.id,
      })
      .from(inventarioVentas)
      .innerJoin(
        inventarioProducto,
        eq(inventarioVentas.id, inventarioProducto.ventaId)
      )
      .innerJoin(
        inventarioProductoinfo,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .innerJoin(
        inventarioUser,
        eq(inventarioVentas.usuarioId, inventarioUser.id)
      )
      .where(
        and(
          eq(inventarioVentas.areaVentaId, Number(id)),
          gt(
            inventarioVentas.createdAt,
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          )
        )
      )
      .groupBy(
        inventarioVentas.id,
        inventarioUser.id,
        inventarioUser.username,
        inventarioProductoinfo.descripcion
      )
      .orderBy(desc(inventarioVentas.createdAt));

    const currentMonth = new Date().getMonth() + 1;
    const tarjetas = await db
      .select({
        id: inventarioCuentas.id,
        nombre: inventarioCuentas.nombre,
        banco: inventarioCuentas.banco,
        disponible: sql<boolean>`CASE WHEN COALESCE(SUM(CASE WHEN ${inventarioTransacciones.tipo} = 'INGRESO' AND EXTRACT(MONTH FROM ${inventarioTransacciones.createdAt}) = ${currentMonth} THEN ${inventarioTransacciones.cantidad} ELSE 0 END), 0) >= 120000 THEN FALSE ELSE TRUE END`,
      })
      .from(inventarioCuentas)
      .where(eq(inventarioCuentas.tipo, "BANCARIA"))
      .leftJoin(
        inventarioTransacciones,
        eq(inventarioCuentas.id, inventarioTransacciones.cuentaId)
      )
      .groupBy(inventarioCuentas.id)
      .orderBy(desc(inventarioCuentas.id));
    return {
      error: null,
      data: {
        inventario: {
          productos: productoInfo,
          zapatos,
          categorias,
        },
        ventas,
        area_venta: areaVenta?.[0]?.nombre,
        all_productos: allProductos,
        tarjetas,
      },
    };
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      return {
        data: null,
        error: e.message,
      };
    }
    return {
      data: null,
      error: "Error al obtener la area de venta.",
    };
  }
}
