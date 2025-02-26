"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <Card className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome to the Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-200">
            Manage charities, track donations, and oversee user activities.
          </p>
          <Button className="mt-4 bg-[#F55920] hover:bg-[#e64b1a]">
            Get Started
            <RiArrowRightSLine className="ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Charities */}
        <Card className="shadow-md">
          <CardContent className="flex items-center p-4">
            <RiUserHeartFill className="text-[#F55920] text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Charities</h2>
              <p className="text-gray-600">120 Registered</p>
            </div>
          </CardContent>
        </Card>

        {/* Donations */}
        <Card className="shadow-md">
          <CardContent className="flex items-center p-4">
            <RiMoneyDollarCircleFill className="text-green-500 text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Total Donations</h2>
              <p className="text-gray-600">$500,000 Raised</p>
            </div>
          </CardContent>
        </Card>

        {/* Users */}
        <Card className="shadow-md">
          <CardContent className="flex items-center p-4">
            <RiGroupFill className="text-blue-500 text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Users</h2>
              <p className="text-gray-600">3,200 Active Users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Progress */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Donation Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={donationData} />
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>New charity application received</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>User John Doe donated $100</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Charity XYZ posted a new success story</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
