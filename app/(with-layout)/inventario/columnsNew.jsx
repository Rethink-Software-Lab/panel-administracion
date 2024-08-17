'use client';

import { Badge } from '@/components/ui/badge';

export const columns = [
  {
    id: 'codigo',
    accessorKey: 'codigo',
    header: 'Código',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion',
  },
  {
    id: 'categoria',
    accessorKey: 'categoria__nombre',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge variant="outline">{row?.original?.categoria__nombre}</Badge>
    ),
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
];
