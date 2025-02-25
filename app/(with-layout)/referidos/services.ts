import { Referido } from './types';
import { db } from '@/db/initial';
import { inventarioVendedorexterno } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function getReferidos(): Promise<{
  data: Referido[] | null;
  error: string | null;
}> {
  try {
    const referidos = await db
      .select()
      .from(inventarioVendedorexterno)
      .orderBy(desc(inventarioVendedorexterno.id));
    return {
      error: null,
      data: referidos,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
