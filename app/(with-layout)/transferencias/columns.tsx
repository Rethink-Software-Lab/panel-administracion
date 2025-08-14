"use client";
import TableDeleteV2 from "@/components/functionals/TableDeleteV2";
import { deleteTransferencia } from "./actions";
import { DateTime } from "luxon";
import { Row } from "@tanstack/react-table";
import SheetInfoTransferencias from "@/components/functionals/SheetInfoTransferencias";
import { Transferencia } from "./types";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }: { row: Row<Transferencia> }) =>
      DateTime.fromSQL(row.getValue("created_at")).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: "es" }
      ),
  },
  {
    accessorKey: "de",
    header: "Área de origen",
    cell: ({ row }: { row: Row<Transferencia> }) => {
      const area = row.original?.de;
      if (area) {
        return area;
      } else {
        return <Badge variant="outline">Área de venta eliminada</Badge>;
      }
    },
  },
  {
    accessorKey: "para",
    header: "Área de destino",
    cell: ({ row }: { row: Row<Transferencia> }) => {
      const area = row.original.para;
      if (area) {
        return area;
      } else {
        return <Badge variant="outline">Área de venta eliminada</Badge>;
      }
    },
  },
  {
    accessorKey: "usuario",
    header: "Usuario",
    cell: ({ row }: { row: Row<Transferencia> }) => {
      const username = row.original?.usuario;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },

  {
    header: " ",
    cell: ({ row }: { row: Row<Transferencia> }) => (
      <span className="space-x-2">
        <SheetInfoTransferencias data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteTransferencia} />
      </span>
    ),
  },
];
