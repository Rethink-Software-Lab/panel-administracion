import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ModalSalidasRevoltosa from '@/components/functionals/ModalSalidasRevoltosa';

import { getSalidasRevoltosa, getProductos } from '@/lib/services';

import { DataTable } from '@/components/ui/data-table-salidas';
import { columns } from './columns';

export default async function Salidas() {
  const { data } = await getSalidasRevoltosa();
  const { data: productosInfo } = await getProductos(null, true, null);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Salidas Almacén Revoltosa
        </h1>

        <ModalSalidasRevoltosa
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          productosInfo={productosInfo}
        />
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </main>
  );
}
