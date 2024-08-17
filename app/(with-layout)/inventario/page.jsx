import { Card } from '@/components/ui/card';
import { columns } from './columns';
import { columns as columnsNew } from './columnsNew';
import { DataTable } from '@/components/ui/data-table-inventario-almacen';
import { DataTable as DataTableNew } from '@/components/ui/data-table-inventario-almacen-2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { inventarioAlmacen, getCategorias } from '@/lib/services';
import { CloudOff } from 'lucide-react';

export default async function Inventario() {
  const { data: { productos, zapatos }, errors } = await inventarioAlmacen();
  const { data: categorias } = await getCategorias();


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
      </div>
      {errors &&
        errors?.map(
          (e) =>
            e.message.startsWith('fetch failed') && (
              <div
                key={e.message}
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              >
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
            )
        )}

      {productos && zapatos ? (
        <Tabs defaultValue="inventario" className=" h-full">
        <TabsList>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="zapatos">
            Zapatos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventario" className="h-full">
          <DataTableNew columns={columnsNew} data={productos} categorias={categorias} />
        </TabsContent>
          <TabsContent value="zapatos" className="h-full">
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
