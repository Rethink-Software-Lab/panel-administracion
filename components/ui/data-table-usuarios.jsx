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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Check } from 'lucide-react';

export function DataTable({ columns, data, areas }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    areas,
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

  const ROLES = {
    ADMIN: 'Administrador',
    ALMACENERO: 'Almacenero',
    VENDEDOR: 'Vendedor',
  };

  return (
    <div className="p-2 rounded-md border bg-white">
      <div className="flex items-center justify-between pt-2 pb-4 gap-4">
        <div className="flex gap-2">
          <Input
            className="max-w-60"
            value={
              columnFilters?.find((el) => el.id === 'username')?.value || ''
            }
            onChange={(e) =>
              setColumnFilters((prevState) => {
                const has = prevState?.find((el) => el.id === 'username');
                if (!has) {
                  return prevState.concat({
                    id: 'username',
                    value: e.target.value,
                  });
                }
                return prevState
                  .filter((f) => f.id !== 'username')
                  .concat({
                    id: 'username',
                    value: e.target.value,
                  });
              })
            }
            placeholder="Filtrar por nombre"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto flex gap-1"
              >
                {columnFilters.find((f) => f.id === 'rol') ? (
                  <>
                    <Check size={16} />
                    {ROLES[columnFilters.find((f) => f.id === 'rol')?.value] ||
                      'Rol'}
                  </>
                ) : (
                  'Rol'
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[300px]">
              <DropdownMenuRadioGroup
                value={
                  columnFilters?.find((el) => el.id === 'rol')?.value || ''
                }
                onValueChange={(value) =>
                  setColumnFilters((prevState) => {
                    const has = prevState?.find((el) => el.id === 'rol');
                    if (!has) {
                      return prevState.concat({ id: 'rol', value });
                    }
                    if (has.value === value) {
                      return prevState.filter((f) => f.id !== 'rol');
                    } else {
                      return prevState
                        .filter((f) => f.id !== 'rol')
                        .concat({ id: 'rol', value });
                    }
                  })
                }
              >
                {Object.keys(ROLES).map((rol) => (
                  <DropdownMenuRadioItem key={rol} value={rol}>
                    {ROLES[rol]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={!areas || areas.length < 1}>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto flex gap-1"
              >
                {columnFilters.find((f) => f.id === 'area_venta') ? (
                  <>
                    <Check size={16} />
                    {columnFilters.find((f) => f.id === 'area_venta')?.value}
                  </>
                ) : (
                  'Área de venta'
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[300px]">
              <DropdownMenuRadioGroup
                value={
                  columnFilters?.find((el) => el.id === 'area_venta')?.value ||
                  ''
                }
                onValueChange={(value) =>
                  setColumnFilters((prevState) => {
                    const has = prevState?.find((el) => el.id === 'area_venta');
                    if (!has) {
                      return prevState.concat({ id: 'area_venta', value });
                    }
                    if (has.value === value) {
                      return prevState.filter((f) => f.id !== 'area_venta');
                    } else {
                      return prevState
                        .filter((f) => f.id !== 'area_venta')
                        .concat({ id: 'area_venta', value });
                    }
                  })
                }
              >
                {areas?.map((area) => (
                  <DropdownMenuRadioItem key={area.id} value={area.nombre}>
                    {area.nombre}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                data-state={row.getIsSelected() && 'selected'}
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
