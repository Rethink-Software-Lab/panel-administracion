import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { getCategorias } from '@/lib/services';
// import { deleteEnseñanza } from '@/app/(with-layout)/ensenanza/actions';

import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ModalCategoria from '@/components/functionals/ModalCategoria';

export default async function Proyectos() {
  const { data, errors } = await getCategorias();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Categorías</h1>
        <ModalCategoria
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        // action={deleteEnseñanza}
        // Modal={ModalEnseñanzas}
        // columnsView={false}
        // columnVisibility={{ id: false }}
      />
    </main>
  );
}
