import { CloudOff } from 'lucide-react';

import { DataTableElaboraciones } from '@/components/functionals/data-tables/data-table-elaboraciones';
import { columns } from './columns';
import { GetElaboraciones } from './services';
import SheetElaboraciones from '@/components/functionals/sheets/SheetElaboraciones';

export default async function Elaboraciones() {
  const { data } = await GetElaboraciones();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Elaboraciones</h1>

        <SheetElaboraciones productos={data?.productos} />
      </div>

      {data ? (
        <DataTableElaboraciones
          columns={columns}
          data={data.elaboraciones}
          productos={data?.productos}
        />
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
