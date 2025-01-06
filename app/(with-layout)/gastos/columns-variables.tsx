'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { Row } from '@tanstack/react-table';
import { Gasto } from './types';
import { DateTime } from 'luxon';
import { deleteGasto } from '@/app/(with-layout)/gastos/actions';
import { Badge } from '@/components/ui/badge';

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
    accessorKey: 'area_venta.nombre',
    header: 'Área de venta',
    cell: ({ row }: { row: Row<Gasto> }) => {
      const area = row.original.area_venta?.nombre;
      const is_cafeteria = row.original.is_cafeteria;
      if (area) {
        return area;
      } else if (!area && is_cafeteria) {
        return 'Cafetería';
      } else {
        return <Badge variant="outline">Área de venta eliminada</Badge>;
      }
    },
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
    cell: ({ row }: { row: Row<Gasto> }) => {
      const username = row.original.usuario?.username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },
  {
    header: ' ',
    cell: ({ row }: { row: Row<Gasto> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteGasto} />
    ),
  },
];
