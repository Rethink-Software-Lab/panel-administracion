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
    cell: ({ row }: { row: Row<Data> }) => {
      const date = DateTime.fromISO(row.getValue('created_at'));
      const now = DateTime.now();
      const diff = now.diff(date, 'days').days;

      if (diff < 1) {
        return <span>hoy</span>;
      } else if (diff < 2) {
        return <span>ayer</span>;
      } else {
        return (
          <span>
            {date.toRelative({
              unit: 'days',
              locale: 'es',
            })}
          </span>
        );
      }
    },
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
    cell: ({ row }: { row: Row<Data> }) =>
      row.getValue('area_venta__nombre') || 'Almacén Revoltosa',
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
