import { cookies } from 'next/headers';
import { Elaboraciones } from './types';
import { ProductoEntrada } from '../entradas-cafeteria/types';

interface Data {
  elaboraciones: Elaboraciones[];
  productos: ProductoEntrada[];
}

export async function GetElaboraciones(): Promise<{
  data: Data | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/cafeteria/elaboraciones/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['elaboraciones'] },
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
