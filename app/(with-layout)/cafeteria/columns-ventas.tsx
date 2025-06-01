'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteVentaCafeteria } from './actions';
import { ColumnDef } from '@tanstack/react-table';
import { CustomTableOptions } from '@/components/functionals/data-tables/data-table-elaboraciones';
import { VentasCafeteria } from './types';
import { DateTime } from 'luxon';
import { Badge } from '@/components/ui/badge';
import SheetInfoVentasCafeteria from '@/components/functionals/sheets/SheetInfoVentasCafeteria';

export const columns: ColumnDef<VentasCafeteria>[] = [
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
    accessorKey: 'metodo_pago',
    header: 'Método de pago',
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>
    ),
  },

  {
    accessorKey: 'importe',
    header: 'Importe',
    cell: ({ row }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('importe')),
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }) => {
      const username = row.original.usuario;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },

  {
    header: ' ',
    cell: ({ row, table }) => {
      const productos = (table.options as CustomTableOptions<VentasCafeteria>)
        .productos;

      return (
        <span className="space-x-2">
          <SheetInfoVentasCafeteria data={row.original} />
          <TableDeleteV2 id={row.original.id} action={deleteVentaCafeteria} />
        </span>
      );
    },
  },
];
