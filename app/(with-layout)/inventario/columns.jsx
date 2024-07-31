'use client';

import { Badge } from '@/components/ui/badge';

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: 'codigo',
    accessorKey: 'info.codigo',
    header: 'Código',
  },
  {
    id: 'categoria',
    accessorKey: 'info.categoria.nombre',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge variant="outline">{row?.original?.info?.categoria?.nombre}</Badge>
    ),
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
