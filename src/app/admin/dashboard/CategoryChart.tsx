"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getTourCountsBySubregion } from "@/services/dashboardService";
ChartJS.register(ArcElement, Tooltip, Legend);


const CategoryChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tourSubregionCounts"],
    queryFn: getTourCountsBySubregion,
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart</div>;

  const totalCounts = data.reduce((sum, item) => sum + item.count, 0);
  const labels = data.map((item) => item.subregion);
  const counts = data.map((item) => item.count);

  const colors = [
    "#AEC6CF",
    "#FFD1DC",
    "#C1E1C1",
    "#FFB347",
    "#B19CD9",
    "#FF6961",
    "#77DD77",
    "#FDFD96",
    "#84B6F4",
    "#FFB5E8",
  ];

  const pieData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: colors.slice(0, counts.length),
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "50%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percent = ((value / totalCounts) * 100).toFixed(1);
            return `${value} (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <>
      <h4 className="m-4 font-bold">Tours by Subregion</h4>
      <div className="flex w-full items-center justify-center">
        <div className="w-[30%]">
          <Pie data={pieData} options={options} />
        </div>

        <div className="ml-8">
          {data.map((item, idx) => {
            const percent = ((item.count / totalCounts) * 100).toFixed(1);
            return (
              <div
                key={item.subregion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{
                    backgroundColor: colors[idx],
                  }}
                />
                <div className="w-30">{item.subregion}</div>
                <div>{percent}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryChart;
