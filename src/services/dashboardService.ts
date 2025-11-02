import api from "./api";
import { VisitStats, VisitStatsSummary, MonthlyRevenue } from "@/types/dashboard";

export const getVisitStats = async (): Promise<VisitStats> => {
  const res = await api.get<VisitStats>("/visit/stats");
  return res.data;
};

export const getVisitStatsSummary = async (): Promise<VisitStatsSummary> => {
  const res = await api.get<VisitStatsSummary>("/visit/stats/summary");
  return res.data;
};

export const getMonthlyRevenue = async (): Promise<MonthlyRevenue[]> => {
  const res = await api.get<MonthlyRevenue[]>("/payment/monthly");
  return res.data;
}

export const getTourCountsBySubregion = async () => {
  const res = await api.get("/tours/subregion-count");
  return res.data; 
};

export const getMonthlyVisits = async () => {
  const res = await api.get("/visit/stats/monthly");
  return res.data;
};
