import { EndpointFormEntrada } from './types';
import { db } from '@/db/initial';
import {
  inventarioCategorias,
  inventarioCuentas,
  inventarioProductoinfo,
  inventarioProveedor,
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getProductos(): Promise<{
  data: EndpointFormEntrada | null;
  error: string | null;
}> {
  try {
    const productos = await db
      .select({
        id: inventarioProductoinfo.id,
        descripcion: inventarioProductoinfo.descripcion,
        categoria: inventarioCategorias.nombre,
      })
      .from(inventarioProductoinfo)
      .leftJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .orderBy(desc(inventarioProductoinfo.id));
    const cuentas = await db
      .select()
      .from(inventarioCuentas)
      .orderBy(desc(inventarioCuentas.id));
    const proveedores = await db
      .select({
        id: inventarioProveedor.id,
        nombre: inventarioProveedor.nombre,
      })
      .from(inventarioProveedor)
      .orderBy(desc(inventarioProveedor.id));

    return {
      error: null,
      data: {
        productos,
        cuentas,
        proveedores,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
