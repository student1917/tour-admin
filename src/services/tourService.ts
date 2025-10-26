import { FormType, Tour } from "@/types/tour"
import api from "./api"
import axios from "axios";

export async function getTours(pageIndex: number, pageSize: number): Promise<{ data: Tour[], total: number }> {
  const res = await api.get(`/tours?page=${pageIndex}&limit=${pageSize}`)
  return {
    data: res.data.data,   
    total: res.data.total, 
  }
}

export async function getCountriesByName(name:string) {
  const res = await api.get(`/tours/country?name=${encodeURIComponent(name)}`);
  return res.data.data
}

export async function getTourById(id:string) {
  const res = await api.get(`/tours/${id}`);
  return res.data.data;
}

export async function updateTourById(id:string, tour: FormType): Promise<{data:Tour}>{
  const res = await api.put(`/tours/${id}`, tour);
  return res.data.data;
}
export async function createTour(tour: FormType): Promise<{data:Tour}> {
  const res = await api.post(`/tours`, tour);
  return res.data
}

export async function deleteTour(id:string): Promise<{success:boolean; message?:string}> {
  const res = await api.delete(`/tours/${id}`);
  return res.data
}

export async function getVisibleTours(pageIndex: number, pageSize: number): Promise<{ data: Tour[], total: number }> {
  const res = await api.get(`/tours/visible?page=${pageIndex}&limit=${pageSize}`);
  return {
    data: res.data.data,
    total: res.data.total, 
  }
}
export const uploadImages = async (files: File[]): Promise<{ images: { url: string; public_id: string }[] }> => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));

  const res = await axios.post('http://localhost:4000/api/v1/uploading/upload-gallery', formData);

  if (res.data.success) {
    return {
      images: res.data.images.map((img: { url: string; public_id: string }) => ({
        url: img.url,
        public_id: img.public_id,
      })),
    };
  } else {
    throw new Error('Upload gallery failed');
  }
};

export async function deleteImage(publicId: string): Promise<{ success: boolean; message: string }> {
  const res = await api.delete(`/upload/${publicId}`);
  return res.data;
}