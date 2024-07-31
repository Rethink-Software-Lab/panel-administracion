import { CloudOff, FileXIcon, PackageX, SearchX } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { searchProduct } from '@/lib/services';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSession } from '@/lib/getSession';

export default async function Search({ params }) {
  const { isStaff } = getSession();
  const { data, errors } = await searchProduct({ codigo: params.codigo });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {!data ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            {errors?.[0]?.message?.startsWith(
              'No ProductoInfo matches the given query.'
            ) ? (
              <SearchX size={72} className="inline-flex mb-4" />
            ) : (
              <CloudOff size={72} className="inline-flex mb-4" />
            )}
            <h3 className="text-2xl font-bold tracking-tight">
              {errors?.[0]?.message?.startsWith(
                'No ProductoInfo matches the given query.'
              )
                ? 'Producto no encontrado'
                : 'Error al conectar'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {errors?.[0]?.message?.startsWith(
                'No ProductoInfo matches the given query.'
              )
                ? 'Asegúrate que existe un producto con ese código.'
                : 'No se ha podido conectar con el servidor, por favor contactar con soporte.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data?.imagen?.url ? (
            <Image
              priority
              className="col-span-3 md:col-span-1 rounded-lg object-cover aspect-square"
              src={data?.imagen?.url}
              width={800}
              height={800}
              alt={data?.descripcion}
            />
          ) : (
            <div className="col-span-3 md:col-span-1 bg-muted rounded-lg min-h-80 flex justify-center items-center text-muted-foreground">
              <div className="flex flex-col justify-center items-center">
                <FileXIcon size={40} />
                <p className=" font-medium">Sin foto</p>
              </div>
            </div>
          )}
          <Card className="col-span-3 md:col-span-2 overflow-hidden">
            <CardHeader className="flex flex-row gap-2 items-start bg-muted/50">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {params.codigo}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Descripción</span>
                    <span>{data?.descripcion}</span>
                  </li>
                  {isStaff && (
                    <>
                      <Separator className="my-2" />
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Precio de Costo
                        </span>
                        <span>${data?.precioCosto}</span>
                      </li>
                    </>
                  )}
                  <Separator className="my-2" />
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Precio de Venta
                    </span>
                    <span>${data?.precioVenta}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4 overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <CardTitle className="text-lg">Disponibles</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6 text-sm">
              {data?.productoSet?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {data?.categoria?.nombre === 'Zapatos' ? (
                        <>
                          <TableHead>Color</TableHead>
                          <TableHead>Número</TableHead>
                        </>
                      ) : (
                        <TableHead>ID</TableHead>
                      )}

                      <TableHead>Localización</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.productoSet?.map((res) => {
                      {
                        if (!res.venta) {
                          return (
                            <TableRow key={res.id}>
                              {res?.color ? (
                                <>
                                  <TableCell>{res?.color}</TableCell>
                                  <TableCell>{res?.numero}</TableCell>
                                </>
                              ) : (
                                <TableCell>{res?.id}</TableCell>
                              )}

                              <TableCell>
                                {res?.areaVenta?.nombre
                                  ? res?.areaVenta?.nombre
                                  : 'Almacén'}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className=" min-h-80 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <PackageX size={72} className="inline-flex mb-4" />
                    <h3 className="text-2xl font-bold tracking-tight">
                      Upsss.. No tienes productos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cuando agregues productos aparecerán aquí.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
