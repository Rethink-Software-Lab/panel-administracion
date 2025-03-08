import { cookies } from 'next/headers';
import { EndpointInventario } from './types';

export async function inventarioAlmacen(): Promise<{
  data: EndpointInventario | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/inventario/almacen/',
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
