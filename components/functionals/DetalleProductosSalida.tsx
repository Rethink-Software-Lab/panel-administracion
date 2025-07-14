"use server";

import { getDetalleSalida } from "@/app/(with-layout)/salidas/services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DetalleProductosSalida({
  salidaId,
}: {
  salidaId: number;
}) {
  const { data: productos } = await getDetalleSalida(salidaId);

  if (!productos) return <p>Error al cargar el detalle de la salida</p>;

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Producto</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell className="font-semibold align-top w-1/2">
              {producto.nombre}
            </TableCell>
            <TableCell className="text-right">{producto.cantidad}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
