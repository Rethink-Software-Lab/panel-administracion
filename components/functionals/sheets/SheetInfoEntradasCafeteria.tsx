'use client';

import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DateTime } from 'luxon';
import { EntradaCafeteria } from '@/app/(with-layout)/(cafeteria)/entradas-cafeteria/types';

export default function SheetInfoEntradasCafeteria({
  data,
}: {
  data: EntradaCafeteria;
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
            Información de entrada
          </SheetTitle>
          <SheetDescription className="pb-6 flex items-center gap-2 justify-between">
            <span>
              {DateTime.fromISO(data.created_at).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </span>
            <span>creada por : {data?.usuario?.username}</span>
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
                  {producto.producto.nombre}
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
