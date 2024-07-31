import { masVendidos } from '@/lib/services';
import { CloudOff, FolderXIcon } from 'lucide-react';
import OneMasVendidos from '@/components/functionals/OneMasVendidos';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

function SkeletonOneVendidos() {
  return (
    <li className="flex items-center justify-between px-3 py-2  rounded-lg ">
      <div className="flex items-center gap-2">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div>
          <Skeleton className="w-20 h-4 rounded-lg mb-2" />
          <Skeleton className="w-10 h-4 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-end">
        <Skeleton className="w-16 h-4 rounded-lg mb-2" />
        <Skeleton className="w-10 h-4 rounded-lg" />
      </div>
    </li>
  );
}

export default async function CardMasVendidos() {
  const { data, errors } = await masVendidos();

  return (
    <>
      <Card className="col-span-3 md:col-span-1">
        <CardHeader>
          <CardTitle>Productos más vendidos</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          {errors &&
            errors?.map(
              (error) =>
                error.message.startsWith('fetch failed') && (
                  <div
                    key={error?.message}
                    className="flex justify-center items-center h-3/4"
                  >
                    <div className="flex flex-col items-center text-muted-foreground">
                      <CloudOff size={50} />
                      <h3 className="font-medium">
                        No se pudo conectar con el servidor.
                      </h3>
                    </div>
                  </div>
                )
            )}
          {data?.length < 1 ? (
            <div className="flex justify-center items-center h-3/4">
              <div className="flex flex-col items-center text-muted-foreground">
                <FolderXIcon size={50} />
                <h3 className="font-medium">
                  Cuando existan datos aparecerán aquí.
                </h3>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              <Suspense fallback={<SkeletonOneVendidos />}>
                {data?.map((prod) => (
                  <OneMasVendidos
                    key={prod?.producto?.id}
                    id={prod?.producto?.id}
                    cantidad={prod?.cantidad}
                  />
                ))}
              </Suspense>
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
