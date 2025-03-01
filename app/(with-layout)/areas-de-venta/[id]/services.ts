import { cookies } from 'next/headers';
import { EndpointOneAreaVenta } from './types';

export async function getAreaVenta(
  id: number
): Promise<{ data: EndpointOneAreaVenta | null; error: string | null }> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V3 + '/area-venta/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`area-venta-${id}`],
      },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      if (res.status === 404)
        return { data: null, error: 'No se encontró la área de venta' };
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
