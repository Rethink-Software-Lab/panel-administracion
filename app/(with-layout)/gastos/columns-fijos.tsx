'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Gasto } from './types';
import { deleteGasto } from '@/app/(with-layout)/gastos/actions';
import { Badge } from '@/components/ui/badge';
import SheetGastos from '@/components/functionals/sheets/SheetGastos';
import { CustomTableOptions } from '@/components/functionals/data-tables/data-table-gastos';

const DiasSemana: { [key: number]: string } = {
  0: 'Lunes',
  1: 'Martes',
  2: 'Miércoles',
  3: 'Jueves',
  4: 'Viernes',
  5: 'Sábado',
  6: 'Domingo',
};

export const columns: ColumnDef<Gasto>[] = [
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'area_venta.nombre',
    header: 'Área de venta',
    cell: ({ row }: { row: Row<Gasto> }) => {
      const area = row.original.area_venta?.nombre;
      const is_cafeteria = row.original.is_cafeteria;
      if (area) {
        return area;
      } else if (!area && is_cafeteria) {
        return 'Cafetería';
      } else {
        return <Badge variant="outline">Área de venta eliminada</Badge>;
      }
    },
  },

  {
    accessorKey: 'frecuencia',
    header: 'Frecuencia',
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue('frecuencia')}</Badge>
    ),
  },
  {
    header: 'Día',
    cell: ({ row }) =>
      row.original.dia_mes ||
      (row.original.dia_semana && DiasSemana[row.original.dia_semana]) || (
        <Badge variant="outline">Vacío</Badge>
      ),
  },
  {
    accessorKey: 'cantidad',
    header: 'Monto',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }: { row: Row<Gasto> }) => {
      const username = row.original.usuario?.username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },
  {
    header: ' ',
    cell: ({ row, table }) => {
      const areas = (table.options as CustomTableOptions<Gasto>).areas;

      return (
        <span className="space-x-2">
          <SheetGastos areas={areas} data={row.original} />
          <TableDeleteV2 id={row.original.id} action={deleteGasto} />
        </span>
      );
    },
  },
];
