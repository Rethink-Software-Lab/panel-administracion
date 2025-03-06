'use client';

import {
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnDef,
  TableOptions,
  SortingState,
  ColumnFiltersState,
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
import { Categoria } from '@/app/(with-layout)/categorias/types';
import { ProductInfo } from '@/app/(with-layout)/products/types';

export interface CustomTableOptions<T> extends TableOptions<T> {
  categorias: Categoria[];
}

interface Props {
  columns: ColumnDef<ProductInfo>[];
  data: ProductInfo[];
  categorias: Categoria[];
}

export function DataTable({ columns, data, categorias }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    categorias,
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
  } as CustomTableOptions<ProductInfo>);

  return (
    <div className="p-2 rounded-md border bg-white">
      <div className="flex items-center justify-between pt-2 pb-4 gap-4">
        <div className="flex gap-2">
          <Input
            className="max-w-60"
            value={
              (columnFilters?.find((el) => el.id === 'codigo')
                ?.value as string) || ''
            }
            onChange={(e) =>
              setColumnFilters((prevState) => {
                const has = prevState?.find((el) => el.id === 'codigo');
                if (!has) {
                  return prevState.concat({
                    id: 'codigo',
                    value: e.target.value,
                  });
                }
                return prevState
                  .filter((f) => f.id !== 'codigo')
                  .concat({
                    id: 'codigo',
                    value: e.target.value,
                  });
              })
            }
            placeholder="Filtrar por Código"
          />
          <Input
            className="max-w-60"
            value={
              (columnFilters?.find((el) => el.id === 'descripcion')
                ?.value as string) || ''
            }
            onChange={(e) =>
              setColumnFilters((prevState) => {
                const has = prevState?.find((el) => el.id === 'descripcion');
                if (!has) {
                  return prevState.concat({
                    id: 'descripcion',
                    value: e.target.value,
                  });
                }
                return prevState
                  .filter((f) => f.id !== 'descripcion')
                  .concat({
                    id: 'descripcion',
                    value: e.target.value,
                  });
              })
            }
            placeholder="Filtrar por Descripción"
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
                {columnFilters.find((f) => f.id === 'categoria') && (
                  <Check size={16} />
                )}
                Categoría
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[300px]">
              <DropdownMenuRadioGroup
                value={
                  (columnFilters?.find((el) => el.id === 'categoria')
                    ?.value as string) || ''
                }
                onValueChange={(value) =>
                  setColumnFilters((prevState) => {
                    const has = prevState?.find((el) => el.id === 'categoria');
                    if (!has) {
                      return prevState.concat({ id: 'categoria', value });
                    }
                    if (has.value === value) {
                      return prevState.filter((f) => f.id !== 'categoria');
                    } else {
                      return prevState
                        .filter((f) => f.id !== 'categoria')
                        .concat({ id: 'categoria', value });
                    }
                  })
                }
              >
                {categorias?.map((categoria) => (
                  <DropdownMenuRadioItem
                    key={categoria.id}
                    value={categoria.nombre}
                  >
                    {categoria.nombre}
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
