import { FileX } from 'lucide-react';
import Image from 'next/image';
import { oneProduct } from '@/lib/services';

export default async function OneVendidos({ id, cantidad = '' }) {
  if (!id) return null;
  const { data: producto } = await oneProduct({ id });
  return (
    <li
      key={producto?.codigo}
      className="flex items-center justify-between hover:bg-muted transition-all px-3 py-2  rounded-lg "
    >
      <div className="flex items-center gap-2">
        {producto?.imagen?.url ? (
          <Image
            className="rounded-lg object-cover aspect-square"
            src={producto.imagen.url}
            width={40}
            height={40}
            alt="venta"
          />
        ) : (
          <div className="rounded-lg object-cover aspect-square w-10 h-10 border text-muted-foreground bg-muted flex justify-center items-center">
            <FileX size={20} />
          </div>
        )}
        <div>
          <p className="font-medium text-sm">{producto?.codigo}</p>
          <p className="text-sm">{producto?.descripcion}</p>
        </div>
      </div>
      <div>
        <p className="font-medium text-right">{cantidad}</p>
        <p className="text-[.8rem] font-light">unidades</p>
      </div>
    </li>
  );
}
