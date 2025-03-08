"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

// Dashboard Card Component (Replaces Missing Card)
const DashboardCard = ({ title, value, color }) => (
  <div className="p-4 shadow-lg bg-white text-center rounded-lg border border-gray-200">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className={`text-2xl font-bold ${color}`}>
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

const HomePage = () => {
  // State for dynamic data
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeBeneficiaries: 0,
    impactStories: 0,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dashboard-stats") // Change if hosted
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      setTimeout(() => {
        setStats({
          totalDonations: 50000,
          activeBeneficiaries: 120,
          impactStories: 35,
        });
      }, 1000);
  }, []);

  

  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Charity Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Total Donations"
          value={`$${stats.totalDonations}`}
          color="text-green-600"
        />
        <DashboardCard
          title="Active Beneficiaries"
          value={stats.activeBeneficiaries}
          color="text-blue-600"
        /><DashboardCard
        title="Impact Stories"
        value={stats.impactStories}
        color="text-purple-600"
      />
      </div>

      {/* Sample Button (Replace Missing Button Component)  */}
      <div className="text-center mt-6">
        <Link href="/donate">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Make a Donation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
