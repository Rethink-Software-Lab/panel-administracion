import FormReportes from '@/components/functionals/FormReportes';
import { getAreasVentas, getReporte } from '@/lib/services';

import Reporte from '@/components/functionals/Reporte';
import { Suspense } from 'react';
import ButtonPrint from '@/components/functionals/ButtonPrint';
import { Loader2 } from 'lucide-react';

interface SearchParams {
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

  const { data: areas } = await getAreasVentas();
  const { data: reportes, error } = await getReporte(searchParams);
  return (
    <main className="flex flex-1 flex-col pt-4 lg:pt-6">
      <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4 px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl sm:pb-2 lg:pb-4">
          Reportes de ventas
        </h1>
        <div className="flex items-center justify-between max-sm:block max-sm:space-y-2">
          <FormReportes areas={areas?.areasVenta} />
          <ButtonPrint
            disabled={!reportes || !!error}
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
        <Reporte data={reportes} error={error} />
      </Suspense>
    </main>
  );
}
