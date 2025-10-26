import api from "./api"
import { PaginatedReviews } from "@/types/review"

export async function getReviews(page: number, limit: number): Promise<PaginatedReviews> {
  const res = await api.get(`/review?page=${page}&limit=${limit}`)
  return res.data
}

export async function deleteReview(reviewId: string): Promise<{ success: boolean; message: string }> {
  const res = await api.delete(`/review/${reviewId}`)
  return res.data
}