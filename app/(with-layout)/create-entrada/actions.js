'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createEntrada(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/entradas/', {
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

    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/entradas');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}
