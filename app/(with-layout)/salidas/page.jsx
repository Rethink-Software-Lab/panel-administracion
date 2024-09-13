import { DateTime } from 'luxon';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Edit2, PlusCircle, SearchX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ModalSalidas from '@/components/functionals/ModalSalida';

import { getSalidas, getAreasVentas, getProductos } from '@/lib/services';
import { deleteSalida } from '@/lib/actions';

import Pagination from '@/components/functionals/Pagination';
import TableDelete from '@/components/functionals/TableDelete';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { DataTable } from '@/components/ui/data-table-salidas';
import { columns } from './columns';

export default async function Salidas() {
  const { data } = await getSalidas();
  const { data: productosInfo } = await getProductos();
  const {
    data: { areasVenta },
  } = await getAreasVentas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Salidas</h1>

        <ModalSalidas
          trigger={
            <Button className="gap-1 items-center">
              <PlusCircle size={18} />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          }
          areasVenta={areasVenta}
          productosInfo={productosInfo}
        />
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </main>
  );
}
