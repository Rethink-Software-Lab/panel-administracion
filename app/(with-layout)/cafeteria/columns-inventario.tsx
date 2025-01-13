'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ProductoCafeteria } from './types';

export const columns: ColumnDef<ProductoCafeteria>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'inventario_area.cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio de venta',
    cell: ({ row }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('precio_venta')),
  },
];
