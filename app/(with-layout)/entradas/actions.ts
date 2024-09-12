'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteEntrada({ id }: { id: number }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/entradas/' + id + '/',
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
        error: {
          message: 'No autorizado',
          description: 'Usted no está autorizado para esta acción',
        },
      };
    if (res.status === 404)
      return {
        data: null,
        error: {
          message: 'Entrada no encontrada',
          description: 'No fué posible encontrar la entrada que desea eliminar',
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
  revalidatePath(`/entradas/`);
  return {
    data: 'Entrada eliminada con éxito.',
    error: null,
  };
}
