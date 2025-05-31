'use client';

import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteElaboracion } from './actions';
import { ColumnDef } from '@tanstack/react-table';
import { Elaboraciones } from './types';
import SheetElaboraciones from '@/components/functionals/sheets/SheetElaboraciones';
import { CustomTableOptions } from '@/components/functionals/data-tables/data-table-elaboraciones';
import SheetInfoElaboraciones from '@/components/functionals/sheets/SheetInfoElaboraciones';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

export const columns: ColumnDef<Elaboraciones>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'precio',
    header: 'Precio',
    cell: ({ row }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('precio')),
  },
  {
    accessorKey: 'mano_obra',
    header: 'Mano de obra',
    cell: ({ row }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('mano_obra')),
  },

  {
    header: ' ',
    cell: ({ row, table }) => {
      const productos = (table.options as CustomTableOptions<Elaboraciones>)
        .productos;

      return (
        <span className="space-x-2">
          <SheetInfoElaboraciones data={row.original} />
          <Link href={`/elaboraciones/historial-precio/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <History size={18} />
            </Button>
          </Link>
          <SheetElaboraciones data={row.original} productos={productos} />
          <TableDeleteV2 id={row.original.id} action={deleteElaboracion} />
        </span>
      );
    },
  },
];
