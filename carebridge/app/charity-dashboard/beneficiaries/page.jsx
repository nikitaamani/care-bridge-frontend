"use client";

import React, { useState } from "react";

const ageGroups = ["Children", "Teens", "Adults", "Elderly"];
const aidTypes = ["Sanitary Pads", "Clean Water", "Food Supplies", "Medical Aid"];
const locations = ["Village A", "Village B", "Town C", "City D"];

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: "John Doe", location: "Village A", ageGroup: "Adults", aidReceived: "Clean Water" },
    { id: 2, name: "Jane Smith", location: "Town C", ageGroup: "Children", aidReceived: "Food Supplies" },
  ]);

  const [filters, setFilters] = useState({ location: "", ageGroup: "", aidReceived: "" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBeneficiaries = beneficiaries.filter(b => 
    (!filters.location || b.location === filters.location) &&
    (!filters.ageGroup || b.ageGroup === filters.ageGroup) &&
    (!filters.aidReceived || b.aidReceived === filters.aidReceived)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Beneficiaries</h1>
      
      {/* Filters */}
      <div className="p-4 shadow-lg bg-white w-full mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <select name="location" value={filters.location} onChange={handleFilterChange} className="border p-2 rounded w-full md:w-auto">
            <option value="">All Locations</option>
            {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select name="ageGroup" value={filters.ageGroup} onChange={handleFilterChange} className="border p-2 rounded w-full md:w-auto">
            <option value="">All Age Groups</option>
            {ageGroups.map((age) => <option key={age} value={age}>{age}</option>)}
          </select>
          <select name="aidReceived" value={filters.aidReceived} onChange={handleFilterChange} className="border p-2 rounded w-full md:w-auto">
            <option value="">All Aid Types</option>
            {aidTypes.map((aid) => <option key={aid} value={aid}>{aid}</option>)}
          </select>
        </div>
      </div>
      
      {/* Beneficiary List */}
      <div className="p-4 shadow-lg bg-white w-full mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Beneficiary List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Age Group</th>
              <th className="border p-2">Aid Received</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeneficiaries.map((b) => (
              <tr key={b.id} className="border">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.location}</td>
                <td className="border p-2">{b.ageGroup}</td>
                <td className="border p-2">{b.aidReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reports */}
      <div className="p-4 shadow-lg bg-white w-full rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Generate Reports</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Beneficiaries;
