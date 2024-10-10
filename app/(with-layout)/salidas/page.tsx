import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ModalSalidas from '@/components/functionals/ModalSalida';

import { getSalidas } from '@/lib/services';

import { DataTable } from '@/components/ui/data-table-salidas';
import { columns } from './columns';

export default async function Salidas() {
  const { data } = await getSalidas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Salidas</h1>

        <ModalSalidas
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          areasVenta={data?.areas_de_venta}
          productosInfo={data?.productos}
        />
      </div>
      {data && <DataTable columns={columns} data={data?.salidas} />}
    </main>
  );
}
