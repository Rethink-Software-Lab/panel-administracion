'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
// import { deleteEntrada } from './actions';
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

  // {
  //   header: ' ',
  //   cell: ({ row }: { row: Row<Data> }) => (
  //     <EspecialWarningDelete
  //       id={row.original.id}
  //       text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
  //       action={deleteEntrada}
  //     />
  //   ),
  // },
];
