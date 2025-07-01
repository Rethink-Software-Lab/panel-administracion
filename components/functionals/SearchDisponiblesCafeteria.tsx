import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "../ui/table";

export async function SearchDisponiblesCafeteria({ data }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Área</TableHead>
            <TableHead className="font-bold">Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Almacén cafetería</TableCell>
            <TableCell>{data.almacen}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cafetería</TableCell>
            <TableCell>{data.cafeteria}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
