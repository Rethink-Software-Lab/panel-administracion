'use client';

import { Badge } from '@/components/ui/badge';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { DateTime } from 'luxon';
import { deleteVenta } from './actions';
import { ColumnDef } from '@tanstack/react-table';
import { Ventas } from './types';
import { canDeleteVenta } from '@/lib/utils';

export const columns: ColumnDef<Ventas>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) =>
      DateTime.fromSQL(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'descripcion',
    header: 'Producto',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'importe',
    header: 'Importe',
    cell: ({ row }) => {
      return <span>${row.getValue('importe')}</span>;
    },
  },
  {
    accessorKey: 'metodo_pago',
    header: 'Método de pago',
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>;
    },
  },
  {
    accessorKey: 'username',
    header: 'Usuario',
    cell: ({ row }) => {
      const username = row.original.usuario.username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },
  {
    header: ' ',
    cell: ({ row, table }) => (
      <TableDeleteV2
        id={row.original.id}
        action={deleteVenta}
        disabled={
          !canDeleteVenta(
            // @ts-ignore
            table.options.userId,
            row.original.usuario.id,
            // @ts-ignore
            table.options.isStaff
          )
        }
      />
    ),
  },
];
