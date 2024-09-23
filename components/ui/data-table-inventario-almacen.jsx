'use client';

import {
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center justify-between pt-2 pb-4 gap-4">
        <div className="flex gap-2">
          <Input
            className="max-w-60"
            value={columnFilters?.find((el) => el.id === 'id')?.value || ''}
            onChange={(e) =>
              setColumnFilters((prevState) => {
                const has = prevState?.find((el) => el.id === 'id');
                if (!has) {
                  return prevState.concat({
                    id: 'id',
                    value: e.target.value,
                  });
                }
                return prevState
                  .filter((f) => f.id !== 'id')
                  .concat({
                    id: 'id',
                    value: e.target.value,
                  });
              })
            }
            placeholder="Filtrar por ID"
          />
          <Input
            className="max-w-60"
            value={
              columnFilters?.find((el) => el.id === 'info__codigo')?.value || ''
            }
            onChange={(e) =>
              setColumnFilters((prevState) => {
                const has = prevState?.find((el) => el.id === 'info__codigo');
                if (!has) {
                  return prevState.concat({
                    id: 'info__codigo',
                    value: e.target.value,
                  });
                }
                return prevState
                  .filter((f) => f.id !== 'info__codigo')
                  .concat({
                    id: 'info__codigo',
                    value: e.target.value,
                  });
              })
            }
            placeholder="Filtrar por Código"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
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
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
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
