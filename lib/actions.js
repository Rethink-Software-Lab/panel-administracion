'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(data) {
  const response = await fetch(process.env.BACKEND_URL_V2 + '/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      return 'Usuario o contraseña incorrectos';
    }
  }
  const res = await response.json();

  cookies().set('session', res.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  redirect('/');
}

export async function addVenta(data) {
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

    const json = await res.json();

    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/ventas');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}

export async function logout() {
  cookies().delete('session');
  redirect('/login');
}
