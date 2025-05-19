import { FileX, FolderXIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Categoria } from '@/app/(with-layout)/categorias/types';

interface Imagen {
  public_id: string;
  url: string;
}

interface Producto {
  imagen: Imagen | null;
  categoria: Categoria;
  id: number;
  codigo: string;
  descripcion: string;
  pago_trabajador: number;
  precio_costo: number;
  precio_venta: number;
}

interface Props {
  producto: Producto;
  cantidad: number;
}

export default async function CardMasVendidos({ data }: { data: Props[] }) {
  return (
    <>
      <Card className="col-span-3 md:col-span-1">
        <CardHeader>
          <CardTitle>Productos más vendidos</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          {data?.length < 1 ? (
            <div className="flex justify-center items-center h-3/4 py-4">
              <div className="flex flex-col items-center text-muted-foreground">
                <FolderXIcon size={50} />
                <h3 className="font-medium">
                  Cuando existan datos aparecerán aquí.
                </h3>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {data?.map((prod: Props) => (
                <li
                  key={prod.producto?.codigo}
                  className="flex items-center justify-between hover:bg-muted transition-all px-3 py-2  rounded-lg "
                >
                  <div className="flex items-center gap-2">
                    {prod.producto?.imagen?.url ? (
                      <Image
                        className="rounded-lg object-cover aspect-square"
                        src={prod.producto.imagen.url}
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
                      <p className="font-medium text-sm">
                        {prod.producto?.codigo}
                      </p>
                      <p className="text-sm">{prod.producto?.descripcion}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-right">{prod.cantidad}</p>
                    <p className="text-[.8rem] font-light">unidades</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
