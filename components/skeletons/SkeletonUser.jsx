import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell } from '@/components/ui/table';

export default function SkeletonUser() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-9 h-9 rounded-lg" />
      </TableCell>
    </TableRow>
  );
}
