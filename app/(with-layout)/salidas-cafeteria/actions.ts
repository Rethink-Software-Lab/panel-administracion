'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { InferInput } from 'valibot';
import { SalidaCafeteriaSchema } from '@/lib/schemas';

const token = cookies().get('session')?.value;

export async function addSalidaCafeteria(
  salida: InferInput<typeof SalidaCafeteriaSchema>
) {
  const res = await fetch(process.env.BACKEND_URL_V2 + '/salidas-cafeteria/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...salida }),
  });
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };

    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: json.detail,
      };
    }

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('salidas-cafeteria');
  revalidateTag('inventario-cafeteria');
  return {
    error: null,
    data: 'Salida agregada con éxito.',
  };
}

export async function deleteSalidaCafeteria({ id }: { id: number }) {
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/salidas-cafeteria/' + id + '/',
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };
    if (res.status === 400)
      return {
        data: null,
        error: 'Algunos productos ya no están en el área.',
      };
    if (res.status === 404)
      return {
        data: null,
        error: 'Salida no encontrada',
      };
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('salidas-cafeteria');
  revalidateTag('inventario-cafeteria');
  return {
    data: 'Salida eliminada con éxito.',
    error: null,
  };
}
