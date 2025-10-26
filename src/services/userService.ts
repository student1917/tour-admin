import api from "./api";
import { User } from "@/types/user";

export interface PaginatedUsers {
  success: boolean;
  total: number;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  data: User[];
}

export async function getUsers(page: number, limit: number): Promise<PaginatedUsers> {
  const res = await api.get(`/users?page=${page}&limit=${limit}`);
  return res.data;
}

export async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  const res = await api.delete(`/users/${userId}`);
  return res.data;
}