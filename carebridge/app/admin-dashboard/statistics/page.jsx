"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Statistics = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("https://carebridge-backend-fys5.onrender.com/api/admin/donation-statistics", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch donation statistics");
        }
        return res.json();
      })
      .then((data) => {
        setData({
          labels: data.labels,
          datasets: [
            {
              label: "Total Donations ($)",
              data: data.values,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Donation Statistics" },
    },
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg text-black w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Donation Statistics</h2>
      {loading ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full h-96">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default Statistics;
