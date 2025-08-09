"use client";
import TableDeleteV2 from "@/components/functionals/TableDeleteV2";
import { deleteAreaVenta } from "./actions";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalAreasVenta from "@/components/functionals/ModalAreasVenta";
import { AreaVenta } from "./types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AreaVenta>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },

  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div
        className="w-8 h-8 rounded-lg"
        style={{ background: row.getValue("color") }}
      ></div>
    ),
  },
  {
    accessorKey: "isMesa",
    header: "Es Mesa",
    cell: ({ row }) => {
      const isMesa = row.getValue("isMesa");
      return isMesa ? (
        <Badge variant="outline">Sí</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      );
    },
  },
  {
    header: " ",
    cell: ({ row }) => {
      if (row.original.nombre !== "Revoltosa") {
        return (
          <div className="flex items-center justify-end gap-2">
            <ModalAreasVenta
              data={row.original}
              trigger={
                <Button variant="outline" size="icon">
                  <span className="sr-only">Editar</span>
                  <Edit2 size={18} />
                </Button>
              }
            />
            <TableDeleteV2 id={row.original.id} action={deleteAreaVenta} />
          </div>
        );
      }
    },
  },
];
