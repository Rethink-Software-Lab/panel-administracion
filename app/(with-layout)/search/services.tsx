import { db } from "@/db/initial";
import {
  inventarioAjusteinventario,
  inventarioAjusteinventarioProductos,
  inventarioAreaventa,
  inventarioCuentacasa,
  inventarioCuentacasaElaboraciones,
  inventarioCuentacasaProductos,
  inventarioElaboraciones,
  inventarioElaboracionesCantidadCuentaCasa,
  inventarioElaboracionesCantidadMerma,
  inventarioElaboracionesIngredientesCantidad,
  inventarioElaboracionesSalidasAlmacenCafeteria,
  inventarioElaboracionesVentasCafeteria,
  inventarioEntradaalmacen,
  inventarioEntradasCafeteria,
  inventarioEntradasCafeteriaProductos,
  inventarioHistorialpreciocostocafeteria,
  inventarioHistorialprecioventacafeteria,
  inventarioIngredienteCantidad,
  inventarioInventarioAlmacenCafeteria,
  inventarioInventarioAreaCafeteria,
  inventarioMermacafeteria,
  inventarioMermacafeteriaElaboraciones,
  inventarioMermacafeteriaProductos,
  inventarioProducto,
  inventarioProductosCafeteria,
  inventarioProductosCantidadCuentaCasa,
  inventarioProductosCantidadMerma,
  inventarioProductosEntradasCafeteria,
  inventarioProductosSalidasCafeteria,
  inventarioProductosVentasCafeteria,
  inventarioProveedor,
  inventarioSalidaalmacen,
  inventarioSalidaalmacenrevoltosa,
  inventarioSalidasCafeteria,
  inventarioSalidasCafeteriaElaboraciones,
  inventarioSalidasCafeteriaProductos,
  inventarioTransferencia,
  inventarioTransferenciaProductos,
  inventarioUser,
  inventarioVentas,
  inventarioVentasCafeteria,
  inventarioVentasCafeteriaElaboraciones,
  inventarioVentasCafeteriaProductos,
} from "@/db/schema";
import {
  aliasedTable,
  and,
  count,
  desc,
  eq,
  inArray,
  not,
  or,
  sql,
} from "drizzle-orm";
import { DateTime } from "luxon";
import {
  ResponseMovimientos,
  SearchCafeteriaProductos,
  TipoMovimiento,
} from "./types";
import { METODOS_PAGO } from "../(almacen-cafeteria)/entradas-cafeteria/types";

export async function searchCafeteriaProducto(id: number): Promise<{
  data: SearchCafeteriaProductos | null;
  error: string | null;
}> {
  try {
    const subqueryHistoricoPrecioCosto = db
      .select({
        precioCosto: inventarioHistorialpreciocostocafeteria.precio,
      })
      .from(inventarioHistorialpreciocostocafeteria)
      .where(eq(inventarioHistorialpreciocostocafeteria.productoId, id))
      .orderBy(desc(inventarioHistorialpreciocostocafeteria.id))
      .limit(1)
      .as("precioCosto");

    const subqueryHistoricoPrecioVenta = db
      .select({
        precioVenta: inventarioHistorialprecioventacafeteria.precio,
      })
      .from(inventarioHistorialprecioventacafeteria)
      .where(eq(inventarioHistorialprecioventacafeteria.productoId, id))
      .orderBy(desc(inventarioHistorialprecioventacafeteria.id))
      .limit(1)
      .as("precioVenta");

    const info = await db
      .select({
        imagen: sql<null>`null`,
        descripcion: inventarioProductosCafeteria.nombre,
        precio_costo: subqueryHistoricoPrecioCosto.precioCosto,
        precio_venta: subqueryHistoricoPrecioVenta.precioVenta,
      })
      .from(inventarioProductosCafeteria)
      .innerJoinLateral(subqueryHistoricoPrecioCosto, sql`true`)
      .innerJoinLateral(subqueryHistoricoPrecioVenta, sql`true`)
      .where(eq(inventarioProductosCafeteria.id, id));

    const inventarioAlmacenCafeteria = await db
      .select({
        cantidad: inventarioInventarioAlmacenCafeteria.cantidad,
      })
      .from(inventarioInventarioAlmacenCafeteria)
      .where(eq(inventarioInventarioAlmacenCafeteria.productoId, id));

    const inventarioCafeteria = await db
      .select({
        cantidad: inventarioInventarioAreaCafeteria.cantidad,
      })
      .from(inventarioInventarioAreaCafeteria)
      .where(eq(inventarioInventarioAreaCafeteria.productoId, id));

    return {
      data: {
        info: info?.[0],
        cafeteria: inventarioCafeteria?.[0].cantidad,
        almacen: inventarioAlmacenCafeteria?.[0].cantidad,
      },
      error: null,
    };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al obtener el producto" };
  }
}

