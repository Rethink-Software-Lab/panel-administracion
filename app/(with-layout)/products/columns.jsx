'use client';

import { Badge } from '@/components/ui/badge';
import { Edit2, FileX } from 'lucide-react';
import Image from 'next/image';
import EspecialWarningDelete from '@/components/functionals/EspecialWarningDelete';
import { Button } from '@/components/ui/button';

import { deleteProducto } from './actions';

import Wrap from '@/components/functionals/ModalProduct';

export const columns = [
  {
    accessorKey: 'imagen',
    header: 'Imagen',
    cell: ({ row }) => {
      const url = row.getValue('imagen')?.url;

      if (!url) {
        return (
          <div className="rounded-lg object-cover aspect-square w-20 h-20 border text-muted-foreground bg-muted flex justify-center items-center">
            <FileX size={20} />
          </div>
        );
      }

      return (
        <Image
          className="object-cover aspect-square rounded-lg"
          src={url}
          alt="Imagen del producto"
          width={80}
          height={80}
          priority
        />
      );
    },
  },
  {
    id: 'codigo',
    accessorKey: 'codigo',
    header: 'Código',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    id: 'categoria',
    accessorKey: 'categoria.nombre',
    header: 'Categoría',
    cell: ({ row }) => (
      <Badge variant="outline">{row?.original?.categoria?.nombre}</Badge>
    ),
  },
  {
    accessorKey: 'precio_costo',
    header: 'Precio de costo',
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio de venta',
  },
  {
    accessorKey: 'pago_trabajador',
    header: 'Pago trabajador',
  },
  {
    header: ' ',
    cell: ({ row, table }) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Wrap
            data={row.original}
            categorias={table.options.categorias}
            isEdit
          />
          <EspecialWarningDelete
            id={row.original.id}
            text="Al eliminar un producto se eliminarán las entradas, salidas, ventas y productos asociados."
            action={deleteProducto}
          />
        </div>
      );
    },
  },
];
