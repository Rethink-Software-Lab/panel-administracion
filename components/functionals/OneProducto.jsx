import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { oneProducto } from '@/lib/services';
import Link from 'next/link';

export default async function OneProducto({ id }) {
  const { data: producto } = await oneProducto({ id });
  return (
    <TableRow key={producto?.id}>
      <TableCell className="font-medium">{producto.id}</TableCell>
      <TableCell className="font-medium">{producto?.color}</TableCell>
      <TableCell className="font-medium">{producto?.numero}</TableCell>
      <TableCell>
        <Link href={`/search/${producto?.info?.codigo}`}>
          <Badge variant="outline">{producto?.info?.codigo}</Badge>
        </Link>
      </TableCell>
    </TableRow>
  );
}
