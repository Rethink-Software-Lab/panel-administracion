'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { ColumnDef } from '@tanstack/react-table';
import { Referido } from './types';
import { toast } from 'sonner';
import SheetReferidos from '@/components/functionals/sheets/SheetReferidos';
import { deleteReferido } from './actions';

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
    size: 400,
    cell: ({ row }) => (
      <code
        className="text-xs cursor-copy"
        onClick={async () => {
          await navigator.clipboard.writeText(
            `https://salon-madame.netlify.app?ref=${row.original.codigoReferido}`
          );
          await toast.success('Copiado al portapapeles');
        }}
      >
        https://salon-madame.netlify.app?ref={row.original.codigoReferido}
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
