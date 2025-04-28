'use client';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { deleteEntradaCafeteria } from './actions';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';
import { EntradaCafeteria } from './types';
import SheetInfoEntradasCafeteria from '@/components/functionals/sheets/SheetInfoEntradasCafeteria';
import { Button } from '@/components/ui/button';
import { ReceiptText } from 'lucide-react';
import { ExtendedTableOptions } from '@/components/functionals/data-tables/data-table-general';

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
    cell: ({ row }) => {
      const proveedor = row.original.proveedor?.nombre;
      const proveedorNombre = row.original.proveedor_nombre;
      if (proveedor) {
        return proveedor;
      } else if (proveedorNombre) {
        return proveedorNombre;
      } else {
        return <Badge variant="outline">Proveedor eliminado</Badge>;
      }
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
    cell: ({ row, table }) => (
      <span className="space-x-2">
        <SheetInfoEntradasCafeteria data={row.original} />
        <Button
          onClick={() => {
            (
              table.options as ExtendedTableOptions<EntradaCafeteria>
            ).setDataToPrint?.(row.original);
            setTimeout(() => {
              window.print();
            }, 500);
          }}
          variant="outline"
          size="icon"
        >
          <ReceiptText className="w-4 h-4" />
          <span className="sr-only">Ver factura</span>
        </Button>
        <EspecialWarningDelete
          id={row.original.id}
          text="Al eliminar la entrada se eliminarán todas las salidas, productos y ventas asociadas a ella."
          action={deleteEntradaCafeteria}
        />
      </span>
    ),
  },
];
