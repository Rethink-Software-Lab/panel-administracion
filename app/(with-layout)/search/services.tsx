import { db } from "@/db/initial";
import {
  inventarioEntradaalmacen,
  inventarioProducto,
  inventarioSalidaalmacen,
} from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { Movimiento, TipoMovimiento } from "./types";

export async function getHistoricoProducto(
  infoId: number
): Promise<{ data: Movimiento[] | null; error: string | null }> {
  try {
    const productos = await db
      .select({ entradaId: inventarioProducto.entradaId })
      .from(inventarioProducto)
      .where(eq(inventarioProducto.infoId, infoId));

    const formattedProductos = productos.map((p) => p.entradaId || 0);

    const entradas = await db
      .select({
        createdAt: inventarioEntradaalmacen.createdAt,
        type: sql<TipoMovimiento>`'Entrada'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
      })
      .from(inventarioEntradaalmacen)
      .where(inArray(inventarioEntradaalmacen.id, formattedProductos))
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.entradaId, inventarioEntradaalmacen.id)
      )
      .groupBy(inventarioEntradaalmacen.createdAt);

    const salidas = await db
      .select({
        createdAt: inventarioSalidaalmacen.createdAt,
        type: sql<TipoMovimiento>`'Salida'`,
        cantidad: sql<string>`COUNT (${inventarioProducto})`.as("cantidad"),
      })
      .from(inventarioSalidaalmacen)
      .where(inArray(inventarioSalidaalmacen.id, formattedProductos))
      .innerJoin(
        inventarioProducto,
        eq(inventarioProducto.salidaId, inventarioSalidaalmacen.id)
      )
      .groupBy(inventarioSalidaalmacen.createdAt);

    const movimientos = [...entradas, ...salidas];
    const sortedMovimientos = movimientos.sort(
      (a, b) =>
        DateTime.fromSQL(b.createdAt).toMillis() -
        DateTime.fromSQL(a.createdAt).toMillis()
    );
    const formattedMovimientos = sortedMovimientos.map((m) => ({
      createdAt: DateTime.fromSQL(m.createdAt).toLocaleString(
        DateTime.DATETIME_MED
      ),
      type: m.type,
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
