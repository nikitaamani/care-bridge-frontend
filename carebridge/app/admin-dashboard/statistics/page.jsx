"use client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Total Donations ($)",
      data: [5000, 12000, 8000, 15000],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allows height to be set manually
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Donation Statistics" },
  },
};

export default function Statistics() {
  return (
    <div className="p-6 bg-white shadow rounded-lg text-black w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Donation Statistics</h2>
      <div className="w-full h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
