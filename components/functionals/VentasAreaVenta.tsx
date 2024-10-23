import { CloudOff, FileText, PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import ModalVentas from '@/components/functionals/ModalVentas';

import { DataTable } from '../ui/data-table-ventas';
import { columns } from '@/app/(with-layout)/areas-de-venta/[id]/columns-ventas';

import Link from 'next/link';
import { Productos } from './InventarioAreaVenta';

enum Metodo {
  Transferencia = 'TRANSFERENCIA',
  Efectivo = 'EFECTIVO',
  Mixto = 'MIXTO',
}

interface Ventas {
  id: number;
  created_at: string;
  importe: number;
  metodo_pago: Metodo;
  usuario__username: string;
  producto__info__descripcion: string;
  cantidad: number;
}

interface Props {
  id: string;
  ventas: Ventas[];
  productos: Productos[];
}

export default async function VentasAreaVenta({
  id,
  ventas,
  productos,
}: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 pb-4 lg:gap-6 lg:pb-6 px-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Ventas</h1>
        <div className="flex items-center gap-2">
          <Link
            href={{
              pathname: '/reportes',
              query: {
                type: 'ventas',
                area: id,
              },
            }}
          >
            <Button variant="outline" size="icon">
              <FileText size={18} />
            </Button>
          </Link>
          <ModalVentas
            idPunto={Number(id)}
            productosInfo={productos}
            trigger={
              <Button className="gap-1 items-center">
                <PackagePlus size={18} />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            }
          />
        </div>
      </div>

      {ventas ? (
        <DataTable columns={columns} data={ventas} id={id} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mb-16">
          <div className="flex flex-col items-center gap-1 text-center">
            <CloudOff size={72} className="inline-flex mb-4" />
            <h3 className="text-2xl font-bold tracking-tight">
              Error de conexión
            </h3>
            <p className="text-sm text-muted-foreground">
              No se pudo conectar con el servidor
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
