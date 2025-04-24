'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { ColumnDef } from '@tanstack/react-table';
import { Proveedor } from './types';
import SheetProveedores from '@/components/functionals/sheets/SheetProveedores';
import { deleteProveedor } from './actions';

export const columns: ColumnDef<Proveedor>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'direccion',
    header: 'Dirección social',
  },
  {
    accessorKey: 'nit',
    header: 'NIT',
  },
  {
    accessorKey: 'noCuentaCup',
    header: 'No. Cuenta CUP',
  },
  {
    accessorKey: 'noCuentaMayorista',
    header: 'No. Cuenta Mayorista',
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
  },

  {
    header: ' ',
    cell: ({ row }) => (
      <span className="flex gap-2 justify-center">
        <SheetProveedores data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteProveedor} />
      </span>
    ),
  },
];
