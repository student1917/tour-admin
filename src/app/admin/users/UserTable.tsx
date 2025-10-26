'use client'
import { ColumnDef, PaginationState, OnChangeFn } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { GenericTable } from "@/shared/GenericTable"
import { User } from '@/types/user'
import { useRouter } from "next/navigation";
import { DeletePopup } from '@/app/popup/deletePopup'
import { deleteUser } from '@/services/userService'

interface Props {
  data: User[]
  total: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  refetch: () => void
}

export function UserTable({ data, total, pagination, onPaginationChange, refetch }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const deletingUser = data.find(user => user._id === deletingId);

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
      const res = await deleteUser(deletingId);
      if(res.success) {
        alert('Delete user successfully');
        await refetch(); 
      } else {
        alert('Delete user failed: ' + res.message);
      }
    } catch (error: unknown) {
      alert('Delete user failed: ' + (error as Error).message);
    } finally {
      setIsShowDeletePopup(false);
    }
  }


  const columns = useMemo<ColumnDef<User>[]>(() => [
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
      header: 'Tên Tài khoản',
      accessorKey: 'username',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <img
              src={user?.photo || 'https://i.pinimg.com/1200x/e1/1e/07/e11e07774f7fc24da8e03e769a0f0573.jpg'}
              alt=""
              className='h-6 w-6 object-cover rounded-full'
            />
            <span className='clamp-1'>{user.username}</span>
          </div>
        )
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return <span className='text-[#667085]'>{date.toLocaleDateString('vi-VN')}</span>
      },
    },
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => router.push(`users/${user._id}`)}><i className="ri-eye-line"></i></button>
            <button><i className="ri-pencil-line"></i></button>
            <button onClick={()=> {setIsShowDeletePopup(true); setDeletingId(user._id)}}><i className="ri-delete-bin-6-line"></i></button>
          </div>
        )
      },
    },
  ], [selectedIds, data]);



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
          message={`Are you sure about deleting user ${deletingUser?.username}?`}
          onConfirm={handleDelete}
          onClose={() => setIsShowDeletePopup(false)}
        />
      )}
  </>
}
