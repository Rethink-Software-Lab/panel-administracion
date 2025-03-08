import { CloudOff, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getAreasVentas } from '@/lib/services';
import ModalAreasVenta from '@/components/functionals/ModalAreasVenta';

import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from './columns';
import { AreaVenta } from './types';

export default async function AreasVenta() {
  const { data } = await getAreasVentas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Áreas de Venta</h1>

        <ModalAreasVenta
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
        />
      </div>

      {data ? (
        <DataTable<AreaVenta> columns={columns} data={data} />
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
