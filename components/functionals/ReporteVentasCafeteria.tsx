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
import { ClipboardX, FolderSearch } from 'lucide-react';

import { ProductoCafeteria } from '@/app/(with-layout)/(almacen-cafeteria)/inventario-cafeteria/types';
import { Elaboraciones } from '@/app/(with-layout)/(almacen-cafeteria)/elaboraciones/types';

interface Producto extends ProductoCafeteria {
  cantidad: string;
  importe: number;
}

interface ElaboracionesType extends Elaboraciones {
  cantidad: string;
  importe: number;
}

interface Params {
  productos: Producto[];
  elaboraciones: ElaboracionesType[];
  total: number;
  gastos_variables: number;
  gastos_fijos: number;
  costo_producto: number;
  subtotal: number;
  efectivo: number;
  transferencia: number;
  mano_obra: number;
}

export default async function ReporteVentasCafeteria({
  data,
  error,
}: {
  data: Params;
  error: string | null;
}) {
  if (!data && !error) {
    return (
      <div className="bg-muted h-full">
        <div className="flex flex-1 p-4 m-4 h-[90vh] items-center justify-center rounded-lg bg-background border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <FolderSearch size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Seleccione un rango de fechas
            </h3>
            <p className="text-sm text-muted-foreground">
              Seleccione algunos filtros para comenzar a buscar.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (
    data &&
    (data.productos.length > 0 || data.elaboraciones.length > 0)
  ) {
    return (
      <div
        id="tablaParaImprimir"
        className="print:w-full h-full bg-muted print:bg-white p-4"
      >
        <div className="hidden print:flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium">Reporte de venta</h2>
            <p>
              {DateTime.fromISO(new Date().toISOString()).toLocaleString(
                DateTime.DATE_FULL,
                { locale: 'es' }
              )}
            </p>
          </div>
          <p className="font-bold">Cafetería</p>
        </div>
        <Table className="whitespace-nowrap bg-background border-separate border-spacing-0 border print:border-none border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] border-b border-gray-300 px-4 print:px-0">
                Cantidad
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 print:px-0">
                Descripción
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 print:px-0">
                Precio unitario
              </TableHead>
              <TableHead className="text-right border-b border-gray-300 px-4 print:px-0">
                Importe
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.elaboraciones.map((p: ElaboracionesType) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium border-b border-gray-300 px-4 print:px-0">
                  {p.cantidad}
                </TableCell>
                <TableCell className="border-b border-gray-300 px-4 print:px-0">
                  {p.nombre}
                </TableCell>
                <TableCell className="border-b border-gray-300 px-4 print:px-0">
                  ${p.precio}
                </TableCell>
                <TableCell className="text-right border-b border-gray-300 px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(p.importe)}
                </TableCell>
              </TableRow>
            ))}
            {data.productos.map((p: Producto) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium border-b border-gray-300 px-4 print:px-0">
                  {p.cantidad}
                </TableCell>
                <TableCell className="border-b border-gray-300 px-4 print:px-0">
                  {p.nombre}
                </TableCell>
                <TableCell className="border-b border-gray-300 px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(p.precio_venta)}
                </TableCell>
                <TableCell className="text-right border-b border-gray-300 px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(p.importe)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <>
              <TableRow>
                <TableCell colSpan={3} className="font-medium px-4 print:px-0">
                  Subtotal:
                </TableCell>
                <TableCell className="text-right px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(data.subtotal)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3} className="px-4 print:px-0">
                  Total efectivo
                </TableCell>
                <TableCell className="text-right px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(data.efectivo)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="border-b border-gray-300 px-4 print:px-0"
                >
                  Total transferencia
                </TableCell>
                <TableCell className="text-right border-b border-gray-300 px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(data.transferencia)}
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-t-gray-300">
                <TableCell colSpan={3} className="font-medium px-4 print:px-0">
                  Costos de producto
                </TableCell>
                <TableCell className="text-right font-medium px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(data.costo_producto)}
                </TableCell>
              </TableRow>
              {data.mano_obra && data.mano_obra > 0 && (
                <TableRow className="border-t border-t-gray-300">
                  <TableCell
                    colSpan={3}
                    className="font-medium px-4 print:px-0"
                  >
                    Mano de obra
                  </TableCell>
                  <TableCell className="text-right font-medium px-4 print:px-0">
                    {Intl.NumberFormat('es-CU', {
                      style: 'currency',
                      currency: 'CUP',
                    }).format(data.mano_obra)}
                  </TableCell>
                </TableRow>
              )}

              {data.gastos_variables > 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="px-4 print:px-0">
                    Gastos Variables
                  </TableCell>
                  <TableCell className="text-right px-4 print:px-0">
                    {Intl.NumberFormat('es-CU', {
                      style: 'currency',
                      currency: 'CUP',
                    }).format(data.gastos_variables)}
                  </TableCell>
                </TableRow>
              )}

              {data.gastos_fijos > 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="px-4 print:px-0">
                    Gastos Fijos
                  </TableCell>
                  <TableCell className="text-right px-4 print:px-0">
                    {Intl.NumberFormat('es-CU', {
                      style: 'currency',
                      currency: 'CUP',
                    }).format(data.gastos_fijos)}
                  </TableCell>
                </TableRow>
              )}
            </>
            <TableRow>
              <TableCell
                colSpan={3}
                className="font-bold px-4 border-t border-gray-300 print:px-0"
              >
                Total
              </TableCell>
              <TableCell className="text-right font-bold px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  } else if (data && !error) {
    return (
      <div className="bg-muted h-full">
        <div className="flex flex-1 p-4 m-4 h-[90vh] items-center justify-center rounded-lg bg-background border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <ClipboardX size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              No hay ventas en este rango.
            </h3>
            <p className="text-sm text-muted-foreground">
              Cuando exista alguna venta en este rango, aparecerá aquí.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
