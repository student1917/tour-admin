'use client'
import {
  ColumnDef,
  PaginationState, 
  OnChangeFn
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { GenericTable } from "@/shared/GenericTable"
import { Review } from '@/types/review';
import { deleteReview } from '@/services/reviewService';
import { DeletePopup } from '@/app/popup/deletePopup';


interface Props {
    data: Review[]   
    total: number
    pagination: PaginationState
    onPaginationChange: OnChangeFn<PaginationState> 
    refetch?: () => void
  }

export function ReviewTable({ data, total, pagination, onPaginationChange, refetch }: Props) {

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);
    const [deletingId, setDeletingId] = useState<string>();
    const deletingReview = data.find(review => review._id === deletingId);

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            const res = await deleteReview(deletingId);
            if (res.success) {
                alert('Delete review successfully');
                await refetch();
            } else {
                alert('Delete review failed: ' + res.message);
            }
        } catch (error: unknown) {
            alert('Delete review failed: ' + (error as Error).message);
        } finally {
            setIsShowDeletePopup(false);
        }
    };

    const toggleSelect = (_id: string) => {
        setSelectedIds(prev => {
          const newSet = new Set(prev)
          if (newSet.has(_id)) newSet.delete(_id)
          else newSet.add(_id)
          return newSet
        })
      }    
      const toggleSelectAll = () => {
        if (selectedIds.size === data.length) setSelectedIds(new Set())
        else setSelectedIds(new Set(data.map(d => d._id)))
      }

    const columns = useMemo<ColumnDef<Review>[]>(() => [
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
          accessorKey: 'productId.title',
          cell: ({ getValue }) => {
              const value = getValue() as string;
              return <span className='clamp-1'>{value}</span>;
            }
        },
        {
            header: 'Review text',
            accessorKey: 'reviewText',
            cell: ({ getValue }) => {
                const value = getValue() as string;
                return <span className='clamp-1'>{value}</span>;
              }
          },
      
        {
          header: 'Rating',
          accessorKey: 'rating',
          cell: ({ getValue }) => {
            const value = getValue() as number;
            return <span className='text-[#667085]'>{value} <i className="ri-star-fill text-yellow-400"></i></span>
          }
        },
        {
          header: 'Ngày đăng',
          accessorKey: 'createdAt',
          cell: ({ getValue }) => {
            const date = new Date(getValue() as string)
            return <span className='text-[#667085]'>{date.toLocaleDateString('vi-VN')}</span>
          },
        },  
        {
          header: "Action",
          accessorKey: 'action',
          cell: ({row}) => {
            const review = row.original;
            return (
              <div className="flex gap-2">
                <button className="text-[#667085]"><i className="ri-eye-line"></i></button>
                <button className="text-[#667085]"><i className="ri-pencil-line"></i></button>
                <button onClick={() => { setIsShowDeletePopup(true); setDeletingId(review._id); }} className="text-[#667085]"><i className="ri-delete-bin-6-line"></i></button>
              </div>
            );
          },
        },
        ], [selectedIds, data])

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
                message={`Are you sure about deleting this review?`}
                onConfirm={handleDelete}
                onClose={() => setIsShowDeletePopup(false)}
            />
        )}
      </>
}