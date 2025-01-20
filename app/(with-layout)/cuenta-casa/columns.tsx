'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import SheetInfoMerma from '@/components/functionals/sheets/SheetInfoMerma';
import { deleteCuentaCasa } from './actions';
import { CuentaCasa } from './types';

export const columns: ColumnDef<CuentaCasa>[] = [
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
    accessorKey: '',
    header: 'Prod/Elab',
    cell: ({ row }) => {
      const cant_prod = row.original.cantidad_productos;
      const cant_elab = row.original.cantidad_elaboraciones;
      return `${cant_elab}x Elab, ${cant_prod}x Prod`;
    },
  },
  {
    accessorKey: '',
    header: 'Localización',
    cell: ({ row }) => {
      if (row.original.is_almacen) {
        return <Badge variant="outline">Almacen</Badge>;
      } else {
        return <Badge variant="outline">Cafetería</Badge>;
      }
    },
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }) => {
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
    cell: ({ row }) => (
      <span className="flex gap-2 justify-center">
        <SheetInfoMerma data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteCuentaCasa} />
      </span>
    ),
  },
];
