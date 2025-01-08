import { DataTable } from '@/components/ui/data-table';

import { CloudOff } from 'lucide-react';
import { ProductosCafeteria } from './services';
import { columns } from './columns';
import SheetProductosCafeteria from '@/components/functionals/sheets/SheetProductosCafeteria';

export default async function Inventario() {
  const { data } = await ProductosCafeteria();

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6 h-full">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          Productos Cafetería
        </h1>
        <SheetProductosCafeteria />
      </div>

      {data ? (
        <div className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted">
          <DataTable columns={columns} data={data} />
        </div>
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
