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
import { getAreasVentas } from '@/lib/services';
import { deleteAreaVenta } from '@/lib/actions';
import ModalAreasVenta from '@/components/functionals/ModalAreasVenta';

import Pagination from '@/components/functionals/Pagination';
import TableDelete from '@/components/functionals/TableDelete';

export default async function AreasVenta({ searchParams }) {
  const page = searchParams['p'] ?? 1;
  const perPage = searchParams['perPage'] ?? 10;
  const { data, errors } = await getAreasVentas({ page: Number(page) });
  const puntos = data?.areasVenta;
  const info = data?.info;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Áreas de Venta</h1>

        <ModalAreasVenta
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
        />
      </div>
      {puntos.length < 1 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <SearchX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Upsss.. Nada por aquí
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando agregues puntos de venta aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {puntos?.map((punto) => (
                  <TableRow key={punto?.id}>
                    <TableCell className="font-medium">
                      {punto?.nombre}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div
                        className="w-8 h-8 rounded-lg"
                        style={{ background: punto?.color }}
                      ></div>
                    </TableCell>

                    <TableCell className="flex items-center gap-2">
                      <ModalAreasVenta
                        data={punto}
                        trigger={
                          <Button variant="outline" size="icon">
                            <Edit2 size={18} />
                          </Button>
                        }
                      />
                      <TableDelete id={punto?.id} action={deleteAreaVenta} />
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
