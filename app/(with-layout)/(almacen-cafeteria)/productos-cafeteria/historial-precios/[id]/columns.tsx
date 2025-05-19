'use client';

import { ColumnDef } from '@tanstack/react-table';
import { HistorialPrecios } from './types';

import { DateTime } from 'luxon';

export const columns: ColumnDef<HistorialPrecios>[] = [
  {
    accessorKey: 'precio',
    header: 'Precio',
    cell: ({ row }) =>
      row.original.precio
        ? Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'CUP',
          }).format(Number(row.original.precio))
        : 'Error al obtener el precio',
  },
  {
    accessorKey: 'fecha_inicio',
    header: 'Fecha de inicio',
    cell: ({ row }) =>
      DateTime.fromSQL(row.getValue('fecha_inicio')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'usuario',
    header: 'Usuario',
  },
  //   {
  //     accessorKey: 'pago_trabajador',
  //     header: 'Pago trabajador',
  //   },
  //   {
  //     header: ' ',
  //     cell: ({ row, table }) => {
  //       const categorias = (table.options as CustomTableOptions<ProductInfo>)
  //         .categorias;

  //       return (
  //         <div className="flex items-center justify-end gap-2">
  //           <Link href={`/products/historial-precios/${row.original.id}`}>
  //             <Button variant="outline" size="icon">
  //               <History size={18} />
  //             </Button>
  //           </Link>
  //           <Wrap data={row.original} categorias={categorias} isEdit />
  //           <EspecialWarningDelete
  //             id={row.original.id}
  //             text="Al eliminar un producto se eliminarán las entradas, salidas, ventas y productos asociados."
  //             action={deleteProducto}
  //           />
  //         </div>
  //       );
  //     },
  //   },
];
