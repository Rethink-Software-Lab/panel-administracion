import {
  eq,
  and,
  sql,
  isNull,
  gte,
  not,
  count,
  sum,
  desc,
  asc,
} from 'drizzle-orm';
import { db } from '@/db/initial';
import {
  inventarioAjusteinventarioProductos,
  inventarioAreaventa,
  inventarioCategorias,
  inventarioProducto,
  inventarioProductoinfo,
  inventarioTarjetas,
  inventarioTransferenciastarjetas,
  inventarioUser,
  inventarioVentas,
} from '@/db/schema';

export async function getAreaVenta(id: number) {
  try {
    const areaVenta = await db
      .select()
      .from(inventarioAreaventa)
      .where(eq(inventarioAreaventa.id, id))
      .limit(1);

    if (!areaVenta) {
      return { data: null, error: 'Área de venta no encontrada' };
    }

    const productoInfo = await db
      .select({
        id: inventarioProductoinfo.id,
        descripcion: inventarioProductoinfo.descripcion,
        codigo: inventarioProductoinfo.codigo,
        precio_venta: inventarioProductoinfo.precioVenta,
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
          eq(inventarioProducto.areaVentaId, id)
        )
      )
      .groupBy(inventarioProductoinfo.id, inventarioCategorias.nombre)
      .having(({ cantidad }) =>
        and(gte(count(), 1), not(eq(inventarioCategorias.nombre, 'Zapatos')))
      );

    const zapatos = await db
      .select({
        id: inventarioProducto.id,
        codigo: inventarioProductoinfo.codigo,
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
          eq(inventarioCategorias.nombre, 'Zapatos'),
          isNull(inventarioProducto.ventaId),
          eq(inventarioProducto.areaVentaId, id),
          isNull(inventarioAjusteinventarioProductos.ajusteinventarioId)
        )
      )
      .orderBy(desc(inventarioProducto.id));

    const allProductos = await db
      .select({
        codigo: inventarioProductoinfo.codigo,
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
          eq(inventarioProducto.areaVentaId, id),
          isNull(inventarioProducto.ventaId),
          isNull(inventarioAjusteinventarioProductos.ajusteinventarioId)
        )
      )
      .groupBy(inventarioProductoinfo.codigo, inventarioCategorias.nombre);

    const categorias = await db.select().from(inventarioCategorias);

    const ventas = await db
      .select({
        importe: sql<number>`SUM(${inventarioProductoinfo.precioVenta} - ${inventarioProductoinfo.pagoTrabajador})`,
        created_at: inventarioVentas.createdAt,
        metodo_pago: inventarioVentas.metodoPago,
        username: inventarioUser.username,
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
      .where(eq(inventarioVentas.areaVentaId, id))
      .groupBy(
        inventarioVentas.id,
        inventarioUser.username,
        inventarioProductoinfo.descripcion
      )
      .orderBy(desc(inventarioVentas.createdAt));

    const currentMonth = new Date().getMonth() + 1;
    const tarjetas = await db
      .select({
        id: inventarioTarjetas.id,
        nombre: inventarioTarjetas.nombre,
        banco: inventarioTarjetas.banco,
        disponible: sql<boolean>`CASE WHEN COALESCE(SUM(CASE WHEN ${inventarioTransferenciastarjetas.tipo} = 'INGRESO' AND EXTRACT(MONTH FROM ${inventarioTransferenciastarjetas.createdAt}) = ${currentMonth} THEN ${inventarioTransferenciastarjetas.cantidad} ELSE 0 END), 0) >= 120000 THEN FALSE ELSE TRUE END`,
      })
      .from(inventarioTarjetas)
      .leftJoin(
        inventarioTransferenciastarjetas,
        eq(inventarioTarjetas.id, inventarioTransferenciastarjetas.tarjetaId)
      )
      .groupBy(inventarioTarjetas.id)
      .orderBy(desc(inventarioTarjetas.id));

    return {
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
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Problema al conectar con el servidor',
    };
  }
}
