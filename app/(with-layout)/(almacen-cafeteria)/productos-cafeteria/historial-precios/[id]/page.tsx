import DataTableGeneral from '@/components/functionals/data-tables/data-table-general';
import { columns } from './columns';
import { getHistorialCafeteria } from './services';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloudOff } from 'lucide-react';

export default async function HistorialPrecios({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getHistorialCafeteria(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          Historial de precios
        </h1>
      </div>

      {data ? (
        <Tabs defaultValue="precios-costo" className=" h-full">
          <TabsList className="px-4 lg:px-6 bg-transparent p-0">
            <TabsTrigger
              value="precios-costo"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Precios de costo
            </TabsTrigger>
            <TabsTrigger
              value="precios-venta"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Precios de venta
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="precios-costo"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTableGeneral
              data={data?.precios_costo || []}
              columns={columns}
            />
          </TabsContent>
          <TabsContent
            value="precios-venta"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTableGeneral
              data={data?.precios_venta || []}
              columns={columns}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="p-4 bg-muted h-full">
          <div className="flex h-[90vh] bg-white flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
        </div>
      )}
    </main>
  );
}
