import { CloudOff, FileXIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { searchProduct } from '@/lib/services';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSession } from '@/lib/getSession';
import { Fragment } from 'react';

interface SearchParams {
  id: string;
}

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { isStaff } = getSession();
  const { data, error } = await searchProduct(searchParams.id);
  const info = data?.info;
  const inventario = data?.inventario;
  const isZapato = data?.zapato;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {!data ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <CloudOff size={72} className="inline-flex mb-4" />

            <h3 className="text-2xl font-bold tracking-tight">
              Error al conectar
            </h3>
            <p className="text-sm text-muted-foreground">
              No se ha podido conectar con el servidor, por favor contactar con
              soporte.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {info && (
            <>
              {info?.imagen?.url ? (
                <Image
                  priority
                  className="col-span-3 md:col-span-1 rounded-lg object-cover aspect-square"
                  src={info?.imagen?.url}
                  width={800}
                  height={800}
                  alt={info?.descripcion}
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
                    {info?.descripcion}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <ul className="grid gap-3">
                      {isStaff && (
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Precio de Costo
                          </span>
                          <span>
                            {Intl.NumberFormat('es-CU', {
                              style: 'currency',
                              currency: 'CUP',
                            }).format(info?.precio_costo)}
                          </span>
                        </li>
                      )}
                      <Separator className="my-2" />
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Precio de Venta
                        </span>
                        <span>
                          {Intl.NumberFormat('es-CU', {
                            style: 'currency',
                            currency: 'CUP',
                          }).format(info?.precio_venta)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="col-span-4 overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <CardTitle className="text-lg">Disponibles</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6 text-sm">
              {isZapato ? (
                inventario?.map((res: any) => (
                  <Fragment key={res.area}>
                    <h2 className="font-bold pb-2">{res.area}</h2>

                    <Table className="mb-6">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">Id</TableHead>
                          {!info && (
                            <TableHead className="font-bold">Código</TableHead>
                          )}
                          <TableHead className="font-bold">Número</TableHead>
                          <TableHead className="font-bold">Color</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {res.productos.map((p: any) => (
                          <TableRow key={p.id}>
                            <TableCell>{p?.id}</TableCell>
                            {!info && <TableCell>{p?.info__codigo}</TableCell>}
                            <TableCell>{p?.numero}</TableCell>
                            <TableCell>{p?.color}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell
                            colSpan={info ? 2 : 3}
                            className="font-bold"
                          >
                            Total
                          </TableCell>
                          <TableCell>{res?.productos.length}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Fragment>
                ))
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Área</TableHead>
                      <TableHead className="font-bold">Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventario?.map((res: any) => (
                      <TableRow key={res.area}>
                        <TableCell>{res?.area}</TableCell>
                        <TableCell>{res?.cantidad}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
