'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addCategoria(data) {
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
  revalidatePath('/categorias');
  return {
    error: null,
    data: 'Categoria creada con éxito.',
  };
}

export async function updateCategoria(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/categorias/' + data?.id + '/',
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
  revalidatePath('/categorias');
  return {
    error: null,
    data: 'Categoría editada con éxito.',
  };
}

export async function deleteCategoria({ id }) {
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
        error: {
          message: 'No autorizado',
          description: 'Usted no está autorizado para esta acción',
        },
      };
    if (res.status === 404)
      return {
        data: null,
        error: {
          message: 'Categoría no encontrada',
          description:
            'No fué posible encontrar la categoría que desea eliminar',
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
  revalidatePath('/categorias');
  return {
    data: 'Categoría eliminada con éxito.',
    error: null,
  };
}
