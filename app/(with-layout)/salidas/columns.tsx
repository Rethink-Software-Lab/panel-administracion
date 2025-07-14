"use client";
import TableDeleteV2 from "@/components/functionals/TableDeleteV2";
import { deleteSalida } from "./actions";
import { DateTime } from "luxon";
import { ColumnDef } from "@tanstack/react-table";
import { Salida } from "./types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Salida>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) =>
      DateTime.fromSQL(row.getValue("createdAt")).toLocaleString(
        DateTime.DATETIME_MED,
        { locale: "es" }
      ),
  },
  {
    accessorKey: "producto",
    size: 300,
    header: "Productos",
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad total",
  },
  {
    accessorKey: "destino",
    header: "Destino",
  },

  {
    accessorKey: "usuario",
    header: "Usuario",
  },

  {
    header: " ",
    cell: ({ table, row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            // @ts-ignore
            table.options?.meta?.handleOpen({
              id: row.original.id,
              createdAt: row.original.createdAt,
              usuario: row.original.usuario,
              destino: row.original.destino,
            })
          }
        >
          <Eye size={18} />
        </Button>
        <TableDeleteV2 id={row.original.id} action={deleteSalida} />
      </div>
    ),
  },
];
