'use client'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from "next/navigation";
import { useMemo, useState } from 'react'
import { GenericTable } from "@/shared/GenericTable"
import { Tour } from '@/types/tour'
import { OnChangeFn, PaginationState } from '@tanstack/react-table'
import { deleteTour } from '@/services/tourService'
import { DeletePopup } from '@/app/popup/deletePopup';

interface Props {
  data: Tour[]
  total: number
  pagination: { pageIndex: number; pageSize: number }
  onPaginationChange: OnChangeFn<PaginationState>
  refetch: () => void
}

export function TourTable({ data, total, pagination, onPaginationChange, refetch }: Props) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const deletingTour = data.find(tour => tour._id === deletingId);

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

  const handleDelete = async() => {    
      if(!deletingId) return;
      try {
        const res = await deleteTour(deletingId);
        if(res.success) {
          alert('Delete tour successfully');
          await refetch();
        } else {
          alert('Delete tour failed: ' + res.message);
        }
      } catch (error: unknown) {
        alert('Delete tour failed: ' + (error as Error).message);
      } finally {
        setIsShowDeletePopup(false);
      }
    }
  

  const columns = useMemo<ColumnDef<Tour>[]>(() => [
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
      header: 'Tour',
      accessorKey: 'title',
      cell: ({ row }) => {
        const tour = row.original
        return (
          <div className="flex gap-3">
            <img
              src={tour.photos?.[0]?.url || "/default.jpg"}
              alt=""
              className="h-10 w-10 object-cover rounded-md"
            />
            <span className="clamp-1">{tour.title}</span>
            {tour.featured && (
              <span className="text-sm bg-yellow-200 text-yellow-600 px-3 rounded-2xl h-6 content-center font-bold ">Featured</span>
            )}
          </div>
        )
      },
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => <span>{row.original.price}</span>,
    },
    {
      header: 'Booking Count',
      accessorKey: 'bookingCount',
      cell: ({ row }) => <span>{row.original.bookingCount}</span>,
    },
    {
      header: 'Location',
      accessorKey: 'city',
      cell: ({ row }) => <span>{row.original.city}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'isVisible',
      cell: ({ row }) => <span className={`${row.original.isVisible ? 'bg-green-100 text-green-600 px-2 rounded-xl font-bold py-1' : 'bg-red-100 text-red-600 px-2 rounded-xl font-bold py-1'}`}>{row.original.isVisible ? 'Visible' : 'Hidden'}</span>,
    },
    {
      header: "",
      accessorKey: 'action',
      cell: ({ row }) => {
        const tour = row.original
        return (
          <div className="flex gap-2">
            {/* <button onClick={() => router.push(`/admin/tours/${tour._id}`)} className="text-[#667085]"><i className="ri-eye-line"></i></button> */}
            <button onClick={() => router.push(`/admin/tours/addTour?id=${tour._id}`)} className="text-[#667085]"><i className="ri-pencil-line"></i></button>
            <button  onClick={()=> {setIsShowDeletePopup(true); setDeletingId(tour._id)}} className="text-[#667085]"><i className="ri-delete-bin-6-line"></i></button>
          </div>
        )
      },
    },
  ], [selectedIds, data, router])

  return <>
    <GenericTable
      data={data}
      columns={columns}
      total={total}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
    {isShowDeletePopup && (
      <DeletePopup
        message={`Are you sure about deleting tour ${deletingTour?.title}?`}
        onConfirm={handleDelete}
        onClose={() => setIsShowDeletePopup(false)}
      />
    )}
  </>
}
