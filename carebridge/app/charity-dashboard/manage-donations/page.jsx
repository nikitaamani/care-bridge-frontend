"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageDonations() {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [anonymousDonations, setAnonymousDonations] = useState(0);
  const [nonAnonymousDonations, setNonAnonymousDonations] = useState(0);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {

      const response = await axios.get("https://carebridge-backend-fys5.onrender.com/donations", {
        withCredentials: true,
      });
      setDonations(response.data);

      // Calculate totals
      const total = response.data.reduce((sum, donation) => sum + donation.amount, 0);
      const anonymous = response.data
        .filter((donation) => donation.is_anonymous)
        .reduce((sum, donation) => sum + donation.amount, 0);
      const nonAnonymous = total - anonymous;

      // Update state
      setTotalDonations(total);
      setAnonymousDonations(anonymous);
      setNonAnonymousDonations(nonAnonymous);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Donations</h1>

      {/* Totals Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl">${totalDonations.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Anonymous Donations</h2>
          <p className="text-2xl">${anonymousDonations.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Non-Anonymous Donations</h2>
          <p className="text-2xl">${nonAnonymousDonations.toFixed(2)}</p>
        </div>
      </div>

      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Donor Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {donation.is_anonymous ? "Anonymous" : donation.donor_name}
                </td>
                <td className="py-2 px-4 border-b">${donation.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}