import { db } from '@/db/initial';
import {
  inventarioHistorialpreciocostosalon,
  inventarioHistorialprecioventasalon,
  inventarioUser,
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { EndPointHistorialPrecios } from './types';

export async function getHistorial(id: string): Promise<{
  data: EndPointHistorialPrecios | null;
  error: string | null;
}> {
  try {
    const precios_costo = await db
      .select({
        id: inventarioHistorialpreciocostosalon.id,
        fecha_inicio: inventarioHistorialpreciocostosalon.fechaInicio,
        usuario: inventarioUser.username,
        precio: inventarioHistorialpreciocostosalon.precio,
      })
      .from(inventarioHistorialpreciocostosalon)
      .leftJoin(
        inventarioUser,
        eq(inventarioHistorialpreciocostosalon.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioHistorialpreciocostosalon.productoInfoId, Number(id)))
      .orderBy(desc(inventarioHistorialpreciocostosalon.id));

    const precios_venta = await db
      .select({
        id: inventarioHistorialprecioventasalon.id,
        fecha_inicio: inventarioHistorialprecioventasalon.fechaInicio,
        usuario: inventarioUser.username,
        precio: inventarioHistorialprecioventasalon.precio,
      })
      .from(inventarioHistorialprecioventasalon)
      .leftJoin(
        inventarioUser,
        eq(inventarioHistorialprecioventasalon.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioHistorialprecioventasalon.productoInfoId, Number(id)))
      .orderBy(desc(inventarioHistorialprecioventasalon.id));

    return {
      data: {
        precios_costo,
        precios_venta,
      },
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
