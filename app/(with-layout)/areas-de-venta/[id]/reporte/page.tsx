import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getDetallesVenta } from '@/lib/services';
import ButtonPrint from '@/components/functionals/ButtonPrint';
import { DateTime } from 'luxon';
import { BookOpen, CloudOff } from 'lucide-react';

interface Producto {
  id: number;
  cantidad: number;
  descripcion: string;
  precio_venta: number;
  importe: number;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { data, error } = await getDetallesVenta(params.id);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {data ? (
        <div id="tablaParaImprimir" className="print:w-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-medium">Reporte de venta</h2>
              <p>
                {DateTime.fromISO(new Date().toISOString()).toLocaleString(
                  DateTime.DATE_FULL,
                  { locale: 'es' }
                )}
              </p>
            </div>
            <div>
              <ButtonPrint className="print:hidden" disabled={error} />
              <p className="hidden print:block">{data.area}</p>
            </div>
          </div>
          {data?.productos?.length > 0 ? (
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Cantidad</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Precio unitario</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.productos?.map((p: Producto) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.cantidad}</TableCell>
                    <TableCell>{p.descripcion}</TableCell>
                    <TableCell>${p.precio_venta}</TableCell>
                    <TableCell className="text-right">${p.importe}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                {data?.pago_trabajador > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={3} className="font-medium">
                        Subtotal:
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${data?.subtotal}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>Total efectivo</TableCell>
                      <TableCell className="text-right">
                        ${data?.efectivo}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>Total transferencia</TableCell>
                      <TableCell className="text-right">
                        ${data?.transferencia}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>Pago al trabajador</TableCell>
                      <TableCell className="text-right">
                        - ${data?.pago_trabajador}
                      </TableCell>
                    </TableRow>
                  </>
                )}
                <TableRow className="border-t border-t-gray-300">
                  <TableCell colSpan={3} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${data?.total}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <div className="flex flex-1 h-full items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center">
                <BookOpen size={72} className="inline-flex mb-4" />
                <h3 className="text-2xl font-bold tracking-tight">
                  No se han vendido productos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cuando exista alguna venta del día de hoy aprarecerá aquí.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <CloudOff size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Error de conexión
            </h3>
            <p className="text-sm text-muted-foreground">
              Comprueba tu conexión a internet!, si el problema persiste
              contacta con soporte.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
