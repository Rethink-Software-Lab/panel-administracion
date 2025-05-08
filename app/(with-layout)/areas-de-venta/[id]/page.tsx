import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import InventarioAreaVenta from '@/components/functionals/InventarioAreaVenta';
import dynamic from 'next/dynamic';
import { getAreaVenta } from './services';
import { CloudOff } from 'lucide-react';

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
  const { data, error } = await getAreaVenta(Number(params.id));

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-2">
      {data ? (
        <Tabs defaultValue="inventario" className="h-full">
          <TabsList className="m-4">
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
          </TabsList>
          <TabsContent value="inventario" className="h-full">
            <InventarioAreaVenta area_id={params.id} data={data.inventario} />
          </TabsContent>
          <TabsContent value="ventas" className="h-full">
            <VentasAreaVenta
              ventas={data?.ventas}
              productos={data?.all_productos}
              tarjetas={data?.tarjetas}
              id={params?.id}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-1  items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center ">
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
      )}
    </main>
  );
}
