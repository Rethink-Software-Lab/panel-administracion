import { columns } from '../inventario/columns';
import { columns as columnsNew } from '@/app/(with-layout)/areas-de-venta/[id]/columns';
import { DataTable } from '@/components/ui/data-table-inventario-almacen';
import { DataTable as DataTableNew } from '@/components/ui/data-table-inventario-almacen-2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { inventarioAlmacenRevoltosa, getCategorias } from '@/lib/services';
import { CloudOff } from 'lucide-react';

export default async function Inventario() {
  const { data } = await inventarioAlmacenRevoltosa();
  const productos = data?.inventario.productos;
  const zapatos = data?.inventario.zapatos;

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6 h-full">
      <div className="flex justify-between items-center pl-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          Inventario Almacén Revoltosa
        </h1>
      </div>

      {productos && zapatos ? (
        <Tabs defaultValue="productos" className=" h-full">
          <TabsList className="ml-4 bg-transparent p-0">
            <TabsTrigger
              value="productos"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Productos
            </TabsTrigger>
            <TabsTrigger
              value="zapatos"
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
            >
              Zapatos
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="productos"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTableNew
              columns={columnsNew}
              data={productos}
              categorias={data?.categorias}
            />
          </TabsContent>
          <TabsContent
            value="zapatos"
            className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
          >
            <DataTable columns={columns} data={zapatos} />
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
