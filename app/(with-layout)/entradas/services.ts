import { cookies } from 'next/headers';
import { Entrada } from './types';

export async function getEntradas(): Promise<{
  data: Entrada[] | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/entradas/principal/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
