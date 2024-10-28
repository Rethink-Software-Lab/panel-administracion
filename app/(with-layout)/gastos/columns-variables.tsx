'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { Row } from '@tanstack/react-table';
import { Gasto } from './types';
import { DateTime } from 'luxon';
import { deleteGasto } from '@/app/(with-layout)/gastos/actions';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<Gasto> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'cantidad',
    header: 'Monto',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },
  {
    header: ' ',
    cell: ({ row }: { row: Row<Gasto> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteGasto} />
    ),
  },
];
