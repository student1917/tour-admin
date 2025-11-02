"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyRevenue } from "@/services/dashboardService";
import { MonthlyRevenue } from "@/types/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyRevenueBarChart: React.FC = () => {
  const { data, isLoading, error } = useQuery<MonthlyRevenue[]>({
    queryKey: ["monthlyRevenue"],
    queryFn: getMonthlyRevenue,
  });

  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dataValues: number[] = Array(12).fill(0);

  if (data) {
    data.forEach((item) => {
      dataValues[item.month - 1] = item.totalRevenue;
    });
  }

  const colors = [
    "#2C2C2C",
    "#3A3A3A",
    "#474747",
    "#555555",
    "#636363",
    "#717171",
    "#808080",
    "#8E8E8E",
    "#9C9C9C",
    "#AAAAAA",
    "#B8B8B8",
    "#C6C6C6",
  ];

  const barData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: dataValues,
        backgroundColor: colors,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
    responsive: true,
    animation: { duration: 1500, easing: "easeOutQuart" },
    resizeDelay: 200,
    plugins: {
      legend: { display: false, position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            if (typeof value !== "number") return "";
            return value >= 1000 ? (value / 1000).toFixed(1) + "k" : value.toString();
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 12,
          autoSkip: false,
          maxRotation: 30,
          minRotation: 0,
          font: { family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", size: 11, weight: "normal" },
          color: "#00000066",
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 5,
          autoSkip: false,
          font: { family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", size: 14, weight: "bold" },
          callback: (value) => {
            const num = Number(value);
            return num >= 1000 ? num / 1000 + "K" : num;
          },
          color: "#00000066",
        },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="w-full">
      <h3 className="m-4 font-bold">Monthly Revenue</h3>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default MonthlyRevenueBarChart;
