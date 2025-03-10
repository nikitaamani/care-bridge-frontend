"use client";

import React, { useEffect, useState } from "react";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function AdminPage() {
  const [stats, setStats] = useState({ charities: 0, donations: 0, users: 0 });
  const [donationData, setDonationData] = useState({ labels: [], datasets: [] });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch("https://carebridge-backend-fys5.onrender.com/api/stats");
        if (!statsRes.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsRes.json();
        setStats(statsData);

        const donationRes = await fetch("https://carebridge-backend-fys5.onrender.com/api/donation-data");
        if (!donationRes.ok) throw new Error("Failed to fetch donation data");
        const donationData = await donationRes.json();
        setDonationData({
          labels: donationData.labels,
          datasets: [
            {
              label: "Donations ($)",
              data: donationData.values,
              backgroundColor: "#F55920",
              borderRadius: 5,
            },
          ],
        });

        const activitiesRes = await fetch("https://carebridge-backend-fys5.onrender.com/api/recent-activities");
        if (!activitiesRes.ok) throw new Error("Failed to fetch activities");
        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-200 mt-2">
          Manage charities, track donations, and oversee user activities.
        </p>
        <button className="mt-4 bg-[#F55920] hover:bg-[#e64b1a] text-white px-4 py-2 rounded flex items-center">
          Welcome
          <RiArrowRightSLine className="ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiUserHeartFill className="text-[#F55920] text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Charities</h2>
            <p className="text-gray-600">{stats.charities} Registered</p>
          </div>
        </div>

        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiMoneyDollarCircleFill className="text-green-500 text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Donations</h2>
            <p className="text-gray-600">${stats.donations} Raised</p>
          </div>
        </div>

        <div className="shadow-md bg-white p-4 rounded-lg flex items-center">
          <RiGroupFill className="text-blue-500 text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-600">{stats.users} Active Users</p>
          </div>
        </div>
      </div>

      <div className="shadow-md bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Donation Growth</h2>
        <Bar data={donationData} />
      </div>

      <div className="shadow-lg bg-gradient-to-r from-[#323A5E] to-[#202952] text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <ul className="space-y-4 mt-4">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 rounded-md bg-gray-700 text-white"
            >
              {/* Conditionally render based on activity type */}
              {activity.type === "donation" ? (
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold">Name: {activity.donor_name}</span>
                  <span>Amount: {`$${activity.amount}`}</span>
                  <span>Status: {activity.status}</span>
                  <span className="text-sm text-gray-400">Date: {activity.start_date}</span>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold">Name: {activity.name}</span>
                  <span>Status: {activity.status}</span>
                  <span className="text-sm text-gray-400">Created at: {activity.created_at}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
