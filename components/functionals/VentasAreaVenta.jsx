import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Edit2, PackagePlus, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Pagination from "@/components/functionals/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableDelete from "@/components/functionals/TableDelete";
import { deleteVenta } from "@/lib/actions";
import ModalVentas from "@/components/functionals/ModalVentas";
import { DateTime } from "luxon";
import { Badge } from "@/components/ui/badge";

import {
  getOneVentas,
  productosByAreaVenta,
  getProducts,
} from "@/lib/services";

export default async function VentasAreaVenta({ id, page }) {
  const { data, errors } = await getOneVentas({
    id,
    page: Number(page),
  });
  const ventas = data?.ventas;
  const info = data?.info;
  const {
    data: { productosInfo },
    errors: e,
  } = await getProducts();
  return (
    <main className="flex flex-1 flex-col gap-4 pb-4 lg:gap-6 lg:pb-6 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Ventas</h1>
        <ModalVentas
          idPunto={Number(id)}
          productosInfo={productosInfo}
          trigger={
            <Button className="gap-1 items-center">
              <PackagePlus size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
        />
      </div>

      {ventas?.length < 1 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
      ) : (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Productos</TableHead>
                  <TableHead>Método de pago</TableHead>
                  <TableHead>Creada por</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventas?.map((venta) => (
                  <TableRow key={venta?.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        {venta?.productoSet?.slice(0, 4)?.map((producto) => (
                          <Badge variant="outline" key={producto?.id}>
                            {producto?.id}
                          </Badge>
                        ))}
                        {venta?.productos?.length > 4 && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Badge
                                variant="outline"
                                className=" cursor-pointer"
                              >
                                + {venta?.productos?.length - 4}
                              </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-20">
                              <p className="text-sm font-medium">Otros</p>
                              {venta?.productos
                                ?.slice(4, (-1)[0])
                                ?.map((producto) => (
                                  <>
                                    <Separator className="my-2" />
                                    <p className="text-sm " key={venta?.id}>
                                      {venta?.id}
                                    </p>
                                  </>
                                ))}
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Badge variant="outline">{venta?.metodoPago}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {venta?.usuario?.username}
                    </TableCell>
                    <TableCell className="font-medium">
                      {DateTime.fromISO(venta?.createdAt).toFormat(
                        "dd/LL/yyyy  h:mma"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        <ModalVentas
                          data={venta}
                          idPunto={Number(id)}
                          productosInfo={productosInfo}
                          trigger={
                            <Button variant="outline" size="icon">
                              <Edit2 size={18} />
                            </Button>
                          }
                        />
                        <TableDelete
                          id={venta?.id}
                          areaVenta={id}
                          action={deleteVenta}
                        />
                      </div>
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
