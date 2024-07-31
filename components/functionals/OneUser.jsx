import { Badge } from '@/components/ui/badge';

import { Edit2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { oneUser } from '@/lib/services';
import { deleteUser } from '@/lib/actions';

import ModalUser from '@/components/functionals/ModalUser';
import TableDelete from '@/components/functionals/TableDelete';

export default async function OneUser({ id, areas }) {
  const { data } = await oneUser({ id });

  return (
    <TableRow>
      <TableCell className="font-medium">{data?.username}</TableCell>
      <TableCell>
        <Badge variant="outline">{data?.rol}</Badge>
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <ModalUser
          data={data}
          trigger={
            <Button variant="outline" size="icon">
              <Edit2 size={18} />
            </Button>
          }
          areas={areas}
        />
        <TableDelete id={data?.id} action={deleteUser} />
      </TableCell>
    </TableRow>
  );
}
