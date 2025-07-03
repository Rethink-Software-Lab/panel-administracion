"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Movimiento, TipoMovimiento } from "@/app/(with-layout)/search/types";

export const columns: ColumnDef<Movimiento>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
    filterFn: (row, id, value) => {
      return (
        value?.from <= new Date(row.getValue(id)) &&
        value?.to >= new Date(row.getValue(id)).setHours(0, 0, 0, 0)
      );
    },
  },
  {
    accessorKey: "type",
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
  },
  {
    accessorKey: "user",
    header: "Usuario",
    cell: ({ row }) => row.getValue("user") || "Usuario eliminado",
  },
  {
    accessorKey: "observaciones",
    header: "Adicional",
    cell: ({ row }) => {
      const movimiento = row.original;
      switch (movimiento.type) {
        case TipoMovimiento.ENTRADA:
          return `Proveedor: ${
            movimiento.proveedor || "(eliminado)"
          } por método de pago ${movimiento.metodoPago}`;
        case TipoMovimiento.SALIDA:
          return `Área de destino ${movimiento.areaVenta}`;
        case TipoMovimiento.SALIDA_REVOLTOSA:
          return `Área de destino Revoltosa`;
        case TipoMovimiento.TRANSFERENCIA:
          return `Área de origen ${movimiento.desde} - Área de destino ${movimiento.hacia}`;
        case TipoMovimiento.AJUSTE:
          return `Ajustó de ${movimiento.areaVenta} por ${movimiento.motivo}`;
        case TipoMovimiento.VENTA:
          return `Área ${movimiento.areaVenta} - ${movimiento.metodoPago}`;
        case TipoMovimiento.MERMA:
          return `${movimiento.areaVenta}`;
        case TipoMovimiento.CUENTA_CASA:
          return `${movimiento.areaVenta}`;
        default:
          return null;
      }
    },
  },
];
