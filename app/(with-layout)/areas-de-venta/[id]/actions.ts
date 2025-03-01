'use server';

import { VentasSchema } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

interface DataVenta
  extends Omit<InferInput<typeof VentasSchema>, 'zapatos_id'> {
  zapatos_id?: number[];
  areaVenta: number;
}

export async function addVenta(
  data: DataVenta
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/ventas/', {
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
  revalidateTag(`/area-de-venta/${data.areaVenta}`);
  return {
    error: null,
    data: 'Venta creada con éxito.',
  };
}

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
