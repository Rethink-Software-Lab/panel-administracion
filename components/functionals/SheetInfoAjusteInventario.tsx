'use client';

import { Eye } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DateTime } from 'luxon';
import { AjusteInventario } from '@/app/(with-layout)/ajuste-inventario/types';

export default function SheetInfoAjusteInventario({
  data,
}: {
  data: AjusteInventario;
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
            {data.motivo}
          </SheetTitle>
          <SheetDescription className="pb-6 flex items-center gap-2 justify-between">
            <span>
              {DateTime.fromISO(data.created_at).toLocaleString(
                DateTime.DATE_FULL
              )}
            </span>
            <span>creada por : {data.usuario.username}</span>
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
            {data.productos.map((producto, index) => (
              <TableRow key={`${producto.descripcion}-${index}`}>
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
