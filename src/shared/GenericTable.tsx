'use client'
import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  OnChangeFn 
} from '@tanstack/react-table'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { TablePagination } from "@/shared/TablePagination"

interface GenericTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  total: number
  pagination: PaginationState
 onPaginationChange: OnChangeFn<PaginationState>
}

export function GenericTable<T>({
  data,
  columns,
  total,
  pagination,
  onPaginationChange,
}: GenericTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pagination.pageSize),
    state: { pagination },
    manualPagination: true, 
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  )
}
