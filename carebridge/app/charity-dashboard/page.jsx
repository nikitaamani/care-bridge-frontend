"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  // State for dynamic data 
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeBeneficiaries: 0,
    impactStories: 0,
  });

  useEffect(() => {
    // Simulating API call (Replace this with real fetch)
    setTimeout(() => {
      setStats({
        totalDonations: 50000,
        activeBeneficiaries: 120,
        impactStories: 35,
      });
    }, 1000);
  }, []);
  const DashboardCard = ({ title, value, color }) => (
    <Card className="p-4 shadow-lg bg-white text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </Card>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Charity Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Total Donations" value={`$${stats.totalDonations}`} color="text-green-600" />
        <DashboardCard title="Active Beneficiaries" value={stats.activeBeneficiaries} color="text-blue-600" />
        <DashboardCard title="Impact Stories" value={stats.impactStories} color="text-purple-600" />
      </div>

     
    </div>
  );
};

export default HomePage;
