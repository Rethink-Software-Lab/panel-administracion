'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteTransferencia } from './actions';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';
import SheetInfoTransferencias from '@/components/functionals/SheetInfoTransferencias';
import { Transferencia } from './types';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<Transferencia> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'de.nombre',
    header: 'Área de origen',
  },
  {
    accessorKey: 'para.nombre',
    header: 'Área de destino',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<Transferencia> }) => (
      <span className="space-x-2">
        <SheetInfoTransferencias data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteTransferencia} />
      </span>
    ),
  },
];
