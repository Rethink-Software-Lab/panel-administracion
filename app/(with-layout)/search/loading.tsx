import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="col-span-3 md:col-span-1 rounded-lg aspect-square" />
        <Card className="col-span-3 md:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row gap-2 items-start bg-muted/50">
            <CardTitle className="group flex items-center gap-2 text-lg">
              <Skeleton className="w-48 h-4" />
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Descripción</span>
                  <span>
                    <Skeleton className="w-48 h-4" />
                  </span>
                </li>

                <Separator className="my-2" />
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Precio de Venta</span>
                  <span>
                    <Skeleton className="w-12 h-4" />
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4 overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <CardTitle className="text-lg">Disponibles</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 text-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Área</TableHead>
                  <TableHead className="font-bold">Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton className="w-24 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-4" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
