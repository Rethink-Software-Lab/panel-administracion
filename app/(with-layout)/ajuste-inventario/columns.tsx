'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteAjuste } from '@/app/(with-layout)/ajuste-inventario/actions';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';
import SheetInfoAjusteInventario from '@/components/functionals/SheetInfoAjusteInventario';
import { AjusteInventario } from '@/app/(with-layout)/ajuste-inventario/types';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<AjusteInventario> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<AjusteInventario> }) => (
      <span className="flex gap-2 justify-center">
        <SheetInfoAjusteInventario data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteAjuste} />
      </span>
    ),
  },
];
