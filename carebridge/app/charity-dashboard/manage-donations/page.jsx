"use client";

import React, { useState, useEffect } from "react";

const ManageDonations = ({ apiUrl = "" }) => {
  const defaultDonations = [
    { amount: 100, donorName: "John Doe", date: "2022-01-01", type: "Public" },
    { amount: 200, donorName: "Jane Smith", date: "2022-02-01", type: "Anonymous" },
  ];

  const [donations, setDonations] = useState(defaultDonations);
  const [filteredDonations, setFilteredDonations] = useState(defaultDonations);
  const [filter, setFilter] = useState({ date: "", amount: "", type: "" });

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

  const exportToCSV = () => {
    const headers = "Amount,Donor Name,Date,Type\n";
    const csv = headers + filteredDonations.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donations.csv";
    a.click();
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

      {/* Export Button */}
      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={exportToCSV}
          className="px-6 py-3 bg-[#202952] text-white font-semibold rounded-lg shadow-md hover:bg-[#F55920] w-full sm:w-auto"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default ManageDonations;
