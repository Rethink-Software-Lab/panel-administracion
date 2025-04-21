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

interface SubtotalReporteCafeteria {
  general: number;
  efectivo: number;
  transferencia: number;
}
interface TotalReporteCafeteria {
  general: number;
  efectivo: number;
  transferencia: number;
}

interface Params {
  productos: Producto[];
  elaboraciones: ElaboracionesType[];
  total: TotalReporteCafeteria;
  gastos_variables: number;
  gastos_fijos: number;
  subtotal: SubtotalReporteCafeteria;
  merma: number;
  cuenta_casa: number;
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
            <h2 className="text-2xl font-medium">Reporte de contable</h2>
            <p>
              {DateTime.fromISO(new Date().toISOString()).toLocaleString(
                DateTime.DATE_FULL,
                { locale: 'es' }
              )}
            </p>
          </div>
          <p className="font-bold">Cafetería</p>
        </div>

        <h3 className="text-lg font-semibold pl-2 print:pl-0  pb-2">
          Detalle de ventas
        </h3>
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
                <TableCell className="font-medium  px-4 print:px-0">
                  {p.cantidad}
                </TableCell>
                <TableCell className="px-4 print:px-0">{p.nombre}</TableCell>
                <TableCell className=" px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(p.precio_venta)}
                </TableCell>
                <TableCell className="text-right px-4 print:px-0">
                  {Intl.NumberFormat('es-CU', {
                    style: 'currency',
                    currency: 'CUP',
                  }).format(p.importe)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold pl-2 print:pl-0  pb-2 pt-4">
          Resumen Financiero
        </h3>
        <Table className="whitespace-nowrap bg-background border-separate border-spacing-0 border print:border-none border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className=" px-4 print:px-0">Concepto</TableHead>
              <TableHead className="text-right px-4 print:px-0">
                Monto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Subtotal
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.subtotal.general)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Gastos Fijos
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.gastos_fijos)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Gastos Variables
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.gastos_variables)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold px-4 border-t border-gray-300 print:px-0">
                Total
              </TableCell>
              <TableCell className="text-right font-bold px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.total.general)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold pl-2 print:pl-0 pb-2 pt-4">
          Desglose del subtotal por medio de pago
        </h3>
        <Table className="whitespace-nowrap bg-background border-separate border-spacing-0 border print:border-none border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className=" px-4 print:px-0">Medio de pago</TableHead>
              <TableHead className="text-right px-4 print:px-0">
                Monto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Efectivo
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.subtotal.efectivo)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Transferencia
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.subtotal.transferencia)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold pl-2 print:pl-0  pb-2 pt-4">
          Desglose del total por medio de pago
        </h3>
        <Table className="whitespace-nowrap bg-background border-separate border-spacing-0 border print:border-none border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className=" px-4 print:px-0">Medio de pago</TableHead>
              <TableHead className="text-right px-4 print:px-0">
                Monto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Efectivo
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.total.efectivo)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 border-t border-gray-300 print:px-0">
                Transferencia
              </TableCell>
              <TableCell className="text-right px-4 border-t border-gray-300 print:px-0">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(data.total.transferencia)}
              </TableCell>
            </TableRow>
          </TableBody>
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
