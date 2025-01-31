import { getSession } from '@/lib/getSession';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import InventarioAreaVenta from '@/components/functionals/InventarioAreaVenta';
import dynamic from 'next/dynamic';
import { getArea } from '@/lib/services';

const VentasAreaVenta = dynamic(
  () => import('@/components/functionals/VentasAreaVenta'),
  {
    loading: () => <p>Cargando...</p>,
  }
);

interface Params {
  id: string;
}

export default async function AreaVenta({ params }: { params: Params }) {
  const { isStaff, area_venta } = getSession();
  const { data } = await getArea(params.id);

  let is_authorized = false;

  if (isStaff) {
    is_authorized = true;
  } else if (area_venta) {
    if (params.id === '28') {
      if (
        area_venta === '4' ||
        area_venta === '6' ||
        area_venta === params.id
      ) {
        is_authorized = true;
      } else {
        if (area_venta === params.id) {
          is_authorized = true;
        }
      }
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-2">
      <Tabs defaultValue="inventario" className="h-full">
        <TabsList className="m-4">
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger disabled={!is_authorized} value="ventas">
            Ventas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventario" className="h-full">
          <InventarioAreaVenta area_id={params.id} data={data?.inventario} />
        </TabsContent>
        {is_authorized && (
          <TabsContent value="ventas" className="h-full">
            <VentasAreaVenta
              ventas={data?.ventas}
              productos={data?.all_productos}
              tarjetas={data?.tarjetas}
              id={params?.id}
            />
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
