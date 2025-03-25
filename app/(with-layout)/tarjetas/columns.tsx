'use client';
import TableDeleteV2 from '@/components/functionals/TableDeleteV2';
import { deleteTransferenciaTarjeta } from './actions';
import { DateTime } from 'luxon';
import { ColumnDef } from '@tanstack/react-table';

import { TipoTransferencia, Transferenciastarjetas } from './types';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Transferenciastarjetas>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) =>
      DateTime.fromISO(row.getValue('created_at')).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: 'es' }
      ),
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => {
      const tipo = row.getValue('tipo');

      if (tipo === TipoTransferencia.INGRESO) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ArrowDownLeft className="text-green-500" />
              </TooltipTrigger>
              <TooltipContent className="bg-green-500">Ingreso</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else if (tipo === TipoTransferencia.EGRESO) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ArrowUpRight className="text-red-500" />
              </TooltipTrigger>
              <TooltipContent className="bg-red-500">Egreso</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
  },
  {
    accessorKey: 'cantidad',
    header: 'Valor',
    cell: ({ row }) =>
      Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CUP',
      }).format(row.getValue('cantidad')),
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
    size: 200,
  },
  {
    accessorKey: 'cuenta.nombre',
    header: 'Tarjeta',
  },

  {
    accessorKey: 'usuario.username',
    header: 'Usuario',
    cell: ({ row }) => {
      const username = row.original.usuario?.username;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },

  {
    header: ' ',
    cell: ({ row }) => {
      if (!row.original.venta && !row.original.venta_cafeteria) {
        return (
          <TableDeleteV2
            id={row.original.id}
            action={deleteTransferenciaTarjeta}
          />
        );
      }
      return;
    },
  },
];
