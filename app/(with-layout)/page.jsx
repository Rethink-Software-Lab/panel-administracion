import { Card, CardTitle } from '@/components/ui/card';

import { Hourglass } from 'lucide-react';

import CardsInicio from '@/components/functionals/CardsInicio';
import CardMasVendidos from '@/components/functionals/CardMasVendidos';
import ChartVentaPorArea from '@/components/functionals/ChartVentasPorArea';
import ChartVentasAnuales from '@/components/functionals/ChartVentasAnuales';

import { Skeleton } from '@/components/ui/skeleton';

import {
  ventasHoy,
  ventasSemana,
  ventasMes,
  grafico,
  ventasPorArea,
} from '@/lib/services';
import { Suspense } from 'react';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Initial() {
  const { isVendedor, punto } = getSession();
  const { data: ventas } = await ventasPorArea();
  if (isVendedor) return redirect(`areas-de-venta/${punto}`);
  const { data, errors } = await grafico();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Suspense fallback={<Skeleton className="rounded-lg" />}>
          <CardsInicio description="Hoy" getData={ventasHoy} />
        </Suspense>
        <Suspense fallback={<Skeleton className="rounded-lg" />}>
          <CardsInicio description="Esta semana" getData={ventasSemana} />
        </Suspense>
        <Suspense fallback={<Skeleton className="rounded-lg" />}>
          <CardsInicio description="Este mes" getData={ventasMes} />
        </Suspense>
        <Card className=" opacity-50 ">
          <CardTitle className="flex text-lg gap-2 items-center p-6 opacity-50">
            <Hourglass className="" size={20} />
            Próximamente
          </CardTitle>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <ChartVentaPorArea data={ventas} />

        <CardMasVendidos />
      </div>
      <ChartVentasAnuales data={data} />
    </main>
  );
}
