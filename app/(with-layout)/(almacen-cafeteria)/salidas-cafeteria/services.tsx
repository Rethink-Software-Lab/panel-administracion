import { cookies } from 'next/headers';
import { ResponseSalidasCafeteria } from './types';

export async function getSalidasAlmacenCafeteria(): Promise<{
  data: ResponseSalidasCafeteria | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/almacen-cafeteria/salidas/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['salidas-cafeteria'] },
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
