'use client';

import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { Productos } from './types';

export const columns: ColumnDef<Productos>[] = [
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
    accessorKey: 'categoria_nombre',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge variant="outline">{row?.original?.categoria_nombre}</Badge>
    ),
  },
];
