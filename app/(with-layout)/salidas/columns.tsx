"use client";
import TableDeleteV2 from "@/components/functionals/TableDeleteV2";
import { deleteSalida } from "./actions";
import { DateTime } from "luxon";
import { ColumnDef } from "@tanstack/react-table";
import { Salida } from "./types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { SheetInfoSalidaAlmacenPrincipal } from "@/components/functionals/sheets/SheetInfoSalidaAlmacenPrincipal";
import { SheetSalidaAlmacenPrincipal } from "@/components/functionals/sheets/SheetSalidaAlmacenPrincipal";

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
    accessorKey: "destino.nombre",
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
        <SheetInfoSalidaAlmacenPrincipal salida={row.original} />
        <SheetSalidaAlmacenPrincipal
          salida={row.original}
          // @ts-ignore
          areas={table.options?.meta?.areas || []}
          // @ts-ignore
          productos={table.options?.meta?.productos || []}
        />
        <TableDeleteV2 id={row.original.id} action={deleteSalida} />
      </div>
    ),
  },
];