export async function getMovimientosProducto(
  infoId: number
): Promise<{ data: ResponseMovimientos | null; error: string | null }> {
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
        and(
          eq(inventarioProducto.entradaId, inventarioEntradaalmacen.id),
          eq(inventarioProducto.infoId, infoId)
        )
      )
      .leftJoin(
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

    const users = await db
      .select({ username: inventarioUser.username })
      .from(inventarioUser)
      .where(not(eq(inventarioUser.id, 1)));

    return {
      data: { users, movimientos: formattedMovimientos },
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

export async function getMovimientosProductoCafeteria(
  infoId: number
): Promise<{ data: ResponseMovimientos | null; error: string | null }> {
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
        createdAt: inventarioEntradasCafeteria.createdAt,
        type: sql<TipoMovimiento>`'Entrada'`,
        cantidad: inventarioProductosEntradasCafeteria.cantidad,
        user: inventarioUser.username,
        proveedor: sql<string>`coalesce(${inventarioProveedor.nombre}, ${inventarioEntradasCafeteria.proveedorNombre})`,
        metodoPago: sql<METODOS_PAGO>`${inventarioEntradasCafeteria.metodoPago}`,
      })
      .from(inventarioEntradasCafeteriaProductos)
      .innerJoin(
        inventarioEntradasCafeteria,
        eq(
          inventarioEntradasCafeteriaProductos.entradasCafeteriaId,
          inventarioEntradasCafeteria.id
        )
      )
      .innerJoin(
        inventarioProductosEntradasCafeteria,
        eq(
          inventarioEntradasCafeteriaProductos.productosEntradasCafeteriaId,
          inventarioProductosEntradasCafeteria.id
        )
      )
      .leftJoin(
        inventarioProveedor,
        eq(inventarioEntradasCafeteria.proveedorId, inventarioProveedor.id)
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioEntradasCafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioProductosEntradasCafeteria.productoId, infoId))
      .orderBy(desc(inventarioEntradasCafeteria.createdAt));

    const salidasDirectas = await db
      .select({
        createdAt: inventarioSalidasCafeteria.createdAt,
        type: sql<TipoMovimiento>`'Salida'`,
        cantidad: inventarioProductosSalidasCafeteria.cantidad,
        user: inventarioUser.username,
        areaVenta: sql<string>`'Cafetería'`,
      })
      .from(inventarioSalidasCafeteria)
      .innerJoin(
        inventarioSalidasCafeteriaProductos,
        eq(
          inventarioSalidasCafeteria.id,
          inventarioSalidasCafeteriaProductos.salidasCafeteriaId
        )
      )
      .innerJoin(
        inventarioProductosSalidasCafeteria,
        eq(
          inventarioSalidasCafeteriaProductos.productosSalidasCafeteriaId,
          inventarioProductosSalidasCafeteria.id
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioSalidasCafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioProductosSalidasCafeteria.productoId, infoId));

    const salidasElaboraciones = await db
      .select({
        createdAt: inventarioSalidasCafeteria.createdAt,
        type: sql<TipoMovimiento>`'Salida'`,
        cantidad: sql<number>`( (${inventarioElaboracionesSalidasAlmacenCafeteria.cantidad}) * (${inventarioIngredienteCantidad.cantidad}) )`,
        user: inventarioUser.username,
        areaVenta: sql<string>`'Cafetería'`,
      })
      .from(inventarioSalidasCafeteria)
      .innerJoin(
        inventarioSalidasCafeteriaElaboraciones,
        eq(
          inventarioSalidasCafeteria.id,
          inventarioSalidasCafeteriaElaboraciones.salidasCafeteriaId
        )
      )
      .innerJoin(
        inventarioElaboracionesSalidasAlmacenCafeteria,
        eq(
          inventarioSalidasCafeteriaElaboraciones.elaboracionesSalidasAlmacenCafeteriaId,
          inventarioElaboracionesSalidasAlmacenCafeteria.id
        )
      )
      .innerJoin(
        inventarioElaboraciones,
        eq(
          inventarioElaboraciones.id,
          inventarioElaboracionesSalidasAlmacenCafeteria.productoId
        )
      )
      .innerJoin(
        inventarioElaboracionesIngredientesCantidad,
        eq(
          inventarioElaboracionesIngredientesCantidad.elaboracionesId,
          inventarioElaboraciones.id
        )
      )
      .innerJoin(
        inventarioIngredienteCantidad,
        eq(
          inventarioElaboracionesIngredientesCantidad.ingredienteCantidadId,
          inventarioIngredienteCantidad.id
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioSalidasCafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioIngredienteCantidad.ingredienteId, infoId));

    const salidas = [...salidasDirectas, ...salidasElaboraciones];

    const cantidadProducto = db
      .select()
      .from(inventarioProductosCantidadMerma)
      .as("cantidad_producto");
    const cantidadElaboracion = db
      .select()
      .from(inventarioElaboracionesCantidadMerma)
      .as("cantidad_elaboracion");
    const ingrediente = db
      .select()
      .from(inventarioIngredienteCantidad)
      .as("ingrediente");

    const merma = await db
      .select({
        createdAt: inventarioMermacafeteria.createdAt,
        type: sql<TipoMovimiento>`'Merma'`,
        cantidad: sql`
          SUM(
            COALESCE(${cantidadProducto.cantidad}, 0)
            + COALESCE(${cantidadElaboracion.cantidad} * ${ingrediente.cantidad}, 0)
          )
        `.mapWith(Number),
        user: inventarioUser.username,
        areaVenta: inventarioMermacafeteria.isAlmacen
          ? sql<string>`'Almacén Cafetería'`
          : sql<string>`'Cafetería'`,
      })
      .from(inventarioMermacafeteria)
      .leftJoin(
        inventarioMermacafeteriaProductos,
        eq(
          inventarioMermacafeteria.id,
          inventarioMermacafeteriaProductos.mermacafeteriaId
        )
      )
      .leftJoin(
        cantidadProducto,
        eq(
          inventarioMermacafeteriaProductos.productosCantidadMermaId,
          cantidadProducto.id
        )
      )
      .leftJoin(
        inventarioMermacafeteriaElaboraciones,
        eq(
          inventarioMermacafeteria.id,
          inventarioMermacafeteriaElaboraciones.mermacafeteriaId
        )
      )
      .leftJoin(
        cantidadElaboracion,
        eq(
          inventarioMermacafeteriaElaboraciones.elaboracionesCantidadMermaId,
          cantidadElaboracion.id
        )
      )
      .leftJoin(
        inventarioElaboracionesIngredientesCantidad,
        eq(
          cantidadElaboracion.productoId,
          inventarioElaboracionesIngredientesCantidad.elaboracionesId
        )
      )
      .leftJoin(
        ingrediente,
        eq(
          inventarioElaboracionesIngredientesCantidad.ingredienteCantidadId,
          ingrediente.id
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioMermacafeteria.usuarioId, inventarioUser.id)
      )
      .where(
        or(
          eq(cantidadProducto.productoId, infoId),
          eq(ingrediente.ingredienteId, infoId)
        )
      )
      .groupBy(
        inventarioMermacafeteria.createdAt,
        inventarioUser.username,
        inventarioMermacafeteria.isAlmacen
      );

    const cuentaCasa = await db
      .select({
        createdAt: inventarioCuentacasa.createdAt,
        type: sql<TipoMovimiento>`'Cuenta Casa'`,
        cantidad:
          sql`SUM(COALESCE(${inventarioProductosCantidadCuentaCasa.cantidad}, 0) + COALESCE(${inventarioElaboracionesCantidadCuentaCasa.cantidad} * ${inventarioIngredienteCantidad.cantidad}, 0))`.mapWith(
            Number
          ),
        user: inventarioUser.username,
        areaVenta: inventarioCuentacasa.isAlmacen
          ? sql<string>`'Almacén Cafetería'`
          : sql<string>`'Cafetería'`,
      })
      .from(inventarioCuentacasa)
      .leftJoin(
        inventarioCuentacasaProductos,
        eq(inventarioCuentacasa.id, inventarioCuentacasaProductos.cuentacasaId)
      )
      .leftJoin(
        inventarioProductosCantidadCuentaCasa,
        eq(
          inventarioCuentacasaProductos.productosCantidadCuentaCasaId,
          inventarioProductosCantidadCuentaCasa.id
        )
      )
      .leftJoin(
        inventarioCuentacasaElaboraciones,
        eq(
          inventarioCuentacasa.id,
          inventarioCuentacasaElaboraciones.cuentacasaId
        )
      )
      .leftJoin(
        inventarioElaboracionesCantidadCuentaCasa,
        eq(
          inventarioCuentacasaElaboraciones.elaboracionesCantidadCuentaCasaId,
          inventarioElaboracionesCantidadCuentaCasa.id
        )
      )
      .leftJoin(
        inventarioElaboracionesIngredientesCantidad,
        eq(
          inventarioElaboracionesCantidadCuentaCasa.productoId,
          inventarioElaboracionesIngredientesCantidad.elaboracionesId
        )
      )
      .leftJoin(
        inventarioIngredienteCantidad,
        eq(
          inventarioElaboracionesIngredientesCantidad.ingredienteCantidadId,
          inventarioIngredienteCantidad.id
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioCuentacasa.usuarioId, inventarioUser.id)
      )
      .where(
        or(
          eq(inventarioProductosCantidadCuentaCasa.productoId, infoId),
          eq(inventarioIngredienteCantidad.ingredienteId, infoId)
        )
      )
      .groupBy(
        inventarioCuentacasa.createdAt,
        inventarioCuentacasa.isAlmacen,
        inventarioUser.username
      );

    const ventasDirectas = await db
      .select({
        createdAt: inventarioVentasCafeteria.createdAt,
        type: sql<TipoMovimiento>`'Venta'`,
        cantidad:
          sql<number>`SUM(${inventarioProductosVentasCafeteria.cantidad})`.as(
            "cantidad"
          ),
        user: inventarioUser.username,
        areaVenta: sql<string>`'Cafetería'`,
        metodoPago: sql<METODOS_PAGO>`${inventarioVentasCafeteria.metodoPago}`,
      })
      .from(inventarioProductosVentasCafeteria)
      .innerJoin(
        inventarioVentasCafeteriaProductos,
        eq(
          inventarioVentasCafeteriaProductos.productosVentasCafeteriaId,
          inventarioProductosVentasCafeteria.id
        )
      )
      .innerJoin(
        inventarioVentasCafeteria,
        eq(
          inventarioVentasCafeteria.id,
          inventarioVentasCafeteriaProductos.ventasCafeteriaId
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioVentasCafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioProductosVentasCafeteria.productoId, infoId))
      .groupBy(
        inventarioVentasCafeteria.createdAt,
        inventarioUser.username,
        inventarioVentasCafeteria.metodoPago
      );

    const ventasIndirectas = await db
      .select({
        createdAt: inventarioVentasCafeteria.createdAt,
        type: sql<TipoMovimiento>`'Venta'`,
        cantidad:
          sql<number>`SUM(${inventarioElaboracionesVentasCafeteria.cantidad} * ${inventarioIngredienteCantidad.cantidad})`.as(
            "cantidad"
          ),
        user: inventarioUser.username,
        areaVenta: sql<string>`'Cafetería'`,
        metodoPago: sql<METODOS_PAGO>`${inventarioVentasCafeteria.metodoPago}`,
      })
      .from(inventarioElaboracionesVentasCafeteria)
      .innerJoin(
        inventarioVentasCafeteriaElaboraciones,
        eq(
          inventarioVentasCafeteriaElaboraciones.elaboracionesVentasCafeteriaId,
          inventarioElaboracionesVentasCafeteria.id
        )
      )
      .innerJoin(
        inventarioVentasCafeteria,
        eq(
          inventarioVentasCafeteriaElaboraciones.ventasCafeteriaId,
          inventarioVentasCafeteria.id
        )
      )
      .innerJoin(
        inventarioElaboraciones,
        eq(
          inventarioElaboraciones.id,
          inventarioElaboracionesVentasCafeteria.productoId
        )
      )
      .innerJoin(
        inventarioElaboracionesIngredientesCantidad,
        eq(
          inventarioElaboracionesIngredientesCantidad.elaboracionesId,
          inventarioElaboraciones.id
        )
      )
      .innerJoin(
        inventarioIngredienteCantidad,
        eq(
          inventarioIngredienteCantidad.id,
          inventarioElaboracionesIngredientesCantidad.ingredienteCantidadId
        )
      )
      .leftJoin(
        inventarioUser,
        eq(inventarioVentasCafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioIngredienteCantidad.ingredienteId, infoId))
      .groupBy(
        inventarioVentasCafeteria.createdAt,
        inventarioUser.username,
        inventarioVentasCafeteria.metodoPago
      );

    const ventas = [...ventasDirectas, ...ventasIndirectas];

    const movimientos = [
      ...entradas,
      ...salidas,
      ...cuentaCasa,
      ...merma,
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

    const users = await db
      .select({ username: inventarioUser.username })
      .from(inventarioUser)
      .where(not(eq(inventarioUser.id, 1)));

    return {
      data: { users, movimientos: formattedMovimientos },
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
