'use server';

import { GastosSchema } from '@/lib/schemas';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

export async function addGasto(
  gasto: InferInput<typeof GastosSchema>
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/gastos/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gasto),
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
  revalidateTag('gastos');
  return {
    data: 'Gasto agregado con éxito.',
    error: null,
  };
}

export async function editGasto(
  id: number,
  gasto: InferInput<typeof GastosSchema>
): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/gastos/' + id + '/', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gasto),
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
  revalidateTag('gastos');
  return {
    data: 'Gasto editado con éxito.',
    error: null,
  };
}

export async function deleteGasto({
  id,
}: {
  id: number;
}): Promise<{ data: string | null; error: string | null }> {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/gastos/' + id + '/', {
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
        error: 'Gasto no encontrado.',
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
  revalidateTag('gastos');
  return {
    data: 'Gasto eliminado con éxito.',
    error: null,
  };
}
