'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { ColumnDef } from '@tanstack/react-table';
// import { Badge } from '@/components/ui/badge';
import { Referido } from './types';
import { toast } from 'sonner';
import SheetReferidos from '@/components/functionals/sheets/SheetReferidos';
import { deleteReferido } from './actions';
// import SheetInfoMerma from '@/components/functionals/sheets/SheetInfoMerma';

export const columns: ColumnDef<Referido>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
  },
  {
    accessorKey: '',
    header: 'Enlace',
    cell: ({ row }) => (
      <code
        className="text-xs cursor-copy"
        onClick={async () => {
          await navigator.clipboard.writeText(
            `https://salon-madame.vercel.app?ref=${row.original.codigoReferido}`
          );
          await toast.success('Copiado al portapapeles');
        }}
      >
        https://salon-madame.vercel.app?ref={row.original.codigoReferido}
      </code>
    ),
  },

  {
    header: ' ',
    cell: ({ row }) => (
      <span className="flex gap-2 justify-center">
        <SheetReferidos referido={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteReferido} />
      </span>
    ),
  },
];
