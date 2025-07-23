"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Salida } from "@/app/(with-layout)/salidas/types";

import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function SheetInfoSalidaAlmacenPrincipal({
  salida,
}: {
  salida: Salida;
}) {
  return (
    <Sheet modal={true}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye size={18} />
        </Button>
      </SheetTrigger>
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
                Destino: {salida?.destino?.nombre}
              </span>
            </div>
          </SheetDescription>
        </SheetHeader>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salida?.detalle?.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-semibold align-top w-1/2">
                  {producto.nombre}
                </TableCell>
                <TableCell className="text-right">
                  {producto.cantidad}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
