import { PackagePlus, PackageX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Pagination from '@/components/functionals/Pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProducts, getCategorias } from '@/lib/services';

import OneProductInfo from '@/components/functionals/OneProductInfo';
import ModalProduct from '@/components/functionals/ModalProduct';
import { Suspense } from 'react';
import SkeletonProductInfo from '@/components/skeletons/SkeletonProductInfo';

export default async function Products({ searchParams }) {
  const page = searchParams['p'] ?? 1;
  const { data, errors } = await getProducts({ page: Number(page) });
  const productos = data?.productosInfo;
  const info = data?.info;
  const { data: categorias } = await getCategorias();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Modelos</h1>
        <ModalProduct
          trigger={
            <Button className="gap-1 items-center">
              <PackagePlus size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          categorias={categorias}
        />
      </div>

      {productos?.length < 1 ? (
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
                  <TableHead>Imagen</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio Costo</TableHead>
                  <TableHead>Precio Venta</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos?.map((producto) => (
                  <Suspense
                    key={producto?.id}
                    fallback={<SkeletonProductInfo />}
                  >
                    <OneProductInfo categorias={categorias} id={producto?.id} />
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
