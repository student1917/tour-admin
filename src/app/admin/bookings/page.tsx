"use client";
import React from 'react'
import SearchBar from '../SearchBar'
import { useQuery } from "@tanstack/react-query";
import { BookingTable } from './BookingTable';
import {useState} from 'react'
import AddCategoryPopup from './AddCategoryPopup'
import FilterDropdown from '@/shared/Filter';
import { keepPreviousData } from "@tanstack/react-query"
import { getBookings } from '@/services/bookingService';

export default function BookingPage() {

  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const {data, isLoading, error} = useQuery({
    queryKey: ["bookings", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getBookings(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <>
    {isOpen && <AddCategoryPopup onClose={()=>setIsOpen(false)}/>}
      <div className="flex flex-col my-12 mx-6">
        <div id="title">
          <h3>Booking Management</h3>
          <div className="flex justify-between items-end ">
            <div id="group__1" className='flex'>
              <h5 className='text-(--primary)'>Admin</h5>
              <i className="ri-arrow-right-s-line"></i>
              <h5>Booking Management</h5>
            </div>
            <div id="group__btn" className='gap-2 flex'>
            </div>
          </div>
        </div>

        <SearchBar 
          placeholder = 'Search bookings....'
          onSearch = {()=>{}}
          filterSlot={
            <FilterDropdown
            options={['Display Status','Max Number of Locations','Min Number of Locations','Hidden']}
            value={filter}
            onChange={setFilter}
            />
          }
          />

        <BookingTable 
          data={data?.data || []}
          total={data?.pagination.total || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
        />  
      </div>
    </>

  )
}

