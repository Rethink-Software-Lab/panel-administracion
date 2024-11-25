'use server';

import { onlyNombreSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';

export async function addCategoria(data: InferInput<typeof onlyNombreSchema>) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/categorias/', {
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

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidatePath('/categorias');
  return {
    error: null,
    data: 'Categoria creada con éxito.',
  };
}

export async function updateCategoria(
  data: InferInput<typeof onlyNombreSchema>,
  id: number
) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/categorias/' + id + '/',
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    }
  );
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidatePath('/categorias');
  return {
    error: null,
    data: 'Categoría editada con éxito.',
  };
}

export async function deleteCategoria({ id }: { id: number }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/categorias/' + id, {
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
        error: 'Categoría no encontrada',
      };
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidatePath('/categorias');
  return {
    data: 'Categoría eliminada con éxito.',
    error: null,
  };
}
