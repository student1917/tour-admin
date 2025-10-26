import api from "./api";
import { VisitStats } from "@/types/dashboard";

export const getVisitStats = async (): Promise<VisitStats> => {
  const res = await api.get<VisitStats>("/visit/stats");
  return res.data;
};