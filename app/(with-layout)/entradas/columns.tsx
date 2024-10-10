'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteEntrada } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';

interface Data {
  id: number;
  created_at: string;
  producto__info__descripcion: string;
  cantidad: number;
  comprador: string;
  proveedor: string;
  metodo_pago: string;
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
    accessorKey: 'comprador',
    header: 'Comprador',
  },
  {
    accessorKey: 'proveedor',
    header: 'Proveedor',
  },
  {
    accessorKey: 'metodo_pago',
    header: 'Método de pago',
    cell: ({ row }: { row: Row<Data> }) => (
      <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>
    ),
  },

  {
    accessorKey: 'usuario__username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<Data> }) => (
      <EspecialWarningDelete
        id={row.original.id}
        text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
        action={deleteEntrada}
      />
    ),
  },
];
