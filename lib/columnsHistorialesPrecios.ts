'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DateTime } from 'luxon';

interface HistorialPrecios {
  precio: string;
  fecha_inicio: string;
  usuario: string;
}

export const columns: ColumnDef<HistorialPrecios>[] = [
  {
    accessorKey: 'precio',
    header: 'Precio',
    cell: ({ row }) =>
      row.original.precio
        ? Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'CUP',
          }).format(Number(row.original.precio))
        : 'Error al obtener el precio',
  },
  {
    accessorKey: 'fecha_inicio',
    header: 'Fecha de inicio',
    cell: ({ row }) =>
      DateTime.fromSQL(row.getValue('fecha_inicio')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'usuario',
    header: 'Usuario',
  },
];
