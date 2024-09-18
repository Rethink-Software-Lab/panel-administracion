'use client';

import { Badge } from '@/components/ui/badge';

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
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
