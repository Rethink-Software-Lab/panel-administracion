'use client';

import { Badge } from '@/components/ui/badge';
import { Row } from '@tanstack/react-table';

interface Data {
  id: number;
  info__codigo: string;
  info__descripcion: string;
  color: string;
  numero: number;
}

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    filterFn: (row: Row<Data>, _: any, rowValue: string) => {
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
    cell: ({ row }: { row: Row<Data> }) =>
      row.getValue('color') || <Badge variant="outline">Vacío</Badge>,
  },
  {
    accessorKey: 'numero',
    header: 'Número',
    cell: ({ row }: { row: Row<Data> }) =>
      row.getValue('numero') || <Badge variant="outline">Vacío</Badge>,
  },
];
