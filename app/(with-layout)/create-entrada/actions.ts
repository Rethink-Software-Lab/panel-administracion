'use server';

import { EntradaSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';
import { ResponseCreateEntrada } from './types';

export async function createEntrada(
  data: InferInput<typeof EntradaSchema>
): Promise<ResponseCreateEntrada> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/entradas/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data }),
  });
  if (!res.ok) {
    const d = await res.json();
    console.error(d.detail);
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };

    if (res.status === 404) {
      return {
        data: null,
        error: 'Recurso no encontrado',
      };
    }

    if (res.status === 400) {
      return {
        data: null,
        error: d.detail,
      };
    }

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidatePath('/entradas');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}
