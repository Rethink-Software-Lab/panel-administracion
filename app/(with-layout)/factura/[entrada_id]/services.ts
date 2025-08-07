import { Factura } from "./types";
import { db } from "@/db/initial";
import {
  inventarioEntradaalmacen,
  inventarioHistorialpreciocostosalon,
  inventarioProducto,
  inventarioProductoinfo,
  inventarioProveedor,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { ValidationError } from "@/lib/errors";

export async function getFactura(
  entrada_id: string
): Promise<{ data: Factura | null; error: string | null }> {
  try {
    const entrada = await db
      .select({
        createdAt: inventarioEntradaalmacen.createdAt,
        proveedor: inventarioProveedor,
      })
      .from(inventarioEntradaalmacen)
      .innerJoin(
        inventarioProveedor,
        eq(inventarioEntradaalmacen.proveedorId, inventarioProveedor.id)
      )
      .where(eq(inventarioEntradaalmacen.id, Number(entrada_id)));

    if (!entrada || entrada.length === 0) {
      throw new ValidationError("No se encontro la factura");
    }

    const productos = await db
      .select({
        descripcion: inventarioProductoinfo.descripcion,
        cantidad: sql<number>`COUNT(${inventarioProducto.id})`,
        precio_unitario: sql<number>`(
            SELECT precio 
            FROM ${inventarioHistorialpreciocostosalon} 
            WHERE ${inventarioHistorialpreciocostosalon.productoInfoId} = ${inventarioProductoinfo.id}
            ORDER BY ${inventarioHistorialpreciocostosalon.fechaInicio} DESC 
            LIMIT 1
          )`,
        importe: sql<number>`COUNT(${inventarioProducto.id}) * (
            SELECT precio 
            FROM ${inventarioHistorialpreciocostosalon} 
            WHERE ${inventarioHistorialpreciocostosalon.productoInfoId} = ${inventarioProductoinfo.id}
            ORDER BY ${inventarioHistorialpreciocostosalon.fechaInicio} DESC 
            LIMIT 1
          )`,
      })
      .from(inventarioProducto)
      .innerJoin(
        inventarioProductoinfo,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .where(eq(inventarioProducto.entradaId, Number(entrada_id)))
      .groupBy(inventarioProductoinfo.id, inventarioProductoinfo.descripcion);
    return {
      error: null,
      data: {
        ...entrada[0],
        productos: productos,
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
      error: "Error al obtener la factura.",
    };
  }
}
