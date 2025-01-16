'use server';

import { SalidaAlmacenCafeteriaSchema } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

export async function addSalidaCafeteria(
  salida: InferInput<typeof SalidaAlmacenCafeteriaSchema>
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/almacen-cafeteria/salidas/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(salida),
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
  revalidateTag('salidas-cafeteria');
  revalidateTag('inventario-cafeteria');
  return {
    data: 'Salida agregada con éxito.',
    error: null,
  };
}

export async function deleteSalidaCafeteria(
  id: number
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/almacen-cafeteria/salidas/' + id + '/',
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
  revalidateTag('area-cafeteria');
  return {
    data: 'Salida eliminada con éxito.',
    error: null,
  };
}
