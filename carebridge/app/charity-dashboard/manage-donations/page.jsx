"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageDonations = ({ apiUrl = "" }) => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filter, setFilter] = useState({ date: "", amount: "", type: "" });
  const [balance, setBalance] = useState(50000); // Dummy balance
  const charityId = "charity_1"; // Replace with dynamic charity ID

  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setDonations(data);
          setFilteredDonations(data);
        })
        .catch((error) => console.error("Error fetching donations:", error));
    }
  }, [apiUrl]);

  useEffect(() => {
    const filtered = donations.filter((donation) => {
      return (
        (filter.date ? donation.date === filter.date : true) &&
        (filter.amount ? Number(donation.amount) === Number(filter.amount) : true) &&
        (filter.type ? donation.type.toLowerCase().includes(filter.type.toLowerCase()) : true)
      );
    });
    setFilteredDonations(filtered);
  }, [filter, donations]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleWithdraw = async () => {
    const amount = prompt("Enter amount to withdraw:");
    if (!amount || isNaN(amount) || amount <= 0) return alert("Invalid amount!");
    if (amount > balance) return alert("Insufficient funds!");

    try {
      const { data } = await axios.post("https://carebridge-backend-fys5.onrender.com/api/withdraw", {
        charity_id: charityId,
        amount: parseFloat(amount),
      });

      if (data.success) {
        alert(`Withdrawal successful! New balance: $${data.new_balance}`);
        setBalance(data.new_balance); // Update balance
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Failed to withdraw funds.");
    }
  };

  return (
    <div className="p-6 bg-[#323A5E] min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Manage Donations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center w-full">
        {[
          { label: "Date", name: "date", type: "date" },
          { label: "Amount", name: "amount", type: "number" },
          { label: "Type", name: "type", type: "text" },
        ].map(({ label, name, type }) => (
          <input
            key={name}
            name={name}
            value={filter[name]}
            type={type}
            onChange={handleFilterChange}
            placeholder={label}
            className="px-4 py-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
        ))}
      </div>

      {/* Donation List */}
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-[#202952] text-white">
              {"Amount,Donor Name,Date,Type".split(",").map((heading) => (
                <th key={heading} className="py-3 px-6 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">${donation.amount}</td>
                  <td className="py-3 px-6">{donation.donorName}</td>
                  <td className="py-3 px-6">{donation.date}</td>
                  <td className="py-3 px-6">{donation.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No matching donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Withdraw Funds Section */}
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-white">Available Balance: ${balance}</h2>
        <button
          onClick={handleWithdraw}
          className="mt-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default ManageDonations;
