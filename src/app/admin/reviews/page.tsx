"use client";
import FilterDropdown from '@/shared/Filter';
import React, {useState} from 'react'
import SearchBar from '../SearchBar'
import { ReviewTable } from './ReviewTable';
import { useQuery } from "@tanstack/react-query";   
import { keepPreviousData } from "@tanstack/react-query"    
import { getReviews } from '@/services/reviewService';  
import { PaginationState } from '@tanstack/react-table';

const Page = () => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [filter, setFilter] = useState('')

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getReviews(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (

      <div className="flex flex-col my-12 mx-6">
        <div id="title">
          <h3>QUẢN LÝ ĐÁNH GIÁ, BÌNH LUẬN</h3>
          <div className="flex justify-between items-end ">
            <div id="group__1" className='flex'>
              <h5>Admin</h5>
              <i className="ri-arrow-right-s-line"></i>
              <h5>QUẢN LÝ ĐÁNH GIÁ, BÌNH LUẬN</h5>
            </div>

          </div>
        </div>

        <SearchBar 
          placeholder = 'Tìm kiếm reviews....'
          onSearch = {()=>{}}
          filterSlot={
            <FilterDropdown
            options={['Trạng thái đã duyệt','Trạng thái chưa duyệt', 'Mới nhất', 'Cũ nhất' ]}
            value={filter}
            onChange={setFilter}/>
          }
          />

        <ReviewTable
          data={data?.data || []}
          total={data?.pagination?.total || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          refetch={refetch}
        />
      </div>
  )
}

export default Page