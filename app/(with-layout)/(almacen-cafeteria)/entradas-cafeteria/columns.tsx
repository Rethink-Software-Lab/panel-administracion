'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteEntradaCafeteria } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';
import { EntradaCafeteria } from './types';
import SheetInfoEntradasCafeteria from '@/components/functionals/sheets/SheetInfoEntradasCafeteria';

export const columns: ColumnDef<EntradaCafeteria>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
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
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>
    ),
  },

  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }) => {
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
    cell: ({ row }) => (
      <span className="space-x-2">
        <SheetInfoEntradasCafeteria data={row.original} />
        <EspecialWarningDelete
          id={row.original.id}
          text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
          action={deleteEntradaCafeteria}
        />
      </span>
    ),
  },
];
