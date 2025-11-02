"use client";
import FilterDropdown from '@/shared/Filter';
import React, { useState } from 'react'
import SearchBar from '../SearchBar'
import { UserTable } from './UserTable';
import { useQuery } from "@tanstack/react-query";
import { getUsers } from '@/services/userService';
import { PaginationState } from '@tanstack/react-table';
import { keepPreviousData } from "@tanstack/react-query"

const UsersPage = () => {
  const [filter, setFilter] = useState('')
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getUsers(pagination.pageIndex + 1, pagination.pageSize), 
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <div className="flex flex-col my-12 mx-6">
      <div id="title">
        <h1>Users Management</h1>
        <div className="flex justify-between items-end ">
          <div id="group__1" className='flex mt-2'>
            <h4 className='text-(--primary)'>Admin</h4>
            <i className="ri-arrow-right-s-line"></i>
            <h4>Users Management</h4>
          </div>
        </div>
      </div>

      <SearchBar 
        placeholder='Search users...'
        onSearch={()=>{}}
        filterSlot={
          <FilterDropdown
            options={[]}
            value={filter}
            onChange={setFilter}
          />
        }
      />

      <UserTable
        data={data?.data || []}
        total={data?.total || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        refetch={refetch}
      />
    </div>
  )
}

export default UsersPage
