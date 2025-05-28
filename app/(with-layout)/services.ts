import { cookies } from 'next/headers';
import { ResponseNoRepresentados, ResponseSearchProducts } from './types';
import { db } from '@/db/initial';
import { inventarioProducto, inventarioProductoinfo } from '@/db/schema';
import { count, eq, gt, isNull } from 'drizzle-orm';

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

export async function getProductosToSearch(): Promise<{
  data: ResponseSearchProducts[] | null;
  error: string | null;
}> {
  try {
    const productos = await db
      .select({
        id: inventarioProductoinfo.id,
        nombre: inventarioProductoinfo.descripcion,
      })
      .from(inventarioProductoinfo)
      .leftJoin(
        inventarioProducto,
        eq(inventarioProducto.infoId, inventarioProductoinfo.id)
      )
      .where(isNull(inventarioProducto.ventaId))
      .groupBy(inventarioProductoinfo.id)
      .having(gt(count(inventarioProducto.id), 0));

    return { data: productos, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: 'Error al conectar con el servidor.' };
  }
}
