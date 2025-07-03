"use client";

import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TipoMovimiento } from "@/app/(with-layout)/search/types";
import { DatePickerWithRange } from "../date-range-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  users: { username: string }[];
}

const Types = [
  "Entrada",
  "Salida",
  "Salida Revoltosa",
  "Ajuste",
  "Transferencia",
  "Venta",
  "Merma",
  "Cuenta Casa",
];

export default function DataTableMovimientos<TData>({
  columns,
  data,
  users,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {},
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 3000,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility: { type: false },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2 rounded-md shadow-sm bg-white">
      <div className="flex gap-2 overflow-x-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className=" flex gap-1">
              {columnFilters.find((f) => f.id === "type") ? (
                // @ts-ignore
                <>
                  <Check size={16} />
                  {columnFilters.find((f) => f.id === "type")?.value || "Tipo"}
                </>
              ) : (
                "Tipo"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[300px]">
            <DropdownMenuRadioGroup
              // @ts-ignore
              value={columnFilters?.find((el) => el.id === "type")?.value || ""}
              onValueChange={(value) =>
                setColumnFilters((prevState) => {
                  const has = prevState?.find((el) => el.id === "type");
                  if (!has) {
                    return prevState.concat({ id: "type", value });
                  }
                  if (has.value === value) {
                    return prevState.filter((f) => f.id !== "type");
                  } else {
                    return prevState
                      .filter((f) => f.id !== "type")
                      .concat({ id: "type", value });
                  }
                })
              }
            >
              {Types.map((t, index) => {
                const selected =
                  columnFilters.find((f) => f.id === "type")?.value === t;
                return (
                  <DropdownMenuRadioItem
                    key={`${t}-${index}`}
                    value={t}
                    className="relative pl-8"
                  >
                    {/* Forzar el indicador manualmente */}
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                      {selected ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            t === TipoMovimiento.ENTRADA &&
                              "bg-green-500 hover:bg-green-600",
                            t === TipoMovimiento.SALIDA &&
                              "bg-orange-500 hover:bg-orange-600 ",
                            t === TipoMovimiento.AJUSTE &&
                              "bg-red-500 hover:bg-red-600",
                            t === TipoMovimiento.MERMA &&
                              "bg-red-500 hover:bg-red-600",
                            t === TipoMovimiento.CUENTA_CASA &&
                              "bg-pink-500 hover:bg-pink-600",
                            t === TipoMovimiento.VENTA &&
                              "bg-violet-500 hover:bg-violet-600",
                            t === TipoMovimiento.SALIDA_REVOLTOSA &&
                              "bg-yellow-500 hover:bg-yellow-600 text-black/80",
                            t === TipoMovimiento.TRANSFERENCIA &&
                              "bg-cyan-500 hover:bg-cyan-600 "
                          )}
                        />
                      )}
                    </span>
                    {t}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {table.getColumn("createdAt") && (
          <DatePickerWithRange column={table.getColumn("createdAt")} />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className=" flex gap-1">
              {columnFilters.find((f) => f.id === "user") ? (
                // @ts-ignore
                <>
                  <Check size={16} />
                  {columnFilters.find((f) => f.id === "user")?.value ||
                    "Usuario"}
                </>
              ) : (
                "Usuario"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[300px]">
            <DropdownMenuRadioGroup
              // @ts-ignore
              value={columnFilters?.find((el) => el.id === "user")?.value || ""}
              onValueChange={(value) =>
                setColumnFilters((prevState) => {
                  const has = prevState?.find((el) => el.id === "user");
                  if (!has) {
                    return prevState.concat({ id: "user", value });
                  }
                  if (has.value === value) {
                    return prevState.filter((f) => f.id !== "user");
                  } else {
                    return prevState
                      .filter((f) => f.id !== "user")
                      .concat({ id: "user", value });
                  }
                })
              }
            >
              {users.map((u, index) => (
                <DropdownMenuRadioItem key={`${u}-${index}`} value={u.username}>
                  {u.username}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="whitespace-nowrap"
                    style={{ maxWidth: `${header.column.getSize()}px` }}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "text-white",
                  row.getValue("type") === TipoMovimiento.ENTRADA &&
                    "bg-green-500 hover:bg-green-600",
                  row.getValue("type") === TipoMovimiento.SALIDA &&
                    "bg-orange-500 hover:bg-orange-600 ",
                  row.getValue("type") === TipoMovimiento.AJUSTE &&
                    "bg-red-500 hover:bg-red-600",
                  row.getValue("type") === TipoMovimiento.MERMA &&
                    "bg-red-500 hover:bg-red-600",
                  row.getValue("type") === TipoMovimiento.CUENTA_CASA &&
                    "bg-pink-500 hover:bg-pink-600",
                  row.getValue("type") === TipoMovimiento.VENTA &&
                    "bg-violet-500 hover:bg-violet-600",
                  row.getValue("type") === TipoMovimiento.SALIDA_REVOLTOSA &&
                    "bg-yellow-500 hover:bg-yellow-600 text-black/80",
                  row.getValue("type") === TipoMovimiento.TRANSFERENCIA &&
                    "bg-cyan-500 hover:bg-cyan-600 "
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="whitespace-nowrap"
                    style={{ maxWidth: `${cell.column.getSize()}px` }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados que mostrar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
