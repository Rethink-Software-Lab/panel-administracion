'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteCategoria } from '@/app/(with-layout)/categorias/actions';
import ModalCategoria from '@/components/functionals/ModalCategoria';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';

export const columns = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },

  {
    header: 'Acciones',
    size: 5,
    cell: ({ row }) => {
      if (row.original.nombre !== 'Zapatos') {
        return (
          <div className="flex items-center gap-2">
            <ModalCategoria
              data={row.original}
              trigger={
                <Button variant="outline" size="icon">
                  <span className="sr-only">Editar</span>
                  <Edit2 size={18} />
                </Button>
              }
            />
            <TableDeleteV2 id={row.original.id} action={deleteCategoria} />
          </div>
        );
      }
    },
  },
];
