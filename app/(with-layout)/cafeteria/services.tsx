import { cookies } from 'next/headers';
import { ResponseCafeteria } from './types';

export async function inventarioCafeteria(): Promise<{
  data: ResponseCafeteria | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/cafeteria/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['area-cafeteria'] },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
