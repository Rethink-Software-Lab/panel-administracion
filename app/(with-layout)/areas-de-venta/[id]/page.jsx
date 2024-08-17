import { getSession } from "@/lib/getSession";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InventarioAreaVenta from "@/components/functionals/InventarioAreaVenta";
import dynamic from "next/dynamic";

const VentasAreaVenta = dynamic(
  () => import("@/components/functionals/VentasAreaVenta"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

export default async function AreaVenta({ params, searchParams }) {
  const { isAlmacenero } = getSession();
  const page = searchParams["p"] ?? 1;

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
          <InventarioAreaVenta id={params?.id} page={page} />
        </TabsContent>
        {!isAlmacenero && (
          <TabsContent value="ventas" className="h-full">
            <VentasAreaVenta id={params?.id} page={page} />
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
