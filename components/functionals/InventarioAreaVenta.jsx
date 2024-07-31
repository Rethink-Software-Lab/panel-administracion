import { inventarioAreaVenta, getCategorias } from '@/lib/services';

import { columns } from '@/app/(with-layout)/inventario/columns';
import { DataTable } from '@/components/ui/data-table-inventario-almacen';
import { CloudOff, SearchX } from 'lucide-react';

export default async function InventarioAreaVenta({ id, page }) {
  const { data: productos } = await inventarioAreaVenta({ id });
  const { data: categorias } = await getCategorias();
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
      </div>

      {productos ? (
        <DataTable columns={columns} data={productos} categorias={categorias} />
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
