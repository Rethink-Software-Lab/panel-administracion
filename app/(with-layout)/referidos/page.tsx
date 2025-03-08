import { CloudOff } from 'lucide-react';

import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from './columns';
import { getReferidos } from './services';
import SheetReferidos from '@/components/functionals/sheets/SheetReferidos';
import { Referido } from './types';

export default async function Referidos() {
  const { data, error } = await getReferidos();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Referidos</h1>

        <SheetReferidos />
      </div>

      {!error && data ? (
        <DataTable<Referido> columns={columns} data={data} />
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
