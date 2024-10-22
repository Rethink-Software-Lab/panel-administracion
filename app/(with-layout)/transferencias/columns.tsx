'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteTransferencia } from './actions';
import { DateTime } from 'luxon';
import { Row } from '@tanstack/react-table';
import { AreaVenta } from '../areas-de-venta/types';

interface Data {
  id: number;
  created_at: string;
  de: AreaVenta;
  para: AreaVenta;
  usuario: { id: number; username: string }; // TODO UsuarioType
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
    accessorKey: 'de.nombre',
    header: 'Área de origen',
  },
  {
    accessorKey: 'para.nombre',
    header: 'Área de destino',
  },
  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
  },

  {
    header: ' ',
    cell: ({ row }: { row: Row<Data> }) => (
      <TableDeleteV2 id={row.original.id} action={deleteTransferencia} />
    ),
  },
];
