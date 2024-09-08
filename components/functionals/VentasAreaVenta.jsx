import { CloudOff, PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import ModalVentas from '@/components/functionals/ModalVentas';

import { DataTable } from '../ui/data-table-ventas';
import { columns } from '@/app/(with-layout)/areas-de-venta/columns-ventas';

import { getVenta, getProductos } from '@/lib/services';

export default async function VentasAreaVenta({ id }) {
  const { data, error } = await getVenta(id);

  const { data: productosInfo } = await getProductos();
  return (
    <main className="flex flex-1 flex-col gap-4 pb-4 lg:gap-6 lg:pb-6 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Ventas</h1>
        <ModalVentas
          idPunto={Number(id)}
          productosInfo={productosInfo}
          trigger={
            <Button className="gap-1 items-center" disabled={error}>
              <PackagePlus size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
        />
      </div>

      {data ? (
        <DataTable columns={columns} data={data} id={id} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mb-16">
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
