'use server';

import { EntradaCafeteriaSchema } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

export async function addEntradaCafeteria(
  entrada: InferInput<typeof EntradaCafeteriaSchema>
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/almacen-cafeteria/entradas/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(entrada),
    }
  );
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
  revalidateTag('entrada-cafeteria');
  revalidateTag('inventario-cafeteria');
  return {
    data: 'Entrada agregada con éxito.',
    error: null,
  };
}

export async function deleteEntradaCafeteria(id: number) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/almacen-cafeteria/entradas/' + id + '/',
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
    if (res.status === 400) {
      const data = await res.json();
      return {
        data: null,
        error: data.detail,
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
  revalidateTag('entrada-cafeteria');
  revalidateTag('inventario-cafeteria');
  return {
    data: 'Entrada eliminada con éxito.',
    error: null,
  };
}
