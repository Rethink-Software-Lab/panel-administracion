'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteSalario } from './actions';
import { Row } from '@tanstack/react-table';
import { Salario } from '@/app/(with-layout)/salarios/types';

export const columns = [
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<Salario> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteSalario} />
    ),
  },
];
