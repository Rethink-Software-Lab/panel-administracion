'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteSalida } from './actions';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';

interface Data {
  id: number;
  created_at: string;
  producto__info__descripcion: string;
  cantidad: number;
  area_venta__nombre: string;
  usuario__username: string;
}

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<Data> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'producto__info__descripcion',
    header: 'Producto',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'area_venta__nombre',
    header: 'Destino',
  },

  {
    accessorKey: 'usuario__username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<Data> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteSalida} />
    ),
  },
];
