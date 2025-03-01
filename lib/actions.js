'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';

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

export async function logout() {
  cookies().delete('session');
  redirect('/login');
}
