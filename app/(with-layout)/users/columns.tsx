'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteUsuario } from '@/app/(with-layout)/users/actions';
import ModalUser from '@/components/functionals/ModalUser';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Row } from '@tanstack/react-table';

type UserRole = 'ADMIN' | 'ALMACENERO' | 'VENDEDOR';

const ROLES: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  ALMACENERO: 'Almacenero',
  VENDEDOR: 'Vendedor',
};

interface User {
  id: string;
  username: string;
  rol: UserRole;
  area_venta: { id: string; nombre: string; color: string } | null;
  almacen: string | null;
}

export const columns = [
  {
    accessorKey: 'username',
    header: 'Nombre',
  },

  {
    accessorKey: 'rol',
    header: 'Rol',
    cell: ({ row }: { row: Row<User> }) => (
      <Badge variant="outline">{ROLES[row.original.rol]}</Badge>
    ),
  },

  {
    id: 'area_venta',
    accessorKey: 'area_venta',
    header: 'Área de venta',
    filterFn: (row: Row<User>, _: any, rowValue: string) => {
      return row.original.area_venta?.nombre === rowValue;
    },
    cell: ({ row }: { row: Row<User> }) => {
      const area = row.original.area_venta?.nombre;

      if (area) {
        return area;
      } else {
        return <Badge variant="outline">Vacio</Badge>;
      }
    },
  },

  {
    accessorKey: 'almacen',
    header: 'Almacén',
    cell: ({ row }: { row: Row<User> }) => {
      const almacen = row.original.almacen;

      if (almacen) {
        return almacen;
      } else {
        return <Badge variant="outline">Vacio</Badge>;
      }
    },
  },

  {
    header: ' ',
    cell: ({
      row,
      table,
    }: {
      row: Row<User>;
      table: {
        options: {
          areas: { id: string; nombre: string; color: string }[];
        };
      };
    }) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <ModalUser
            data={row.original as any}
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
    },
  },
];
