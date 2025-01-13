'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteEntradaCafeteria } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';
import { EntradaCafeteria } from './types';
import SheetInfoEntradasCafeteria from '@/components/functionals/sheets/SheetInfoEntradasCafeteria';

export const columns = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }: { row: Row<EntradaCafeteria> }) =>
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
    cell: ({ row }: { row: Row<EntradaCafeteria> }) => (
      <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>
    ),
  },

  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }: { row: Row<EntradaCafeteria> }) => {
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
    cell: ({ row }: { row: Row<EntradaCafeteria> }) => (
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
