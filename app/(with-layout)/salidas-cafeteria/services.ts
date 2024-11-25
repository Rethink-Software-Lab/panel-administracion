import { cookies } from 'next/headers';
import { SalidasCafeteria as SalidasCafeteriaTypes } from '@/app/(with-layout)/salidas-cafeteria/types';
import { ProductoCodigoCategoria } from '@/components/functionals/sheets/SheetEntradasCafeteria';

interface Response {
  salidas: SalidasCafeteriaTypes[];
  productos: ProductoCodigoCategoria[];
}

export async function SalidasCafeteria(): Promise<{
  data: Response | null;
  error: string | null;
}> {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/salidas-cafeteria/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['salidas-cafeteria'] },
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
