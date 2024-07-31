import { Suspense } from 'react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CloudOff, UserRoundPlus, UserX2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getUsers, getAreasVentas } from '@/lib/services';

import ModalUser from '@/components/functionals/ModalUser';
import Pagination from '@/components/functionals/Pagination';
import OneUser from '@/components/functionals/OneUser';
import SkeletonUser from '@/components/skeletons/SkeletonUser';

export default async function Initial({ searchParams }) {
  const page = searchParams['p'] ?? 1;
  const { data, errors } = await getUsers({ page: Number(page) });
  const {
    data: { areasVenta: areas },
  } = await getAreasVentas();
  const users = data?.users;
  const info = data?.info;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
        <ModalUser
          trigger={
            <Button className="gap-1 items-center">
              <UserRoundPlus size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          areas={areas}
        />
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

      {users?.length < 1 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <UserX2 size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              No tienes usuarios registrados.
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando hayan usuarios aparecerán aquí.
            </p>
          </div>
        </div>
      )}
      {users?.length > 0 && (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <Suspense key={user?.id} fallback={<SkeletonUser />}>
                    <OneUser id={user?.id} areas={areas} />
                  </Suspense>
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
