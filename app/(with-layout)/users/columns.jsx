'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteUsuario } from '@/app/(with-layout)/users/actions';
import ModalUser from '@/components/functionals/ModalUser';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ROLES = {
  ADMIN: 'Administrador',
  ALMACENERO: 'Almacenero',
  VENDEDOR: 'Vendedor',
};

export const columns = [
  {
    accessorKey: 'username',
    header: 'Nombre',
  },

  {
    accessorKey: 'rol',
    header: 'Rol',
    cell: ({ row }) => (
      <Badge variant="outline">
        {ROLES[row.getValue('rol')] || row.getValue('rol')}
      </Badge>
    ),
  },

  {
    id: 'area_venta',
    accessorKey: 'area_venta',
    header: 'Área de venta',
    filterFn: (row, _, rowValue) => {
      return row.getValue('area_venta')?.nombre === rowValue;
    },
    cell: ({ row }) => {
      const area = row.getValue('area_venta')?.nombre;

      if (area) {
        return area;
      } else {
        return <Badge variant="outline">Vacio</Badge>;
      }
    },
  },

  {
    header: ' ',
    cell: ({ row, table }) => {
      if (row.original.nombre !== 'Zapatos') {
        return (
          <div className="flex items-center justify-end gap-2">
            <ModalUser
              data={row.original}
              areas={table.options.areas}
              trigger={
                <Button variant="outline" size="icon">
                  <span className="sr-only">Editar</span>
                  <Edit2 size={18} />
                </Button>
              }
            />
            <TableDeleteV2 id={row.original.id} action={deleteUsuario} />
          </div>
        );
      }
    },
  },
];
