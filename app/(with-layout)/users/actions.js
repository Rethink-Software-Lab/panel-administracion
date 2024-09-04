'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addUsuario(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/usuarios/', {
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
  revalidatePath('/users');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}

export async function updateUsuario(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/usuarios/' + data?.id + '/',
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
  revalidatePath('/users');
  return {
    error: null,
    data: 'Usuario editado con éxito.',
  };
}

export async function deleteUsuario({ id }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/usuarios/' + id, {
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
          message: 'Usuario no encontrada',
          description: 'No fué posible encontrar el usuario que desea eliminar',
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
  revalidatePath('/users');
  return {
    data: 'Usuario eliminado con éxito.',
    error: null,
  };
}
