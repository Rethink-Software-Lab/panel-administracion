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
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio de venta',
    cell: ({ row }) => <span>${row?.original?.precio_venta}</span>,
  },
  {
    id: 'categoria',
    accessorKey: 'categoria__nombre',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge variant="outline">{row?.original?.categoria__nombre}</Badge>
    ),
  },
];
