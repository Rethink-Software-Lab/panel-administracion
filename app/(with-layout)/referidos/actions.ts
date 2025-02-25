'use server';

import { db } from '@/db/initial';
import { inventarioVendedorexterno } from '@/db/schema';
import { ReferidoSchema } from '@/lib/schemas';
import { InferInput } from 'valibot';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function addReferido(
  data: InferInput<typeof ReferidoSchema>
): Promise<{ data: string | null; error: string | null }> {
  try {
    let codigoReferido: string = '';
    let isUnique: boolean = false;
    let intentos: number = 0;
    const maxIntentos: number = 5;

    while (intentos < maxIntentos && !isUnique) {
      const nuevoCodigo = nanoid(8);

      const vendedoresExistente = await db
        .select()
        .from(inventarioVendedorexterno)
        .where(eq(inventarioVendedorexterno.codigoReferido, nuevoCodigo));

      if (vendedoresExistente.length === 0) {
        codigoReferido = nuevoCodigo;
        isUnique = true;
      } else {
        intentos++;
      }
    }

    if (!isUnique || !codigoReferido) {
      return {
        data: null,
        error: 'No se pudo generar código único después de 5 intentos',
      };
    }

    await db.insert(inventarioVendedorexterno).values({
      ...data,
      codigoReferido,
    });

    revalidateTag('referidos');
    return {
      data: 'Referido agregado con éxito',
      error: null,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error && 'code' in e && e.code === '23505'
        ? 'El código generado ya existe, por favor intenta nuevamente'
        : `Error al conectar con el servidor: ${
            e instanceof Error ? e.message : 'Error desconocido'
          }`;

    return {
      data: null,
      error: errorMessage,
    };
  }
}

export async function updateReferido(
  data: InferInput<typeof ReferidoSchema>,
  id: number
): Promise<{ data: string | null; error: string | null }> {
  try {
    await db
      .update(inventarioVendedorexterno)
      .set(data)
      .where(eq(inventarioVendedorexterno.id, id));

    revalidateTag('referidos');
    return { data: 'Referido actualizado con éxito', error: null };
  } catch (e) {
    return {
      data: null,
      error: `Error al conectar con el servidor.`,
    };
  }
}

export async function deleteReferido({
  id,
}: {
  id: number;
}): Promise<{ data: string | null; error: string | null }> {
  try {
    await db
      .delete(inventarioVendedorexterno)
      .where(eq(inventarioVendedorexterno.id, id));

    revalidateTag('referidos');
    return { data: 'Referido eliminado con éxito', error: null };
  } catch (e) {
    return {
      data: null,
      error: `Error al conectar con el servidor.`,
    };
  }
}
