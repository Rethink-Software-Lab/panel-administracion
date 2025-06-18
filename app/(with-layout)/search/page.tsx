import { CloudOff, FileXIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { searchProduct } from "@/lib/services";
import Image from "next/image";

import { getSession } from "@/lib/getSession";
import { TimeLineProducto } from "@/components/functionals/TimeLineProducto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchDisponibles } from "@/components/functionals/SearchDisponibles";

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

  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
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
        <>
          <div className="grid grid-cols-3 gap-4 p-4 lg:p-6">
            {info && (
              <>
                {info?.imagen?.url ? (
                  <Image
                    priority
                    className="col-span-4 md:col-span-1 rounded-lg object-cover aspect-square"
                    src={info?.imagen?.url}
                    width={800}
                    height={800}
                    alt={info?.descripcion}
                  />
                ) : (
                  <div className="col-span-4 md:col-span-1 bg-muted rounded-lg min-h-80 flex justify-center items-center text-muted-foreground">
                    <div className="flex flex-col justify-center items-center">
                      <FileXIcon size={40} />
                      <p className=" font-medium">Sin foto</p>
                    </div>
                  </div>
                )}
                <Card className="col-span-4 md:col-span-2 overflow-hidden">
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
                          <>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Precio de Costo
                              </span>
                              <span>
                                {Intl.NumberFormat("es-CU", {
                                  style: "currency",
                                  currency: "CUP",
                                }).format(info?.precio_costo)}
                              </span>
                            </li>

                            <Separator className="my-2" />
                          </>
                        )}
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Precio de Venta
                          </span>
                          <span>
                            {Intl.NumberFormat("es-CU", {
                              style: "currency",
                              currency: "CUP",
                            }).format(info?.precio_venta)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {isStaff ? (
            <Tabs defaultValue="inventario" className=" h-full contain-content">
              <TabsList className="px-4 lg:px-6 bg-transparent py-0">
                <TabsTrigger
                  value="inventario"
                  className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
                >
                  Inventario
                </TabsTrigger>
                <TabsTrigger
                  value="movimientos"
                  className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-foreground border-b-[3px] border-white"
                >
                  Movimientos
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="inventario"
                className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted"
              >
                <SearchDisponibles {...data} />
              </TabsContent>
              <TabsContent
                value="movimientos"
                className="m-0 bg-muted/40 h-full border-muted"
              >
                <TimeLineProducto infoId={searchParams.id} />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="px-4 md:px-6">
              <SearchDisponibles {...data} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
