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
    cell: ({ row }: { row: Row<Data> }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'producto__info__descripcion',
    header: 'Producto',
    size: 300,
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
    cell: ({ row }: { row: Row<Data> }) => {
      const username = row.original.usuario__username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
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
