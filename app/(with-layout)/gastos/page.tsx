import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getGastos } from '@/lib/services';
import { DataTable } from '@/components/functionals/data-tables/data-table-gastos';
import { columns as columsVariables } from '@/app/(with-layout)/gastos/columns-variables';
import { columns as columnsFijos } from '@/app/(with-layout)/gastos/columns-fijos';
import SheetGastos from '@/components/functionals/sheets/SheetGastos';
import { CloudOff } from 'lucide-react';

export default async function Gastos() {
  const { data } = await getGastos();

  return (
    <main className="flex flex-1 flex-col gap-4 pt-4 lg:gap-6 lg:pt-6">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Gastos</h1>

        <SheetGastos areas={data?.areas_venta} />
      </div>
      {data ? (
        <Tabs defaultValue="gastos-variables" className=" h-full">
          <TabsList className="px-4 lg:px-6 bg-transparent p-0">
            <TabsTrigger
              value="gastos-variables"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Gastos Variables
            </TabsTrigger>
            <TabsTrigger
              value="gastos-fijos"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Gastos Fijos
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="gastos-variables"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable columns={columsVariables} data={data.variables} />
          </TabsContent>
          <TabsContent
            value="gastos-fijos"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable
              columns={columnsFijos}
              data={data.fijos}
              areas={data?.areas_venta}
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
