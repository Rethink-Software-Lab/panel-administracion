import { DateTime } from 'luxon';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Edit2, PlusCircle, SearchX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ModalSalidas from '@/components/functionals/ModalSalida';

import { getSalidas, getAreasVentas, getProductos } from '@/lib/services';
import { deleteSalida } from '@/lib/actions';

import Pagination from '@/components/functionals/Pagination';
import TableDelete from '@/components/functionals/TableDelete';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export default async function Salidas({ searchParams }) {
  const page = searchParams['p'] ?? 1;
  const perPage = searchParams['perPage'] ?? 10;
  const { data: dataSalidas } = await getSalidas({ page: Number(page) });
  const salidas = dataSalidas?.salidas;
  const info = dataSalidas?.info;
  const { data: productosInfo } = await getProductos();
  const {
    data: { areasVenta },
  } = await getAreasVentas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Salidas</h1>

        <ModalSalidas
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          areasVenta={areasVenta}
          productosInfo={productosInfo}
        />
      </div>
      {salidas.length < 1 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <SearchX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Upsss.. Nada por aquí
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando agregues salidas aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Productos</TableHead>
                  <TableHead>Área de venta</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Fecha creación</TableHead>
                  <TableHead>Fecha edición</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salidas?.map((salida) => (
                  <TableRow key={salida?.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        {salida?.productos?.slice(0, 4)?.map((producto) => (
                          <Badge variant="outline" key={producto?.id}>
                            {producto?.id}
                          </Badge>
                        ))}
                        {salida?.productos?.length > 4 && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Badge
                                variant="outline"
                                className=" cursor-pointer"
                              >
                                + {salida?.productos?.length - 4}
                              </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-20">
                              <p className="text-sm font-medium">Otros</p>
                              {salida?.productos
                                ?.slice(4, (-1)[0])
                                ?.map((producto) => (
                                  <>
                                    <Separator className="my-2" />
                                    <p className="text-sm " key={producto?.id}>
                                      {producto?.id}
                                    </p>
                                  </>
                                ))}
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {salida?.areaVenta?.nombre}
                    </TableCell>
                    <TableCell className="font-medium">
                      {salida?.usuario?.username}
                    </TableCell>
                    <TableCell className="font-medium">
                      {DateTime.fromISO(salida?.createdAt).toFormat(
                        'dd/LL/yyyy  h:mma'
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {DateTime.fromISO(salida?.updatedAt).toFormat(
                        'dd/LL/yyyy  h:mma'
                      )}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {/* <ModalSalidas
                        data={salida}
                        trigger={
                          <Button variant="outline" size="icon">
                            <Edit2 size={18} />
                          </Button>
                        }
                        areasVenta={areasVenta}
                        productosInfo={productosInfo}
                      /> */}
                      <TableDelete id={salida?.id} action={deleteSalida} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination totalPages={info?.totalPages} page={page} />
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
