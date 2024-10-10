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
  const { isAlmacenero } = getSession();
  const { data } = await getArea(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-2">
      <Tabs defaultValue="inventario" className="h-full">
        <TabsList className="m-4">
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger disabled={isAlmacenero} value="ventas">
            Ventas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventario" className="h-full">
          <InventarioAreaVenta
            data={data?.inventario}
            area={data?.area_venta}
          />
        </TabsContent>
        {!isAlmacenero && (
          <TabsContent value="ventas" className="h-full">
            <VentasAreaVenta
              ventas={data?.ventas}
              productos={data?.all_productos}
              id={params?.id}
            />
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
