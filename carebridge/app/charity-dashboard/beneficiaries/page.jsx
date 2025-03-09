"use client";

import React, { useEffect, useState } from "react";

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [name, setName] = useState("");
  const [needs, setNeeds] = useState("");
  const [charityId, setCharityId] = useState(null); // Selected charity ID
  const [charities, setCharities] = useState([]); // List of available charities
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success/error messages
  const [editingBeneficiary, setEditingBeneficiary] = useState(null); // Currently editing beneficiary

  useEffect(() => {
    fetchCharities(); // Fetch available charities
    fetchBeneficiaries(); // Fetch beneficiaries
  }, []);

  const fetchCharities = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await fetch("https://carebridge-backend-fys5.onrender.com/charities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        credentials: "include", // Include cookies if using cookie-based authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched charities:", data); // Debugging: Log the fetched data
      setCharities(data); // Set the list of charities
    } catch (error) {
      console.error("Error fetching charities:", error);
    }
  };

  const fetchBeneficiaries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await fetch("https://carebridge-backend-fys5.onrender.com/beneficiaries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        credentials: "include", // Include cookies if using cookie-based authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched beneficiaries:", data); // Log the response
      setBeneficiaries(data);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const payload = {
        charity_id: charityId, // Include charity_id in the payload
        name,
        needs,
      };
      console.log("Sending payload:", payload); // Debugging: Log the payload


      const response = await fetch("https://carebridge-backend-fys5.onrender.com/beneficiaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        credentials: "include", // Include cookies if using cookie-based authentication
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage("Beneficiary added successfully");
      fetchBeneficiaries(); // Refresh the list of beneficiaries
      setName("");
      setNeeds("");
    } catch (error) {
      setMessage("Error adding beneficiary");
      console.error("Error adding beneficiary:", error);
    }
  };

  const handleEdit = async (beneficiaryId, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`https://carebridge-backend-fys5.onrender.com/beneficiaries/${beneficiaryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage("Beneficiary updated successfully");
      fetchBeneficiaries(); // Refresh the list
      setEditingBeneficiary(null); // Reset editing state
    } catch (error) {
      setMessage("Error updating beneficiary");
      console.error("Error updating beneficiary:", error);
    }
  };

  const handleDelete = async (beneficiaryId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`https://carebridge-backend-fys5.onrender.com/beneficiaries/${beneficiaryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage("Beneficiary deleted successfully");
      fetchBeneficiaries(); // Refresh the list
    } catch (error) {
      setMessage("Error deleting beneficiary");
      console.error("Error deleting beneficiary:", error);
    }
  };

  // Filter beneficiaries based on search query
  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (beneficiary.charity_name && beneficiary.charity_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Beneficiaries</h1>

      {/* Add Beneficiary Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        {/* Charity Select Dropdown */}
        <div className="mb-4">
          <label htmlFor="charity" className="block text-sm font-medium text-gray-700">
            Select Charity
          </label>
          <select
            id="charity"
            value={charityId || ""}
            onChange={(e) => setCharityId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>Select a charity</option>
            {charities.map((charity) => (
              <option key={charity.id} value={charity.id}>
                {charity.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          placeholder="Needs"
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Beneficiary
        </button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search beneficiaries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Display Messages */}
      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Display List of Beneficiaries */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">List of Beneficiaries</h2>
        {loading ? (
          <p>Loading...</p>
        ) : filteredBeneficiaries.length === 0 ? (
          <p>No beneficiaries found.</p>
        ) : (
          filteredBeneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{beneficiary.name}</h3>
              <p className="text-gray-700">{beneficiary.needs}</p>
              <p className="text-sm text-gray-500">Charity: {beneficiary.charity_name}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditingBeneficiary(beneficiary)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(beneficiary.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Beneficiary Modal */}
      {editingBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Beneficiary</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingBeneficiary.name}
              onChange={(e) =>
                setEditingBeneficiary({ ...editingBeneficiary, name: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <textarea
              placeholder="Needs"
              value={editingBeneficiary.needs}
              onChange={(e) =>
                setEditingBeneficiary({ ...editingBeneficiary, needs: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(editingBeneficiary.id, editingBeneficiary)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingBeneficiary(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}