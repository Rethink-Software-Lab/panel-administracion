"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Suspense, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResponseSalidas, Salida } from "@/app/(with-layout)/salidas/types";

import { DataTable } from "@/components/ui/data-table-salidas";
import { columns } from "@/app/(with-layout)/salidas/columns";
import { DateTime } from "luxon";
import DetalleProductosSalida from "../DetalleProductosSalida";

export default function SheetInfoSalidaAlmacenPrincipal({
  data,
}: {
  data: ResponseSalidas | null;
}) {
  const [open, setOpen] = useState(false);
  const [salida, setSalida] = useState<Omit<
    Salida,
    "producto" | "cantidad"
  > | null>(null);

  const handleOpen = (salida: Omit<Salida, "producto" | "cantidad">) => {
    setSalida(salida);
    setOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen} modal={true}>
        <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Información de salida
            </SheetTitle>
            <SheetDescription className="flex justify-between items-center gap-2">
              <div className="flex justify-between w-full">
                {salida?.createdAt && (
                  <span className="text-sm text-muted-foreground">
                    Fecha:{" "}
                    {DateTime.fromSQL(salida.createdAt).toLocaleString(
                      DateTime.DATETIME_SHORT,
                      { locale: "es" }
                    )}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  Usuario: {salida?.usuario}
                </span>
                <span className="text-sm text-muted-foreground">
                  Destino: {salida?.destino}
                </span>
              </div>
            </SheetDescription>
          </SheetHeader>
          {salida?.id && (
            <Suspense fallback={<SkeletonDetalleSalida />}>
              <DetalleProductosSalida salidaId={salida.id} />
            </Suspense>
          )}
        </SheetContent>
      </Sheet>
      {data && (
        <DataTable
          columns={columns}
          areas={data.areasVenta}
          data={data.salidas}
          handleOpen={handleOpen}
        />
      )}
    </>
  );
}

function SkeletonDetalleSalida() {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Producto</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold align-top w-1/2">
            <Skeleton className="w-3/4 h-4" />
          </TableCell>
          <TableCell className="flex justify-end">
            <Skeleton className="w-2/4 h-4" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold align-top w-1/2">
            <Skeleton className="w-2/4 h-4" />
          </TableCell>
          <TableCell className="flex justify-end">
            <Skeleton className="w-1/4 h-4" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
