'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addSalida(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/salidas/', {
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
        error: {
          message: 'No autorizado',
          description: 'Usted no está autorizado para esta acción',
        },
      };

    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: {
          message: json.detail,
        },
      };
    }

    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/salidas');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}

export async function deleteSalida({ id }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/salidas/' + id + '/', {
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
  revalidatePath(`/salidas/`);
  return {
    data: 'Salida eliminada con éxito.',
    error: null,
  };
}
