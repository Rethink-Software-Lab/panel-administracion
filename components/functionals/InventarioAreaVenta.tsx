import { columns as columnsNew } from '@/app/(with-layout)/areas-de-venta/[id]/columns';
import { columns as columnsZapatos } from '@/app/(with-layout)/areas-de-venta/[id]/columns-zapatos';
import DataTable from '@/components/functionals/data-tables/data-table-general';
import { DataTable as DataTableNew } from '@/components/ui/data-table-inventario-almacen-2';
import { CloudOff, FileText } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Inventario,
  Zapatos,
} from '@/app/(with-layout)/areas-de-venta/[id]/types';

export default async function InventarioAreaVenta({
  data,
  area_id,
}: {
  data: Inventario;
  area_id: string;
}) {
  const productos = data?.productos;
  const zapatos = data?.zapatos;

  return (
    <main className="flex flex-1 flex-col gap-4 pb-4 lg:gap-6 lg:pb-6 h-full">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
        <Link
          href={{
            pathname: '/reportes',
            query: {
              type: 'inventario',
              area: area_id,
            },
          }}
        >
          <Button variant="outline" size="icon">
            <FileText size={18} />
          </Button>
        </Link>
      </div>

      {productos && zapatos ? (
        <Tabs defaultValue="productos" className="h-full">
          <TabsList className="ml-4 bg-transparent p-0">
            <TabsTrigger
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
              value="productos"
            >
              Productos
            </TabsTrigger>
            <TabsTrigger
              className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
              value="zapatos"
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
            <DataTable<Zapatos> columns={columnsZapatos} data={zapatos} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mx-4 mb-16">
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
