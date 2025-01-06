'use client';
import { Row } from '@tanstack/react-table';
import { ProductoCafeteria } from './types';

export const columns = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'inventario.cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio de venta',
    cell: ({ row }: { row: Row<ProductoCafeteria> }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('precio_venta')),
  },
];
