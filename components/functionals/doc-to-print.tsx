'use client';
import { EntradaCafeteria } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/types';
import { DateTime } from 'luxon';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function DocumentToPrint({ data }: { data: EntradaCafeteria }) {
  return (
    <div id="tablaParaImprimir" className="p-8 print:w-full hidden print:block">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-medium">Factura</h2>
          <p className="print:hidden">
            {DateTime.fromISO(data.created_at || '').toLocaleString(
              DateTime.DATE_FULL,
              { locale: 'es' }
            )}
          </p>
        </div>
        <div className="text-right hidden print:block">
          <p>
            {DateTime.fromISO(data?.created_at || '').toLocaleString(
              DateTime.DATE_FULL,
              { locale: 'es' }
            )}
          </p>
          <p className="text-sm">
            No. Factura:{' '}
            {DateTime.fromISO(data?.created_at || '')
              .toMillis()
              .toString()
              .substring(0, 10)}
          </p>
        </div>
      </div>
      <div className="pb-8 hidden print:block">
        <p className="text-sm mb-2">Productor</p>
        <div className="border-t bg-muted/50 w-full mb-2" />
        <h1 className="font-bold">
          {data?.proveedor?.nombre || data.proveedor_nombre}
        </h1>
        <h2 className="text-sm">
          <b>Domicilio social:</b>{' '}
          {data?.proveedor?.direccion || data.proveedor_direccion}
        </h2>
        <h2 className="text-sm ">
          <b>NIT:</b> {data?.proveedor?.nit || data.proveedor_nit}
        </h2>
        {(data?.proveedor?.noCuentaCup ||
          data.proveedor_no_cuenta_mayorista) && (
          <h2 className="text-sm ">
            <b>No. Cuenta CUP:</b>{' '}
            {data?.proveedor?.noCuentaCup || data.proveedor_no_cuenta_mayorista}
          </h2>
        )}

        {(data?.proveedor?.noCuentaMayorista ||
          data.proveedor_no_cuenta_mayorista) && (
          <h2 className="text-sm ">
            <b>No. Cuenta Mayorista:</b>{' '}
            {data?.proveedor?.noCuentaMayorista ||
              data.proveedor_no_cuenta_mayorista}
          </h2>
        )}

        <h2 className="text-sm ">
          <b>Teléfono:</b>{' '}
          {data?.proveedor?.telefono || data.proveedor_telefono}
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio unitario</TableHead>
            <TableHead className="text-right">Importe</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.productos.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell className="font-medium">
                {producto.producto.nombre}
              </TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(producto.producto.precio_costo)}
              </TableCell>
              <TableCell className="text-right">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(producto.cantidad * producto.producto.precio_costo)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              $
              {data?.productos
                .reduce(
                  (total, producto) =>
                    total +
                    Number(producto.cantidad * producto.producto.precio_costo),
                  0
                )
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="pt-8 hidden print:block">
        <p className="text-sm mb-2">Cliente</p>
        <div className="border-t bg-muted/50 w-full mb-2" />
        <h1 className="font-bold">Luis Miguel Aria Rodríguez</h1>
        <h2>CI: 89042732981</h2>
      </div>

      <div className="mt-20 hidden print:flex justify-between items-center gap-10">
        <div className="text-center w-full">
          <div className="border-t bg-muted/50 w-full mx-auto mb-2" />
          <span className="text-sm">Firma productor</span>
        </div>
        <div className="text-center w-full">
          <div className="border-t bg-muted/50 w-full mx-auto mb-2" />
          <span className="text-sm">Firma cliente</span>
        </div>
      </div>
    </div>
  );
}
