import DataTableGeneral from '@/components/functionals/data-tables/data-table-general';
import { columns } from '@/lib/columnsHistorialesPrecios';
import { CloudOff } from 'lucide-react';
import { getHistorialPrecioElaboracion } from '../../services';

export default async function HistorialPrecioElaboracion({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getHistorialPrecioElaboracion(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Historial de precio
        </h1>
      </div>

      {data ? (
        <DataTableGeneral data={data || []} columns={columns} />
      ) : (
        <div className="p-4 h-full">
          <div className="flex h-[90vh] bg-white flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
        </div>
      )}
    </main>
  );
}
