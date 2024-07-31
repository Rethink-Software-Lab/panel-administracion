import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table-inventario-almacen';

import { inventarioAlmacen, getCategorias } from '@/lib/services';
import { CloudOff, PackageX } from 'lucide-react';

export default async function Inventario({ searchParams }) {
  const { data, errors } = await inventarioAlmacen();
  const { data: categorias } = await getCategorias();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
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

      {/* {productos?.length < 1 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <PackageX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Upsss.. No tienes productos
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando hayan productos aparecerán aquí.
            </p>
          </div>
        </div>
      )}
      {productos?.length > 0 && (
        <Card className=" max-w-full">
          <CardContent className="mt-6">
            <Table className="max-w-full overflow-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos?.map((producto) => (
                  <Suspense key={producto?.id} fallback={<SkeletonProducto />}>
                    <OneProducto id={producto?.id} />
                  </Suspense>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination totalPages={info?.totalPages} page={page} />
          </CardFooter>
        </Card>
      )} */}
      <DataTable columns={columns} data={data} categorias={categorias} />
    </main>
  );
}
