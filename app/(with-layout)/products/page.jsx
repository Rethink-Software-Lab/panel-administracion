import { CloudOff } from 'lucide-react';

import { getProductos, getCategorias } from '@/lib/services';

import Wrap from '@/components/functionals/ModalProduct';

import { DataTable } from '@/components/ui/data-table-productos';
import { columns } from './columns';

export default async function Products() {
  const { data, error } = await getProductos();
  const { data: categorias } = await getCategorias();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Productos</h1>
        <Wrap categorias={categorias} />
      </div>
      {data ? (
        <DataTable data={data} columns={columns} categorias={categorias} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <CloudOff size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Error de conexión
            </h3>
            <p className="text-sm text-muted-foreground">
              Comprueba tu conexión a internet!, si el problema persiste
              contacta con soporte.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
