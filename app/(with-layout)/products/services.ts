import { EndpointProductos } from './types';
import { db } from '@/db/initial';
import {
  inventarioCategorias,
  inventarioHistorialpreciocostosalon,
  inventarioHistorialprecioventasalon,
  inventarioImage,
  inventarioProductoinfo,
} from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';

// TODO: actualizar drizzle-orm y usar el nuevo joinLateral

export async function getProductosWithCategorias(): Promise<{
  data: EndpointProductos | null;
  error: string | null;
}> {
  try {
    const productos = await db
      .select({
        id: inventarioProductoinfo.id,
        imagen: inventarioImage.url,
        descripcion: inventarioProductoinfo.descripcion,
        categoria: {
          id: inventarioCategorias.id,
          nombre: inventarioCategorias.nombre,
        },
        precio_costo: sql<string>`(
          SELECT precio 
          FROM ${inventarioHistorialpreciocostosalon} 
          WHERE ${inventarioHistorialpreciocostosalon.productoInfoId} = ${inventarioProductoinfo.id}
          ORDER BY ${inventarioHistorialpreciocostosalon.fechaInicio} DESC 
          LIMIT 1
        )`,
        precio_venta: sql<string>`(
          SELECT precio 
          FROM ${inventarioHistorialprecioventasalon} 
          WHERE ${inventarioHistorialprecioventasalon.productoInfoId} = ${inventarioProductoinfo.id}
          ORDER BY ${inventarioHistorialprecioventasalon.fechaInicio} DESC 
          LIMIT 1
        )`,
        pago_trabajador: inventarioProductoinfo.pagoTrabajador,
      })
      .from(inventarioProductoinfo)
      .leftJoin(
        inventarioImage,
        eq(inventarioProductoinfo.imagenId, inventarioImage.id)
      )
      .innerJoin(
        inventarioCategorias,
        eq(inventarioProductoinfo.categoriaId, inventarioCategorias.id)
      )
      .orderBy(desc(inventarioProductoinfo.id));
    const categorias = await db.select().from(inventarioCategorias);

    return {
      error: null,
      data: {
        productos,
        categorias,
      },
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
