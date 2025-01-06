import { Card, CardTitle } from '@/components/ui/card';

import { Hourglass } from 'lucide-react';

import CardsInicio from '@/components/functionals/CardsInicio';
import CardMasVendidos from '@/components/functionals/CardMasVendidos';
import ChartVentaPorArea from '@/components/functionals/ChartVentasPorArea';
import ChartVentasAnuales from '@/components/functionals/ChartVentasAnuales';

import { graficas } from '@/lib/services';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Initial() {
  const { isVendedor, area_venta } = getSession();
  const { data } = await graficas();
  if (isVendedor) return redirect(`areas-de-venta/${area_venta}`);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <CardsInicio
          description="Hoy"
          data={Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'CUP',
          }).format(data?.ventasHoy)}
        />
        <CardsInicio
          description="Esta semana"
          data={Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'CUP',
          }).format(data?.ventasSemana)}
        />
        <CardsInicio
          description="Este mes"
          data={Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'CUP',
          }).format(data?.ventasMes)}
        />
        <CardsInicio
          description="Total de zapatos"
          data={data?.total_zapatos}
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <ChartVentaPorArea data={data?.ventasPorArea} />

        <CardMasVendidos data={data?.masVendidos} />
      </div>
      <ChartVentasAnuales data={data?.ventasAnuales} />
    </main>
  );
}
