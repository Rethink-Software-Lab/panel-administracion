'use client';

import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { Zapatos } from './types';

export const columns: ColumnDef<Zapatos>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    filterFn: (row, _, rowValue) => {
      return row.original.id?.toString().includes(rowValue);
    },
  },
  {
    accessorKey: 'info__codigo',
    header: 'Código',
  },
  {
    accessorKey: 'info__descripcion',
    header: 'Descripción',
  },

  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) =>
      row.getValue('color') || <Badge variant="outline">Vacío</Badge>,
  },
  {
    accessorKey: 'numero',
    header: 'Número',
    cell: ({ row }) =>
      row.getValue('numero') || <Badge variant="outline">Vacío</Badge>,
  },
];
