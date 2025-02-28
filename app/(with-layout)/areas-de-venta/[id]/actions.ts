'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteVenta({ id }: { id: number }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/ventas/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
    if (res.status === 404)
      return {
        data: null,
        error: {
          message: 'Venta no encontrada',
          description: 'No fué posible encontrar la venta que desea eliminar',
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
  revalidateTag(`/area-de-venta/${id}`);
  return {
    data: 'Venta eliminada con éxito.',
    error: null,
  };
}
