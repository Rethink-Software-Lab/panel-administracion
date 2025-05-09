import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DateTime } from 'luxon';
import { ArchiveX } from 'lucide-react';

interface Producto {
  id: number;
  descripcion: string;
  cantidad: string;
}

interface Params {
  productos: Producto[];
  area: string;
}

export default async function ReporteInventario({
  data,
  error,
}: {
  data: Params;
  error: string | null;
}) {
  if (data && data.productos.length > 0) {
    return (
      <div
        id="tablaParaImprimir"
        className="print:w-full h-full bg-muted print:bg-white p-4"
      >
        <div className="hidden print:flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium">Reporte de inventario</h2>
            <p>
              {DateTime.fromISO(new Date().toISOString()).toLocaleString(
                DateTime.DATE_FULL,
                { locale: 'es' }
              )}
            </p>
          </div>
          <p className="font-bold">{data.area || 'General'}</p>
        </div>
        <Table className="whitespace-nowrap bg-background border-separate border-spacing-0 border print:border-none border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="border-b border-gray-300 px-4 print:px-0">
                Descripción
              </TableHead>
              <TableHead className="text-right border-b border-gray-300 px-4 print:px-0">
                Cantidad
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.productos?.map((p: Producto, index: number) => (
              <TableRow key={p.id}>
                <TableCell className="border-b border-gray-300 px-4 print:px-0">
                  {p.descripcion}
                </TableCell>
                <TableCell className="text-right font-medium border-b border-gray-300 px-4 print:px-0">
                  {p.cantidad}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else if (data && !error) {
    return (
      <div className="bg-muted h-full">
        <div className="flex flex-1 p-4 m-4 h-[90vh] items-center justify-center rounded-lg bg-background border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <ArchiveX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              No hay productos en el inventario.
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando exista algún producto en el inventario, aparecerá aquí.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
