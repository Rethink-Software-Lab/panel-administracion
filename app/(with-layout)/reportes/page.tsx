import { getReporte } from '@/lib/services';

import { Suspense } from 'react';
import { CloudOff, FilePenLine, Loader2 } from 'lucide-react';
import ReporteVentas from '@/components/functionals/ReporteVentas';
import ReporteVentasCafeteria from '@/components/functionals/ReporteVentasCafeteria';
import ReporteInventario from '@/components/functionals/ReporteInventario';
import { getReporteCafeteria } from './services';

export interface ReportesSearchParams {
  type?: 'ventas' | 'inventario';
  area?: string;
  desde?: string;
  hasta?: string;
  categoria?: string;
}

export default async function Reportes({
  searchParams,
}: {
  searchParams: ReportesSearchParams;
}) {
  const area = searchParams?.area || '';
  const type = searchParams?.type || '';

  const { data: reportes, error } =
    type === 'ventas' && area === 'cafeteria'
      ? await getReporteCafeteria(searchParams)
      : await getReporte(searchParams);

  console.log(reportes);

  return (
    <>
      <Suspense
        key={area}
        fallback={
          <div className="flex bg-muted items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        {type === 'ventas' &&
          (area === 'cafeteria' ? (
            <ReporteVentasCafeteria data={reportes} error={error} />
          ) : (
            <ReporteVentas data={reportes} error={error} />
          ))}
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
    </>
  );
}
