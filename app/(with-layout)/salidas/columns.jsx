'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteSalida } from './actions';
import { DateTime } from 'luxon';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) => {
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
              unit: 'day',
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
    header: 'Área de venta',
  },

  {
    accessorKey: 'usuario__username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }) => (
      <TableDeleteV2 id={row.original.id} action={deleteSalida} />
    ),
  },
];
