"use client";
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import React from 'react'
import SearchBar from '../SearchBar'
import { TourTable } from './TourTable';
import AddTour from './AddTour'
import FilterDropdown from '@/shared/Filter';
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query"  
import { getTours } from '@/services/tourService';
import { Tour} from '@/types/tour';

export default function Page() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('')
  const [tours, setTours] = useState<Tour[]>([])
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const {data, isLoading, error} = useQuery({
    queryKey: ["tours", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getTours(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,

  })
  
  // useEffect(() => {
  //   if (data) setTours(data);
  // }, [data]);

  // const handleSearch = async (value: string) => {
  //   try {
  //     const res = await api.get(`/tours/search?name=${encodeURIComponent(value)}`);
  //     setTours(res.data.data); 
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const handleClosePopup = () => {
  //   setIsOpen(false);    
  // }

  const handleAddTour = () => {
    router.push('/admin/tours/addTour');
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <>      
      <div className="flex flex-col my-12 mx-6">
        <div id="title">
          <h3>TOUR MANAGEMENT</h3>
          <div className="flex justify-between items-end ">
            <div id="group__1" className='flex'>
              <h5>Admin</h5>
              <i className="ri-arrow-right-s-line"></i>
              <h5>TOUR MANAGEMENT</h5>
            </div>
            <div id="group__btn" className='gap-2 flex'>
              <button className=' flex bg-[#DEDEFA] text-(--primary) gap-2 p-2 rounded-md'>
                <i className="ri-upload-cloud-line"></i>
                <h4>Xuất file</h4>
              </button>
              <button onClick={handleAddTour} className="flex btn-primary text-white gap-2 p-2 rounded-md">
                <i className="ri-add-line"></i>
                <h4>Add tour</h4>
              </button>
            </div>
          </div>
        </div>

        <SearchBar 
          placeholder = 'Tìm kiếm địa điểm....'
          // onSearch={handleSearch}
          filterSlot={
            <FilterDropdown
            options={['Danh mục phổ biến','Toạ độ hiện thị','Trạng thái chờ duyệt','Trạng thái đã duyệt']}
            value={filter}
            onChange={setFilter}
            />
          }
        />
        <TourTable
          data={data?.data || []}
          total={data?.total || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
        />     
        </div>
      </>
  )
}

