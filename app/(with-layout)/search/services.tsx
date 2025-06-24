import { db } from "@/db/initial";
import {
  inventarioAjusteinventario,
  inventarioAjusteinventarioProductos,
  inventarioAreaventa,
  inventarioEntradaalmacen,
  inventarioProducto,
  inventarioProveedor,
  inventarioSalidaalmacen,
  inventarioSalidaalmacenrevoltosa,
  inventarioTransferencia,
  inventarioTransferenciaProductos,
  inventarioUser,
  inventarioVentas,
} from "@/db/schema";
import { aliasedTable, count, eq, inArray, sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { Movimiento, TipoMovimiento } from "./types";
import { METODOS_PAGO } from "../(almacen-cafeteria)/entradas-cafeteria/types";

export async function getHistoricoProducto(
  infoId: number
): Promise<{ data: Movimiento[] | null; error: string | null }> {
  try {
    const productos = await db
      .select({
        id: inventarioProducto.id,
        entradaId: inventarioProducto.entradaId,
        salidaId: inventarioProducto.salidaId,
        ventaId: inventarioProducto.ventaId,
        salidaRevoltosaId: inventarioProducto.salidaRevoltosaId,
      })
      .from(inventarioProducto)
      .where(eq(inventarioProducto.infoId, infoId));

    let entradasIds: number[] = [];
    let salidasIds: number[] = [];
    let ventasIds: number[] = [];
    let salidaRevoltosaId: number[] = [];

    productos.map((p) => {
      if (p.entradaId) {
        entradasIds.push(p.entradaId);
      }
      if (p.salidaId) {
        salidasIds.push(p.salidaId);
      }
      if (p.ventaId) {
        ventasIds.push(p.ventaId);
      }
      if (p.salidaRevoltosaId) {
        salidaRevoltosaId.push(p.salidaRevoltosaId);
      }
    });

    const entradas = await db
      .select({
        createdAt: inventarioEntradaalmacen.createdAt,
        type: sql<TipoMovimiento>`'Entrada'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
        user: inventarioUser.username,
        proveedor: inventarioProveedor.nombre,
        metodoPago: sql<METODOS_PAGO>`${inventarioEntradaalmacen.metodoPago}`,
      })
      .from(inventarioEntradaalmacen)
      .where(inArray(inventarioEntradaalmacen.id, entradasIds))
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.entradaId, inventarioEntradaalmacen.id)
      )
      .innerJoin(
        inventarioProveedor,
        eq(inventarioEntradaalmacen.proveedorId, inventarioProveedor.id)
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioEntradaalmacen.usuarioId, inventarioUser.id)
      )
      .groupBy(
        inventarioEntradaalmacen.createdAt,
        inventarioUser.username,
        inventarioProveedor.nombre,
        inventarioEntradaalmacen.metodoPago
      );

    const salidas = await db
      .select({
        createdAt: inventarioSalidaalmacen.createdAt,
        type: sql<TipoMovimiento>`'Salida'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
        user: inventarioUser.username,
        areaVenta: inventarioAreaventa.nombre,
      })
      .from(inventarioSalidaalmacen)
      .where(inArray(inventarioSalidaalmacen.id, salidasIds))
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.salidaId, inventarioSalidaalmacen.id)
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioSalidaalmacen.usuarioId, inventarioUser.id)
      )
      .innerJoin(
        inventarioAreaventa,
        eq(inventarioAreaventa.id, inventarioSalidaalmacen.areaVentaId)
      )
      .groupBy(
        inventarioSalidaalmacen.createdAt,
        inventarioUser.username,
        inventarioAreaventa.nombre
      );

    const salidasRevoltosa = await db
      .select({
        createdAt: inventarioSalidaalmacenrevoltosa.createdAt,
        type: sql<TipoMovimiento>`'Salida Revoltosa'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
        user: inventarioUser.username,
        areaVenta: sql<string>`'Revoltosa'`,
      })
      .from(inventarioSalidaalmacenrevoltosa)
      .where(inArray(inventarioSalidaalmacenrevoltosa.id, salidaRevoltosaId))
      .innerJoin(
        inventarioProducto,
        eq(
          inventarioProducto.salidaRevoltosaId,
          inventarioSalidaalmacenrevoltosa.id
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioSalidaalmacenrevoltosa.usuarioId, inventarioUser.id)
      )
      .groupBy(
        inventarioSalidaalmacenrevoltosa.createdAt,
        inventarioUser.username
      );

    const ajustes = await db
      .select({
        createdAt: inventarioAjusteinventario.createdAt,
        type: sql<TipoMovimiento>`'Ajuste'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
        user: inventarioUser.username,
        areaVenta: sql<string>`COALESCE(${inventarioAreaventa.nombre}, 'Almacen Principal')`,
        motivo: inventarioAjusteinventario.motivo,
      })
      .from(inventarioAjusteinventarioProductos)
      .innerJoin(
        inventarioProducto,
        eq(
          inventarioAjusteinventarioProductos.productoId,
          inventarioProducto.id
        )
      )
      .leftJoin(
        inventarioAreaventa,
        eq(inventarioProducto.areaVentaId, inventarioAreaventa.id)
      )
      .innerJoin(
        inventarioAjusteinventario,
        eq(
          inventarioAjusteinventario.id,
          inventarioAjusteinventarioProductos.ajusteinventarioId
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioAjusteinventario.usuarioId, inventarioUser.id)
      )
      .where(
        inArray(
          inventarioAjusteinventarioProductos.productoId,
          productos.map((p) => p.id)
        )
      )
      .groupBy(
        inventarioAjusteinventario.createdAt,
        inventarioUser.username,
        inventarioAreaventa.nombre,
        inventarioAjusteinventario.motivo
      );

    const areaVentaDesde = aliasedTable(
      inventarioAreaventa,
      "area_venta_desde"
    );
    const areaVentaPara = aliasedTable(inventarioAreaventa, "area_venta_para");

    const transferencias = await db
      .select({
        createdAt: inventarioTransferencia.createdAt,
        type: sql<TipoMovimiento>`'Transferencia'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
        user: inventarioUser.username,
        desde: areaVentaDesde.nombre,
        hacia: areaVentaPara.nombre,
      })
      .from(inventarioTransferenciaProductos)
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.id, inventarioTransferenciaProductos.productoId)
      )
      .innerJoin(
        inventarioTransferencia,
        eq(
          inventarioTransferencia.id,
          inventarioTransferenciaProductos.transferenciaId
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioTransferencia.usuarioId, inventarioUser.id)
      )
      .innerJoin(
        areaVentaDesde,
        eq(inventarioTransferencia.deId, areaVentaDesde.id)
      )
      .innerJoin(
        areaVentaPara,
        eq(inventarioTransferencia.paraId, areaVentaPara.id)
      )
      .where(
        inArray(
          inventarioTransferenciaProductos.productoId,
          productos.map((p) => p.id)
        )
      )
      .groupBy(
        inventarioTransferencia.createdAt,
        inventarioUser.username,
        areaVentaDesde.nombre,
        areaVentaPara.nombre
      );

    const ventas = await db
      .select({
        createdAt: inventarioVentas.createdAt,
        type: sql<TipoMovimiento>`'Venta'`,
        cantidad: count(inventarioProducto),
        user: inventarioUser.username,
        areaVenta: inventarioAreaventa.nombre,
        metodoPago: sql<METODOS_PAGO>`${inventarioVentas.metodoPago}`,
      })
      .from(inventarioVentas)
      .leftJoin(
        inventarioUser,
        eq(inventarioVentas.usuarioId, inventarioUser.id)
      )
      .innerJoin(
        inventarioAreaventa,
        eq(inventarioAreaventa.id, inventarioVentas.areaVentaId)
      )
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.ventaId, inventarioVentas.id)
      )
      .where(inArray(inventarioVentas.id, ventasIds))
      .groupBy(
        inventarioVentas.createdAt,
        inventarioUser.username,
        inventarioAreaventa.nombre,
        inventarioVentas.metodoPago
      );

    const movimientos = [
      ...entradas,
      ...salidas,
      ...salidasRevoltosa,
      ...ajustes,
      ...transferencias,
      ...ventas,
    ];
    const sortedMovimientos = movimientos.sort(
      (a, b) =>
        DateTime.fromSQL(b.createdAt).toMillis() -
        DateTime.fromSQL(a.createdAt).toMillis()
    );
    const formattedMovimientos = sortedMovimientos.map((m) => ({
      ...m,
      createdAt: DateTime.fromSQL(m.createdAt).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: "es" }
      ),
      cantidad: Number(m.cantidad),
    }));

    return {
      data: formattedMovimientos,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al conectart con el servidor",
    };
  }
}
