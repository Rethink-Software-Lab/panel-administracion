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
      <div className="hidden print:flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Factura</h2>
        <p>
          {DateTime.fromSQL(data?.createdAt || '').toLocaleString(
            DateTime.DATE_FULL,
            { locale: 'es' }
          )}
        </p>
      </div>
      <div className="hidden print:flex justify-between items-center mb-8">
        <div>
          <p className="text-sm mb-2">Emisor</p>
          <div className="border-t bg-muted/50 w-full mb-2" />
          <h1 className="font-bold">{data?.proveedor}</h1>
          <h2 className="text-sm ">NIF: 123456789</h2>
          <h2 className="text-sm font-light">
            Independencia #123 % Maceo y Honorato Castillo
          </h2>
        </div>
        <div>
          <p className="text-sm mb-2">Receptor</p>
          <div className="border-t bg-muted/50 w-full mb-2" />
          <h1 className="font-bold">Salón Madame</h1>
          <h2>NIF: 123456789</h2>
          <h2 className="text-sm font-light">
            Independencia #123 % Maceo y Honorato Castillo
          </h2>
        </div>
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
            <TableRow key={producto.codigo}>
              <TableCell className="font-medium">{producto.codigo}</TableCell>
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
                .reduce(
                  (total, producto) => total + Number(producto.importe),
                  0
                )
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-16 hidden print:flex justify-between items-center gap-10">
        <div className="text-center w-full">
          <div className="border-t bg-muted/50 w-full mx-auto mb-2" />
          <span className="text-sm">Firma del emisor</span>
        </div>
        <div className="text-center w-full">
          <div className="border-t bg-muted/50 w-full mx-auto mb-2" />
          <span className="text-sm">Firma del receptor</span>
        </div>
      </div>
    </div>
  );
}
