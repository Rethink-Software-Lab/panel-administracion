import { CloudOff, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import Link from 'next/link';
import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from './columns';
import { getEntradas } from './services';
import { Entrada } from './types';

export default async function Entradas() {
  const { data } = await getEntradas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Entradas</h1>

        <Link href="/create-entrada" passHref>
          <Button className="gap-1 items-center">
            <PlusCircle size={18} />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>
        </Link>
      </div>

      {data ? (
        <DataTable<Entrada> columns={columns} data={data} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
