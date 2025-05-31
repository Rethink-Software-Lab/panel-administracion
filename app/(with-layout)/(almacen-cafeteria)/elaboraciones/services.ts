import { cookies } from 'next/headers';
import { Elaboraciones, PrecioElaboracion } from './types';
import { ProductoEntrada } from '../entradas-cafeteria/types';
import { db } from '@/db/initial';
import { inventarioPrecioelaboracion, inventarioUser } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

export async function getHistorialPrecioElaboracion(
  id: string
): Promise<{ data: PrecioElaboracion[] | null; error: string | null }> {
  try {
    const precios = await db
      .select({
        id: inventarioPrecioelaboracion.id,
        precio: inventarioPrecioelaboracion.precio,
        fecha_inicio: inventarioPrecioelaboracion.fechaInicio,
        usuario: inventarioUser.username,
      })
      .from(inventarioPrecioelaboracion)
      .where(eq(inventarioPrecioelaboracion.elaboracionId, Number(id)))
      .innerJoin(
        inventarioUser,
        eq(inventarioUser.id, inventarioPrecioelaboracion.usuarioId)
      );

    return { data: precios, error: null };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
