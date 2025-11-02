"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyVisits } from "@/services/dashboardService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);


export default function MonthlyLineChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthlyVisits"],
    queryFn: getMonthlyVisits,
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart</div>;

  const labels = data.days;
  const currentMonthData = data.currentMonth;
  const previousMonthData = data.previousMonth;

  const importantDays = [1, 5, 10, 15, 20, 25, 30];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tháng này",
        data: currentMonthData,
        borderColor: "#307AFD",
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return undefined;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#F6F7FA');
          gradient.addColorStop(0.5, '#EEF2FA');
          return gradient;
        },
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 1,
        order: 2,
      },
      {
        label: "Tháng trước",
        data: previousMonthData,
        borderColor: "#FFB226",
        fill: false,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 1,
        borderDash: [3, 3],
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = Number(context.raw);
            return value >= 1000 ? (value / 1000).toFixed(0) + "K" : value.toString();
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (val: any) => {
            const day = Number(val);
            if (importantDays.includes(day)) return day < 10 ? "0" + day : day.toString();
            return "";
          },
          maxRotation: 0,
          autoSkip: false,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5000,
          callback: (val: any) => {
            const num = Number(val);
            return num >= 1000 ? (num / 1000).toFixed(0) + "K" : num.toString();
          },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full mb-6 overflow-hidden">
      <div className="flex items-center gap-6">
        <h3 className="font-bold m-4 border-r pr-6 border-gray-300">User Overview</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full mr-1 bg-(--primary)"></div>
          <h6>This Month</h6>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full mr-1 bg-(--secondary)"></div>
          <h6>Last Month</h6>
        </div>
      </div>
      <Line options={options} data={chartData} className='max-h-[300px]' />
    </div>
  );
}
