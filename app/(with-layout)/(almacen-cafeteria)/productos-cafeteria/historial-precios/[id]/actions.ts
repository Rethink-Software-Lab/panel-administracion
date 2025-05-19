'use server';

import { db } from '@/db/initial';
import {
  inventarioHistorialpreciocostocafeteria,
  inventarioHistorialprecioventacafeteria,
} from '@/db/schema';
import { InferInput } from 'valibot';
import { HistorialPreciosSchema } from './schema';
import { TipoPrecio } from './types';
import { getSession } from '@/lib/getSession';
import { DateTime } from 'luxon';
import { revalidatePath } from 'next/cache';

export async function addHistorialPrecio(
  data: InferInput<typeof HistorialPreciosSchema>,
  id: number
) {
  const { userId } = getSession();

  const now = DateTime.now().toSQL();

  try {
    data.tipo === TipoPrecio.PRECIO_COSTO
      ? await db.insert(inventarioHistorialpreciocostocafeteria).values({
          precio: data.precio,
          usuarioId: Number(userId),
          productoId: id,
          fechaInicio: now,
        })
      : await db.insert(inventarioHistorialprecioventacafeteria).values({
          precio: data.precio,
          usuarioId: Number(userId),
          productoId: id,
          fechaInicio: now,
        });

    revalidatePath(`/productos-cafeteria/historial-precios/${id}`);

    return {
      data: 'Precio agregado con éxito.',
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
