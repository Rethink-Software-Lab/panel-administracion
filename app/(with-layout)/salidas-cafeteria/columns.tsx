'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteSalidaCafeteria } from './actions';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';

import { SalidasCafeteria } from '@/app/(with-layout)/salidas-cafeteria/types';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<SalidasCafeteria> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'info_producto.descripcion',
    header: 'Producto',
    size: 200,
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },

  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<SalidasCafeteria> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteSalidaCafeteria} />
    ),
  },
];
