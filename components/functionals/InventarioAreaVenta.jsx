import { inventarioAreaVenta, getCategorias } from "@/lib/services";

import { columns } from "@/app/(with-layout)/inventario/columns";
import { columns as columnsNew } from "@/app/(with-layout)/inventario/columnsNew";
import { DataTable } from "@/components/ui/data-table-inventario-almacen";
import { DataTable as DataTableNew } from "@/components/ui/data-table-inventario-almacen-2";
import { CloudOff, SearchX } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function InventarioAreaVenta({ id, page }) {
  const {
    data: { productos, zapatos },
  } = await inventarioAreaVenta({ id });
  const { data: categorias } = await getCategorias();
  return (
    <main className="flex flex-1 flex-col gap-4 pb-4 lg:gap-6 lg:pb-6 h-full">
      <div className="flex justify-between items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
      </div>

      {productos ? (
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
              value="zapatos"
            >
              Zapatos
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="inventario"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTableNew
              columns={columnsNew}
              data={productos}
              categorias={categorias}
            />
          </TabsContent>
          <TabsContent
            value="zapatos"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable
              columns={columns}
              data={zapatos}
              categorias={categorias}
            />
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
              Comprueba tu conexión a internet!, si el problema persiste
              contacta con soporte.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
