'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { CreateSalidaRevoltosa } from './types';

const token = cookies().get('session')?.value;

export async function addSalidaRevoltosa(data: CreateSalidaRevoltosa) {
  const res = await fetch(process.env.BACKEND_URL_V2 + '/salidas-revoltosa/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data }),
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
  revalidateTag('salidas-revoltosa');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}

export async function deleteSalidaRevoltosa({ id }: { id: number }) {
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/salidas-revoltosa/' + id + '/',
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
        error: 'Algunos productos ya han sido vendidos',
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
  revalidateTag('salidas-revoltosa');
  return {
    data: 'Salida eliminada con éxito.',
    error: null,
  };
}
