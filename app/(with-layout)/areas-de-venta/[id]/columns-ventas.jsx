'use client';

import { Badge } from '@/components/ui/badge';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { DateTime } from 'luxon';
import { deleteVenta } from './actions';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) => (
      <span>
        {DateTime.fromISO(row.getValue('created_at')).toRelative({
          locale: 'es',
        })}
      </span>
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
    accessorKey: 'usuario__username',
    header: 'Usuario',
  },
  {
    header: ' ',
    cell: ({ row }) => (
      <TableDeleteV2 id={row.original.id} action={deleteVenta} />
    ),
  },
];
