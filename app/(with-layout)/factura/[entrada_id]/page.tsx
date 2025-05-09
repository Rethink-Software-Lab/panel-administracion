import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFactura } from './services';
import { DateTime } from 'luxon';
import ButtonPrint from '@/components/functionals/ButtonPrint';

export default async function Factura({
  params,
}: {
  params: { entrada_id: string };
}) {
  const { data, error } = await getFactura(params.entrada_id);

  if (error) {
    return <div>Error al conectar con el servidor</div>;
  }
  return (
    <div id="tablaParaImprimir" className="p-8 print:w-full ">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-medium">Factura</h2>
          <p className="print:hidden">
            {DateTime.fromSQL(data?.createdAt || '').toLocaleString(
              DateTime.DATE_FULL,
              { locale: 'es' }
            )}
          </p>
        </div>
        <ButtonPrint className="print:hidden" />
        <div className="text-right hidden print:block">
          <p>
            {DateTime.fromSQL(data?.createdAt || '').toLocaleString(
              DateTime.DATE_FULL,
              { locale: 'es' }
            )}
          </p>
          <p className="text-sm">
            No. Factura:{' '}
            {DateTime.fromSQL(data?.createdAt || '')
              .toMillis()
              .toString()
              .substring(0, 10)}
          </p>
        </div>
      </div>
      <div className="pb-8 hidden print:block">
        <p className="text-sm mb-2">Productor</p>
        <div className="border-t bg-muted/50 w-full mb-2" />
        <h1 className="font-bold">{data?.proveedor?.nombre}</h1>
        <h2 className="text-sm">
          <b>Domicilio social:</b> {data?.proveedor?.direccion}
        </h2>
        <h2 className="text-sm ">
          <b>NIT:</b> {data?.proveedor?.nit}
        </h2>
        <h2 className="text-sm ">
          <b>No. Cuenta CUP:</b> {data?.proveedor?.noCuentaCup}
        </h2>
        <h2 className="text-sm ">
          <b>No. Cuenta Mayorista:</b> {data?.proveedor?.noCuentaMayorista}
        </h2>
        <h2 className="text-sm ">
          <b>Teléfono:</b> {data?.proveedor?.telefono}
        </h2>
      </div>

      <div className="print:hidden border-t bg-muted/50 w-full my-8 print:m-0" />
      <div className="flex items-center  justify-between my-8 print:m-0">
        <p className="print:hidden text-xl font-light">
          Proveedor: {data?.proveedor?.nombre}
        </p>
        <p className="text-xl font-ligth print:hidden">
          No. Factura:{' '}
          {DateTime.fromSQL(data?.createdAt || '')
            .toMillis()
            .toString()
            .substring(0, 10)}
        </p>
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
          {data?.productos?.map((producto) => (
            <TableRow key={producto.descripcion}>
              <TableCell className="font-medium">
                {producto.descripcion}
              </TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(producto.precio_unitario)}
              </TableCell>
              <TableCell className="text-right">
                {Intl.NumberFormat('es-CU', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(producto.importe)}
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
                ?.reduce(
                  (total, producto) => total + Number(producto.importe),
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
