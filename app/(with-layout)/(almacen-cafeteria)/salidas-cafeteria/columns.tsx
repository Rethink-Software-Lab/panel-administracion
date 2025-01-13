'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteSalidaCafeteria } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';
import { SalidasCafeteria } from './types';
import SheetInfoSalidasCafeteria from '@/components/functionals/sheets/SheetInfoSalidasCafeteria';

export const columns: ColumnDef<SalidasCafeteria>[] = [
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
        <SheetInfoSalidasCafeteria data={row.original} />
        <EspecialWarningDelete
          id={row.original.id}
          text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
          action={deleteSalidaCafeteria}
        />
      </span>
    ),
  },
];
