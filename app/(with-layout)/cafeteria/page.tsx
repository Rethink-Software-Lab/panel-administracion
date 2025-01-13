import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import dynamic from 'next/dynamic';
import { inventarioCafeteria } from './services';
import { DataTable } from '@/components/ui/data-table';
import { CloudOff } from 'lucide-react';
import { columns as columnsInventario } from './columns-inventario';
import { columns as columnsVentas } from './columns-ventas';
import SheetVentasCafeteria from '@/components/functionals/sheets/SheetVentasCafeteria';

export default async function Cafeteria() {
  const { data } = await inventarioCafeteria();
  console.log(data);
  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6 ">
      <div className="flex justify-between items-center px-6 pt-6 pb-0">
        <h1 className="text-lg font-semibold md:text-2xl">Cafetería</h1>
        <SheetVentasCafeteria
          productos={data?.productos_elaboraciones}
          tarjetas={data?.tarjetas}
        />
      </div>

      {data ? (
        <Tabs defaultValue="inventario" className="h-full">
          <TabsList className="ml-4 bg-transparent p-0">
            <TabsTrigger
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
              value="inventario"
            >
              Inventario
            </TabsTrigger>
            <TabsTrigger
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
              value="ventas"
            >
              Ventas
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="inventario"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable columns={columnsInventario} data={data?.inventario} />
          </TabsContent>
          <TabsContent
            value="ventas"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable columns={columnsVentas} data={data?.ventas} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
      )}
    </main>
  );
}
