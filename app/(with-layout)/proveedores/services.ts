import { db } from '@/db/initial';
import { inventarioProveedor } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Proveedor } from './types';

export async function getProveedores(): Promise<{
  data: Proveedor[] | null;
  error: string | null;
}> {
  try {
    const proveedores = await db
      .select()
      .from(inventarioProveedor)
      .orderBy(desc(inventarioProveedor.id));

    return {
      data: proveedores,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: 'Error al obtener los proveedores',
    };
  }
}
