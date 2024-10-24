import FormReportes from '@/components/functionals/FormReportes';
import { getAreasVentas, getReporte } from '@/lib/services';

import { Suspense } from 'react';
import ButtonPrint from '@/components/functionals/ButtonPrint';
import { CloudOff, FilePenLine, Loader2 } from 'lucide-react';
import ReporteVentas from '@/components/functionals/ReporteVentas';
import ReporteInventario from '@/components/functionals/ReporteInventario';

interface SearchParams {
  type?: 'ventas' | 'inventario';
  area?: string;
  desde?: string;
  hasta?: string;
}

export default async function Reportes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const area = searchParams?.area || '';
  const type = searchParams?.type || '';

  const { data: areas } = await getAreasVentas();
  const { data: reportes, error } = await getReporte(searchParams);

  return (
    <main className="flex flex-1 flex-col pt-4 lg:pt-6">
      <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4 px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl sm:pb-2 lg:pb-4">
          Reportes
        </h1>
        <div className="flex items-center justify-between max-sm:block max-sm:space-y-2">
          <FormReportes areas={areas} />
          <ButtonPrint
            disabled={!reportes || reportes.productos.length < 1 || !!error}
            className="max-sm:w-full"
          />
        </div>
      </div>
      <Suspense
        key={area}
        fallback={
          <div className="flex bg-muted items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        {type === 'ventas' && <ReporteVentas data={reportes} error={error} />}
        {type === 'inventario' && (
          <ReporteInventario data={reportes} error={error} />
        )}
      </Suspense>
      {!type && (
        <div className="bg-muted h-full">
          <div className="flex p-4 m-4 h-[90vh] items-center justify-center rounded-lg bg-background border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <FilePenLine size={72} className="inline-flex mb-4" />
              <h3 className="text-2xl font-bold tracking-tight">
                Seleccione un tipo de reporte
              </h3>
              <p className="text-sm text-muted-foreground">
                Seleccione algunos filtros para comenzar a buscar.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-muted h-full">
          <div className="flex flex-1 p-4 m-4 h-[90vh] items-center justify-center rounded-lg bg-background border border-dashed shadow-sm">
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
        </div>
      )}
    </main>
  );
}
