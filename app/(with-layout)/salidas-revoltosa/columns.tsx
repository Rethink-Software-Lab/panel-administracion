'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteSalidaRevoltosa } from './actions';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';

import { SalidasRevoltosa } from './types';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<SalidasRevoltosa>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'producto__info__descripcion',
    header: 'Producto',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },

  {
    accessorKey: 'usuario__username',
    header: 'Usuario',
    cell: ({ row }) => {
      const username = row.original.usuario__username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },

  {
    header: ' ',
    cell: ({ row }) => (
      <TableDeleteV2 id={row.original.id} action={deleteSalidaRevoltosa} />
    ),
  },
];
