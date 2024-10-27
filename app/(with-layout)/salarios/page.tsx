import { CloudOff } from 'lucide-react';

import { getSalarios } from '@/lib/services';

import { DataTable } from '@/components/ui/data-table-entradas';
import { columns } from '@/app/(with-layout)/salarios/columns';
import SheetSalarios from '@/components/functionals/sheets/SheetSalarios';

export default async function Transferencias() {
  const { data } = await getSalarios();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Salarios</h1>

        <SheetSalarios usuarios={data.usuarios} />
      </div>

      {data.salarios ? (
        <DataTable columns={columns} data={data.salarios} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <CloudOff size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Error de conexión
            </h3>
            <p className="text-sm text-muted-foreground">
              No se pudo conectar con el servidor
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
