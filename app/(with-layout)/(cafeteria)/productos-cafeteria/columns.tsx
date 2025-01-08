'use client';
import { Row } from '@tanstack/react-table';
import { ProductoCafeteria } from './types';
import SheetProductosCafeteria from '@/components/functionals/sheets/SheetProductosCafeteria';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteProductoCafeteria } from './actions';

export const columns = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'precio_costo',
    header: 'Precio de costo',
    cell: ({ row }: { row: Row<ProductoCafeteria> }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('precio_costo')),
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
  {
    header: ' ',
    cell: ({ row }: { row: Row<ProductoCafeteria> }) => (
      <span className="space-x-2">
        <SheetProductosCafeteria data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteProductoCafeteria} />
      </span>
    ),
  },
];
