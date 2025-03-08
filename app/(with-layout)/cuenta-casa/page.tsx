import { CloudOff } from 'lucide-react';

import DataTable from '@/components/functionals/data-tables/data-table-general';
import { getCuentaCasa } from './services';
import { columns } from './columns';
import SheetAddCuentaCasa from '@/components/functionals/sheets/SheetAddCuentaCasa';
import { type CuentaCasa } from './types';

export default async function CuentaCasa() {
  const { data } = await getCuentaCasa();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Cuenta Casa</h1>

        <SheetAddCuentaCasa productos={data?.productos_elaboraciones} />
      </div>

      {data?.cuenta_casa ? (
        <DataTable<CuentaCasa> columns={columns} data={data.cuenta_casa} />
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
