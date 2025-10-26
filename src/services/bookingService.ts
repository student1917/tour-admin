import api from "./api";
import { PaginatedBookings } from "@/types/booking";

export async function getBookings(page:number, limit:number): Promise<PaginatedBookings>{
    const res = await api.get(`/booking?page=${page}&limit=${limit}`);
    return res.data
}