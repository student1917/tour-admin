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
import { getTours, searchToursByName } from '@/services/tourService';
import { Tour} from '@/types/tour';

export default function Page() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('')
  const [tours, setTours] = useState<Tour[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const {data, isLoading, error} = useQuery({
    queryKey: ["tours", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getTours(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
    enabled: !searchTerm,

  })
  // const [filter, setFilter] = useState("");

  const { data: searchData, isFetching, refetch } = useQuery({
    queryKey: ["searchTours", searchTerm],
    queryFn: () => searchToursByName(searchTerm),
    enabled: !!searchTerm, 
  });

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    setSearchTerm(trimmed);
    if (trimmed === searchTerm) {
      refetch();
    }
  };

  useEffect(() => {
     console.log("searchData =", searchData);
    console.log("data =", data);
    if (searchTerm && searchData) {
      setTours(searchData);
    } else if (data) {
      setTours(data.data);
    }
  }, [searchTerm, searchData, data]);

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
              <h5 className='text-(--primary)'>Admin</h5>
              <i className="ri-arrow-right-s-line"></i>
              <h5>TOUR MANAGEMENT</h5>
            </div>
            <div id="group__btn" className='gap-2 flex'>
              {/* <button className=' flex bg-[#DEDEFA] text-(--primary) gap-2 p-2 rounded-md'>
                <i className="ri-upload-cloud-line"></i>
                <h4>Export File</h4>
              </button> */}
              <button onClick={handleAddTour} className="flex btn-primary text-white gap-2 p-2 rounded-md">
                <i className="ri-add-line"></i>
                <h4>Add tour</h4>
              </button>
            </div>
          </div>
        </div>

        <SearchBar 
          placeholder = 'Search tour by name...'
          onSearch={handleSearch}
          filterSlot={
            <FilterDropdown
            options={['Popular Categories','Display Coordinates','Pending Approval Status','Approved Status']}
            value={filter}
            onChange={setFilter}
            />
          }
        />
        {/* <TourTable
          data={data?.data || []}
          total={data?.total || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
        />      */}
        <TourTable
          data={tours || []}
          total={searchTerm ? (tours?.length ?? 0) : (data?.total ?? 0)}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
        </div>
      </>
  )
}

