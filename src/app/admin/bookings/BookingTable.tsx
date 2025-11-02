'use client';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  PaginationState, 
  OnChangeFn
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { GenericTable } from "@/shared/GenericTable"
import { Booking } from '@/types/booking';


interface Props {
    data: Booking[]  
    total: number
    pagination: { pageIndex: number; pageSize: number }
    onPaginationChange: OnChangeFn<PaginationState>  
  }

export function BookingTable({ data, total, pagination, onPaginationChange }: Props) {

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const toggleSelect = (id: string) => {
      setSelectedIds(prev => {
        const newSet = new Set(prev)
        if (newSet.has(id)) newSet.delete(id)
        else newSet.add(id)
        return newSet
      })
    }    
    
      const toggleSelectAll = () => {
        if (selectedIds.size === data.length) setSelectedIds(new Set())
        else setSelectedIds(new Set(data.map(d => d._id)))
      }

    const columns = useMemo<ColumnDef<Booking>[]>(() => [
      {
          id: 'select',
          header: () => (
            <input
              type="checkbox"
              checked={selectedIds.size === data.length && data.length > 0}
              onChange={toggleSelectAll}
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={selectedIds.has(row.original._id)}
              onChange={() => toggleSelect(row.original._id)}
            />
          ),
      },
        {
          header: 'Guest Name',
          accessorKey: 'fullName',
          cell: ({ getValue }) => {      
            const value = getValue() as string;        
            return <span>{value}</span>
          },
        },

        {
          header: 'Tour Name',
          accessorKey: 'tourName',
          cell: ({ getValue }) => {      
            const value = getValue() as string;        
            return <span>{value}</span>
          },
        },
        // {
        //   header: 'Price',
        //   accessorKey: 'price',
        //   cell: ({ getValue }) => {
        //     const value = getValue() as number;
        //     return <span>{value.toLocaleString()} VND</span>
        //   },
        // },
        {
          header: 'Status',
          accessorKey: 'status',
          cell: ({ getValue }) => {
            type Status = 'pending' | 'confirmed' | 'cancelled' | 'paid';
            const value = getValue() as Status;
            const classname: Record<Status, string> = {
              pending: "px-2 py-1 bg-[#FFF7E6] text-[#D97706] rounded-xl",
              confirmed: "px-2 py-1 bg-[#E0F2FE] text-[#0284C7] rounded-xl",
              cancelled: "px-2 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-xl",
              paid: "px-2 py-1 bg-[#E7F4EE] text-[#0D894F] rounded-xl",
            };
            return <span className={classname[value]}>{value}</span>;
          }
          },        
        {
          header: "",
          accessorKey: 'action',
          cell: () => {
            return (
              <div className="flex gap-2">
                {/* <button className="text-[#667085]"><i className="ri-eye-line"></i></button> */}
                {/* <button className="text-[#667085]"><i className="ri-pencil-line"></i></button> */}
                {/* <button className="text-[#667085]"><i className="ri-delete-bin-6-line"></i></button> */}
              </div>
            );
          },
        },
      ], [selectedIds, data])

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      })

    return (
      <GenericTable
        data={data}
        columns={columns}
        total={total}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
      
      )
}