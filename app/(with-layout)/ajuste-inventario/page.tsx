import { CloudOff } from 'lucide-react';

import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from '@/app/(with-layout)/ajuste-inventario/columns';
import SheetAjusteInventario from '@/components/functionals/SheetAjusteInventario';
import { AjusteInventario as TypeAjuste } from './types';
import { getAjustesInventario } from './services';

export default async function AjusteInventario() {
  const { data } = await getAjustesInventario();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Ajuste Inventario</h1>

        <SheetAjusteInventario
          areas={data?.areas_ventas || []}
          productosInfo={data?.productos_info || []}
        />
      </div>

      {data?.ajustes ? (
        <DataTable<TypeAjuste> columns={columns} data={data.ajustes} />
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
