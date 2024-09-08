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
import { CloudOff } from 'lucide-react';

export default async function Page({ params }) {
  const { data, error } = await getDetallesVenta(params.id, params.date);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {data ? (
        <div id="tablaParaImprimir" className="print:w-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-medium">Reporte de venta</h2>
              <p>
                {DateTime.fromISO(params.date).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </p>
            </div>
            <div>
              <ButtonPrint className="print:hidden" disabled={error} />
              <p className="hidden print:block">{data.area}</p>
            </div>
          </div>
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
              {data?.productos?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.cantidad}</TableCell>
                  <TableCell>{p.descripcion}</TableCell>
                  <TableCell>${p.precio_venta}</TableCell>
                  <TableCell className="text-right">${p.importe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${data?.total}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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
