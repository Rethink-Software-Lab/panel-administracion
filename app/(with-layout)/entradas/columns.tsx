'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteEntrada } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';
import { Entrada } from './types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReceiptText } from 'lucide-react';

export const columns: ColumnDef<Entrada>[] = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: ({ row }) =>
      DateTime.fromISO(row.getValue('fecha')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'descripcion_producto',
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
    accessorKey: 'nombre_proveedor',
    header: 'Proveedor',
    cell: ({ row }) => {
      const proveedor = row.getValue('nombre_proveedor');
      return proveedor ? proveedor : <Badge variant="outline">Vacío</Badge>;
    },
  },
  {
    accessorKey: 'metodo_pago',
    header: 'Método de pago',
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue('metodo_pago')}</Badge>
    ),
  },

  {
    accessorKey: 'username',
    header: 'Usuario',
    cell: ({ row }) => {
      const username = row.original.username;
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
      <div className="flex justify-center gap-2">
        <Link href={`/factura/${row.original.id}`}>
          <Button variant="outline" size="icon">
            <ReceiptText className="w-4 h-4" />
            <span className="sr-only">Ver factura</span>
          </Button>
        </Link>
        <EspecialWarningDelete
          id={row.original.id}
          text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
          action={deleteEntrada}
        />
      </div>
    ),
  },
];
