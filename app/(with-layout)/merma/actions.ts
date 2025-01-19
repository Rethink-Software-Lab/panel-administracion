'use server';

import { MermaCafeteriaSchema } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

export async function addMerma(
  merma: InferInput<typeof MermaCafeteriaSchema>
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/merma/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(merma),
  });
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };
    if (res.status === 404)
      return {
        data: null,
        error: 'Error al introducir los datos.',
      };
    if (res.status === 400) {
      const data = await res.json();
      return {
        data: null,
        error: data.detail,
      };
    }
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('merma');
  return {
    data: 'Merma agregada con éxito.',
    error: null,
  };
}

export async function deleteMerma({
  id,
}: {
  id: number;
}): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/merma/' + id + '/', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };
    if (res.status === 404)
      return {
        data: null,
        error: 'Ajuste no encontrado.',
      };
    if (res.status === 400) {
      const data = await res.json();
      return {
        data: null,
        error: data.detail,
      };
    }
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('merma');
  return {
    data: 'Merma eliminada con éxito.',
    error: null,
  };
}
