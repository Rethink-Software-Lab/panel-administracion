import { Badge } from '@/components/ui/badge';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArchiveX, CloudOff, Edit2, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getEntradas } from '@/lib/services';
import { deleteEntrada } from '@/lib/actions';

import ModalUser from '@/components/functionals/ModalUser';
import Pagination from '@/components/functionals/Pagination';
import TableDelete from '@/components/functionals/TableDelete';

import { DateTime } from 'luxon';
import Link from 'next/link';

export default async function Entradas({ searchParams }) {
  const page = searchParams['p'] ?? 1;
  const perPage = searchParams['perPage'] ?? 10;
  const { data, errors } = await getEntradas({ page: Number(page) });
  const entradas = data?.entradas;
  const info = data?.info;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Entradas</h1>

        <Link href="/create-entrada" passHref>
          <Button className="gap-1 items-center">
            <PlusCircle size={18} />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>
        </Link>
      </div>
      {errors &&
        errors?.map(
          (e) =>
            e.message.startsWith('fetch failed') && (
              <div
                key={e.message}
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <CloudOff size={72} className="inline-flex mb-4" />
                  <h3 className="text-2xl font-bold tracking-tight">
                    Error de conexión
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No se pudo conectar con el servidor
                  </p>
                </div>
              </div>
            )
        )}

      {entradas?.length < 1 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <ArchiveX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              No tienes entradas
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando hayan entradas aparecerán aquí.
            </p>
          </div>
        </div>
      )}
      {entradas?.length > 0 && (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Método de pago</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entradas?.map((entrada) => (
                  <TableRow key={entrada?.id}>
                    <TableCell className="font-medium">
                      {DateTime.fromISO(entrada?.createdAt).toFormat(
                        'dd/LL/yyyy  h:mma'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entrada?.metodoPago}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {entrada?.proveedor}
                    </TableCell>
                    <TableCell className="font-medium">
                      {entrada?.comprador}
                    </TableCell>
                    <TableCell className="font-medium">
                      {entrada?.usuario?.username}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {/* <ModalUser
                      data={entrada}
                      trigger={
                        <Button variant="outline" size="icon">
                          <Edit2 size={18} />
                        </Button>
                      }
                    /> */}
                      <TableDelete id={entrada?.id} action={deleteEntrada} />
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
