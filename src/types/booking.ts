// types/booking.ts
export interface Booking {
  _id: string;
  userId?: string;
  tourName: string;
  fullName: string;
  guestSize: number;
  phone: string;
  bookAt?: string; 
  status: "pending" | "confirmed" | "cancelled" | "paid";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedBookings {
  success: boolean;
  message: string;
  data: Booking[];
  pagination: PaginationMeta;
}
