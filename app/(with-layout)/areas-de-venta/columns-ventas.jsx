'use client';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

// TODO: Agregar Tooltip

export const columns = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },

  {
    accessorKey: 'importe',
    header: 'Importe',
    cell: ({ row }) => {
      return <span>${row.getValue('importe')}</span>;
    },
  },
  {
    header: ' ',
    cell: ({ row, table }) => (
      <Link
        href={`/areas-de-venta/${table.options.id}/${row.getValue('fecha')}`}
        className="flex justify-center"
      >
        <Button variant="outline" size="icon">
          <Eye size={18} />
        </Button>
      </Link>
    ),
  },
];
