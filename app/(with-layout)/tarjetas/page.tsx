import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GetTarjetas } from './services';
import { CloudOff, EllipsisVertical } from 'lucide-react';
import SheetTarjetas from '@/components/functionals/sheets/SheetTarjetas';
import { cn } from '@/lib/utils';
import { Banco, Transferenciastarjetas } from './types';
import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from './columns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SheetTransferenciasTarjetas from '@/components/functionals/sheets/SheetTransferenciasTarjetas';
import Delete from './client';
import { Progress } from '@/components/ui/progress';

const MAX_TRANF_MES = 120000;

export default async function Tarjetas() {
  const { data, error } = await GetTarjetas();

  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6 h-full">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Tarjetas</h1>
        {data?.total_balance && (
          <div className="flex gap-1 items-center">
            <p className="text-sm">Saldo total:</p>
            <p className="text-md font-semibold">
              {Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'CUP',
              }).format(data.total_balance)}
            </p>
          </div>
        )}
      </div>
      <div
        className="w-full h-full max-h-[14rem] flex overflow-x-auto p-4 scroll-p-4 gap-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {data?.tarjetas?.map((tarjeta) => (
          <Card
            key={tarjeta.id}
            style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}
            className={cn(
              'bg-gradient-to-br  text-white aspect-video',
              tarjeta.banco === Banco.BANDEC && 'from-[#6c0207] to-[#bc1f26]',
              tarjeta.banco === Banco.BPA && 'from-[#1d6156] to-[#1d6156]'
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle className="line-clamp-1">{tarjeta.nombre}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>{tarjeta.nombre}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Delete id={tarjeta.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                {Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'CUP',
                }).format(tarjeta.balance.valor)}
              </p>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-xs text-right">
                  {Intl.NumberFormat('es-ES', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                  }).format(tarjeta.total_transferencias_mes)}
                  /{MAX_TRANF_MES}
                </p>
                <Progress
                  className={cn(
                    '[&>div]:bg-white mt-2',
                    (tarjeta.total_transferencias_mes * 100) / MAX_TRANF_MES >=
                      60 && '[&>div]:bg-yellow-400',
                    (tarjeta.total_transferencias_mes * 100) / MAX_TRANF_MES >=
                      80 && '[&>div]:bg-red-600'
                  )}
                  value={
                    (tarjeta.total_transferencias_mes * 100) / MAX_TRANF_MES
                  }
                />
              </div>
            </CardFooter>
          </Card>
        ))}
        <SheetTarjetas isError={!!error} />
      </div>
      <div className="p-4 m-0 bg-muted/40 h-full border-t-2 border-muted">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold md:text-xl">Transferencias</h1>
          <SheetTransferenciasTarjetas tarjetas={data?.tarjetas} />
        </div>
        {data ? (
          <DataTable<Transferenciastarjetas>
            columns={columns}
            data={data?.transferencias}
          />
        ) : (
          <div className="flex py-40 flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <CloudOff size={72} className="inline-flex mb-4" />
              <h3 className="text-2xl font-bold tracking-tight">
                Error de conexión
              </h3>
              <p className="text-sm text-muted-foreground">
                Comprueba tu conexión a internet!, si el problema persiste
                contacta con soporte.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
