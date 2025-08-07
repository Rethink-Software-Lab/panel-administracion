"use client";
import TableDeleteV2 from "@/components/functionals/TableDeleteV2";
import { deleteAjuste } from "@/app/(with-layout)/ajuste-inventario/actions";
import { DateTime } from "luxon";
import { ColumnDef } from "@tanstack/react-table";
import SheetInfoAjusteInventario from "@/components/functionals/SheetInfoAjusteInventario";
import { AjusteInventario } from "@/app/(with-layout)/ajuste-inventario/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AjusteInventario>[] = [
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) =>
      DateTime.fromSQL(row.getValue("created_at")).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: "es" }
      ),
  },
  {
    accessorKey: "motivo",
    header: "Motivo",
    size: 800,
  },
  {
    accessorKey: "usuario.username",
    header: "Usuario",
    cell: ({ row }) => {
      const username = row.original.usuario;
      if (username) {
        return username;
      } else {
        return <Badge variant="outline">Usuario eliminado</Badge>;
      }
    },
  },

  {
    header: " ",
    cell: ({ row }) => (
      <span className="flex gap-2 justify-center">
        <SheetInfoAjusteInventario data={row.original} />
        <TableDeleteV2 id={row.original.id} action={deleteAjuste} />
      </span>
    ),
  },
];
