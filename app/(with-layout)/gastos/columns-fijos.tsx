'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { Row } from '@tanstack/react-table';
import { Gasto } from './types';
import { deleteGasto } from '@/app/(with-layout)/gastos/actions';
import { Badge } from '@/components/ui/badge';
import SheetGastos from '@/components/functionals/sheets/SheetGastos';

const DiasSemana: { [key: number]: string } = {
  0: 'Lunes',
  1: 'Martes',
  2: 'Miércoles',
  3: 'Jueves',
  4: 'Viernes',
  5: 'Sábado',
  6: 'Domingo',
};

export const columns = [
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'frecuencia',
    header: 'Frecuencia',
    cell: ({ row }: { row: Row<Gasto> }) => (
      <Badge variant="outline">{row.getValue('frecuencia')}</Badge>
    ),
  },
  {
    header: 'Día',
    cell: ({ row }: { row: Row<Gasto> }) =>
      row.original.dia_mes ||
      (row.original.dia_semana && DiasSemana[row.original.dia_semana]),
  },
  {
    accessorKey: 'cantidad',
    header: 'Monto',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },
  {
    header: ' ',
    cell: ({ row }: { row: Row<Gasto> }) => (
      <span className="space-x-2">
        <SheetGastos data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteGasto} />
      </span>
    ),
  },
];
