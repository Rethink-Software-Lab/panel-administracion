import { TableCell, TableRow } from '@/components/ui/table';
import TableDelete from '@/components/functionals/TableDelete';
import { deleteProductInfo } from '@/lib/actions';
import ModalProduct from '@/components/functionals/ModalProduct';
import Image from 'next/image';
import { Edit2, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { oneProduct } from '@/lib/services';

export default async function OneProductInfo({ id, categorias }) {
  const { data: producto, errors } = await oneProduct({ id });
  return (
    <TableRow className=" whitespace-nowrap">
      <TableCell className="font-medium">
        {producto?.imagen?.url ? (
          <Image
            className="object-cover aspect-square rounded-lg"
            src={producto.imagen.url}
            alt="Imagen del producto"
            width={80}
            height={80}
            priority
          />
        ) : (
          <div className="rounded-lg object-cover aspect-square w-20 h-20 border text-muted-foreground bg-muted flex justify-center items-center">
            <FileX size={20} />
          </div>
        )}
      </TableCell>
      <TableCell>{producto?.codigo}</TableCell>
      <TableCell>{producto?.descripcion}</TableCell>
      <TableCell>{producto?.categoria?.nombre}</TableCell>
      <TableCell>{producto?.precioCosto}</TableCell>
      <TableCell>{producto?.precioVenta}</TableCell>
      <TableCell>
        <div className="flex justify-center items-center gap-2">
          <ModalProduct
            data={producto}
            categorias={categorias}
            trigger={
              <Button variant="outline" size="icon">
                <Edit2 size={18} />
              </Button>
            }
          />
          <TableDelete id={producto?.id} action={deleteProductInfo} />
        </div>
      </TableCell>
    </TableRow>
  );
}
