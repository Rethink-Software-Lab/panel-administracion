'use server';

import { InferInput } from 'valibot';
import { ProveedorSchema } from './schema';
import { db } from '@/db/initial';
import { inventarioProveedor } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addProveedor(
  data: InferInput<typeof ProveedorSchema>
): Promise<{ data: string | null; error: string | null }> {
  try {
    await db.insert(inventarioProveedor).values(data);
    revalidatePath('/proveedores');
    return { data: 'El proveedor se agregó correctamente', error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Error al agregar el proveedor' };
  }
}

export async function editProveedor(
  id: number,
  data: InferInput<typeof ProveedorSchema>
): Promise<{ data: string | null; error: string | null }> {
  try {
    await db
      .update(inventarioProveedor)
      .set(data)
      .where(eq(inventarioProveedor.id, id));
    revalidatePath('/proveedores');
    return { data: 'El proveedor se modificó correctamente', error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Error al editar el proveedor' };
  }
}

export async function deleteProveedor({ id }: { id: number }) {
  try {
    await db.delete(inventarioProveedor).where(eq(inventarioProveedor.id, id));
    revalidatePath('/proveedores');
    return { data: 'El proveedor se eliminó correctamente', error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Error al eliminar el proveedor' };
  }
}
