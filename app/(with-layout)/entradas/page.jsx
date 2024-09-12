import { CloudOff, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getEntradas } from '@/lib/services';

import Link from 'next/link';
import { DataTable } from '@/components/ui/data-table-entradas';
import { columns } from './columns';

export default async function Entradas() {
  const { data, error } = await getEntradas();

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
        <DataTable columns={columns} data={data} />
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
