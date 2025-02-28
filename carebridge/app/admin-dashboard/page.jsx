"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  RiUserHeartFill,
  RiMoneyDollarCircleFill,
  RiGroupFill,
  RiArrowRightSLine,
} from "react-icons/ri";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function AdminPage() {
  // Sample data for donation progress
  const donationData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Donations ($)",
        data: [1200, 2300, 1800, 2500, 3000, 4000],
        backgroundColor: "#F55920",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Hero Section */}
      <div className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-200 mt-2">
          Manage charities, track donations, and oversee user activities.
        </p>
        <button className="mt-4 bg-[#F55920] hover:bg-[#e64b1a] text-white px-4 py-2 rounded flex items-center">
          Get Started
          <RiArrowRightSLine className="ml-2" />
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Charities */}
        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiUserHeartFill className="text-[#F55920] text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Charities</h2>
            <p className="text-gray-600">120 Registered</p>
          </div>
        </div>

        {/* Donations */}
        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiMoneyDollarCircleFill className="text-green-500 text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Donations</h2>
            <p className="text-gray-600">$500,000 Raised</p>
          </div>
        </div>

        {/* Users */}
        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiGroupFill className="text-blue-500 text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-600">3,200 Active Users</p>
          </div>
        </div>
      </div>

      {/* Donation Progress */}
      <div className="shadow-md bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Donation Growth</h2>
        <Bar data={donationData} />
      </div>

      {/* Recent Activities */}
      <div className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <ul className="space-y-2 mt-4">
          <li className="flex items-center justify-between">
            <span>New charity application received</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>User John Doe donated $100</span>
            <span className="text-sm text-gray-400">1 day ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Charity XYZ posted a new success story</span>
            <span className="text-sm text-gray-400">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
