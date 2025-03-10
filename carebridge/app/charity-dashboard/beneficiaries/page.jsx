"use client";

import React, { useEffect, useState } from "react";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [name, setName] = useState("");
  const [needs, setNeeds] = useState("");
  const [charityId, setCharityId] = useState(null);
  const [charities, setCharities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);

  useEffect(() => {
    fetchCharities();
    fetchBeneficiaries();
  }, []);

  const fetchCharities = async () => {
    try {
      const data = await fetchWithAuth("https://carebridge-backend-fys5.onrender.com/charities");
      setCharities(data);
    } catch (error) {
      console.error("Error fetching charities:", error);
      setMessage("Failed to fetch charities");
    }
  };

  const fetchBeneficiaries = async () => {
    setLoading(true);
    try {
      const data = await fetchWithAuth("https://carebridge-backend-fys5.onrender.com/beneficiaries");
      setBeneficiaries(data);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      setMessage("Failed to fetch beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { charity_id: charityId, name, needs };
      await fetchWithAuth("https://carebridge-backend-fys5.onrender.com/beneficiaries", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setMessage("Beneficiary added successfully");
      fetchBeneficiaries();
      setName("");
      setNeeds("");
    } catch (error) {
      console.error("Error adding beneficiary:", error);
      setMessage("Error adding beneficiary");
    }
  };

  const handleEdit = async (beneficiaryId, updatedData) => {
    try {
      await fetchWithAuth(`https://carebridge-backend-fys5.onrender.com/beneficiaries/${beneficiaryId}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });

      setMessage("Beneficiary updated successfully");
      fetchBeneficiaries();
      setEditingBeneficiary(null);
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      setMessage("Error updating beneficiary");
    }
  };

  const handleDelete = async (beneficiaryId) => {
    try {
      await fetchWithAuth(`https://carebridge-backend-fys5.onrender.com/beneficiaries/${beneficiaryId}`, {
        method: "DELETE",
      });

      setMessage("Beneficiary deleted successfully");
      fetchBeneficiaries();
    } catch (error) {
      console.error("Error deleting beneficiary:", error);
      setMessage("Error deleting beneficiary");
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (beneficiary.charity_name && beneficiary.charity_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Beneficiaries</h1>

      <form onSubmit={handleSubmit} className="mb-6">
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

      <input
        type="text"
        placeholder="Search beneficiaries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {message && <p className="text-green-500 mb-4">{message}</p>}

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