import { cookies } from 'next/headers';
import { ResponseNoRepresentados } from './types';

export async function getNoRepresentados(): Promise<{
  data: ResponseNoRepresentados[] | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/no-representados/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const noRepresentados = await res.json();

    return { data: noRepresentados, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: 'Error al conectar con el servidor.' };
  }
}
