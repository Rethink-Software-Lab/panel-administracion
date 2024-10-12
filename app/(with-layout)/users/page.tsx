import { CloudOff, UserRoundPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getUsuarios } from '@/lib/services';

import ModalUser from '@/components/functionals/ModalUser';

import { DataTable } from '@/components/ui/data-table-usuarios';
import { columns } from './columns';

export default async function Initial() {
  const { data, error } = await getUsuarios();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
        <ModalUser
          trigger={
            <Button className="gap-1 items-center" disabled={!!error}>
              <UserRoundPlus size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          areas={data?.areas_ventas}
        />
      </div>

      {data?.usuarios && data?.areas_ventas ? (
        <DataTable
          data={data?.usuarios}
          columns={columns}
          areas={data?.areas_ventas}
        />
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
