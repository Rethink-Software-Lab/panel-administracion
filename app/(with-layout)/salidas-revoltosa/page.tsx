import { CloudOff, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ModalSalidasRevoltosa from '@/components/functionals/ModalSalidasRevoltosa';

import { getSalidasRevoltosa } from '@/lib/services';

import { DataTable } from '@/components/ui/data-table-salidas';
import { columns } from './columns';

export default async function Salidas() {
  const { data } = await getSalidasRevoltosa();

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
          productosInfo={data?.productos}
        />
      </div>
      {data ? (
        <DataTable columns={columns} data={data?.salidas} />
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
