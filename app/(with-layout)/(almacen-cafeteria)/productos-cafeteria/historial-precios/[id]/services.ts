import { db } from '@/db/initial';
import {
  inventarioHistorialpreciocostocafeteria,
  inventarioHistorialprecioventacafeteria,
  inventarioUser,
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { EndPointHistorialPrecios } from './types';

export async function getHistorialCafeteria(id: string): Promise<{
  data: EndPointHistorialPrecios | null;
  error: string | null;
}> {
  try {
    const precios_costo = await db
      .select({
        id: inventarioHistorialpreciocostocafeteria.id,
        fecha_inicio: inventarioHistorialpreciocostocafeteria.fechaInicio,
        usuario: inventarioUser.username,
        precio: inventarioHistorialpreciocostocafeteria.precio,
      })
      .from(inventarioHistorialpreciocostocafeteria)
      .leftJoin(
        inventarioUser,
        eq(inventarioHistorialpreciocostocafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioHistorialpreciocostocafeteria.productoId, Number(id)))
      .orderBy(desc(inventarioHistorialpreciocostocafeteria.id));

    const precios_venta = await db
      .select({
        id: inventarioHistorialprecioventacafeteria.id,
        fecha_inicio: inventarioHistorialprecioventacafeteria.fechaInicio,
        usuario: inventarioUser.username,
        precio: inventarioHistorialprecioventacafeteria.precio,
      })
      .from(inventarioHistorialprecioventacafeteria)
      .leftJoin(
        inventarioUser,
        eq(inventarioHistorialprecioventacafeteria.usuarioId, inventarioUser.id)
      )
      .where(eq(inventarioHistorialprecioventacafeteria.productoId, Number(id)))
      .orderBy(desc(inventarioHistorialprecioventacafeteria.id));

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
