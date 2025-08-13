"use client";

import { ArrowRight, Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { Transferencia } from "@/app/(with-layout)/transferencias/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DateTime } from "luxon";

export default function SheetInfoTransferencias({
  data,
}: {
  data: Transferencia;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {data?.de || "Área eliminada"} <ArrowRight size={18} />{" "}
            {data?.para || "Área eliminada"}
          </SheetTitle>
          <SheetDescription className="pb-6 flex items-center gap-2 justify-between">
            <span>
              {DateTime.fromSQL(data.created_at).toLocaleString(
                DateTime.DATE_FULL
              )}
            </span>
            <span>creada por : {data?.usuario}</span>
          </SheetDescription>
        </SheetHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-semibold align-top w-1/2">
                  {producto.descripcion}
                </TableCell>
                <TableCell className="text-right">
                  {producto.total_transfers}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
