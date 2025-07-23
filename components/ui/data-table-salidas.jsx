"use client";

import {
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
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
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Check } from "lucide-react";

// TODO: Agregar filtro de fecha

export function DataTable({ columns, data, areas, productos }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    meta: { areas, productos },
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 5,
    },
    state: {
      sorting,
      columnFilters,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2 rounded-md border bg-white">
      {areas && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={areas.length < 1}>
            <Button variant="outline" size="sm" className="ml-auto flex gap-1">
              {columnFilters.find((f) => f.id === "destino") ? (
                <>
                  <Check size={16} />
                  {columnFilters.find((f) => f.id === "destino")?.value ||
                    "Almacén Revoltosa"}
                </>
              ) : (
                "Destino"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[300px]">
            <DropdownMenuRadioGroup
              value={
                columnFilters?.find((el) => el.id === "destino")?.value || ""
              }
              onValueChange={(value) =>
                setColumnFilters((prevState) => {
                  const has = prevState?.find((el) => el.id === "destino");
                  if (!has) {
                    return prevState.concat({
                      id: "destino",
                      value,
                    });
                  }
                  if (has.value === value) {
                    return prevState.filter((f) => f.id !== "destino");
                  } else {
                    return prevState
                      .filter((f) => f.id !== "destino")
                      .concat({ id: "destino", value });
                  }
                })
              }
            >
              <DropdownMenuRadioItem value="Almacén Revoltosa">
                Almacén Revoltosa
              </DropdownMenuRadioItem>
              {areas?.map((area) => (
                <DropdownMenuRadioItem key={area.id} value={area.nombre}>
                  {area.nombre}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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
      <DataTablePagination table={table} />
    </div>
  );
}
