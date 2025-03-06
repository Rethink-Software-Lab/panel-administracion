'use server';

import { LoginSchema } from '@/lib/schemas';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { InferInput } from 'valibot';

export async function login(data: InferInput<typeof LoginSchema>) {
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
