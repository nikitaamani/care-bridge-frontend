"use client";
import React, { useState, useEffect } from "react";

const DonationForm = ({ setShowForm, addDonation, updateDonation, deleteDonation }) => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donations, setDonations] = useState([]); // State to store fetched donations
  const [editingDonation, setEditingDonation] = useState(null); // Track the donation being edited
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  // ✅ READ: Fetch all donations
  const fetchDonations = async () => {
    try {
      const response = await fetch("http://localhost:5000/donations");
      const data = await response.json();
      if (response.ok) {
        setDonations(data);
      } else {
        setError("Failed to load donations");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    }
  };

  // ✅ CREATE: Submit a new donation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;

    setLoading(true);
    setError("");

    const donationData = {
      amount: parseFloat(amount),
      donor_name: donorName || "Anonymous",
      donor_id: 1, // Replace with actual donor ID (from auth context)
      charity_id: 1, // Replace with selected charity
      category_id: 1, // Replace with selected category
      donation_type: "money",
    };

    try {
      const response = await fetch("http://localhost:5000/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        addDonation(result); // Add new donation to the list
        fetchDonations(); // Refresh list
        setShowForm(false);
      } else {
        setError(result.error || "Failed to process donation");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE: Edit an existing donation
  const handleUpdate = async () => {
    if (!editingDonation || !amount) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/donations/${editingDonation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (response.ok) {
        updateDonation(editingDonation.id, parseFloat(amount));
        fetchDonations(); // Refresh
        setEditingDonation(null);
        setAmount("");
      } else {
        setError("Failed to update donation");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE: Remove a donation
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/donations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteDonation(id);
        fetchDonations();
      } else {
        setError("Failed to delete donation");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingDonation ? "Edit Donation" : "Make a Donation"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <form onSubmit={editingDonation ? handleUpdate : handleSubmit}>
          <label className="block mb-2 text-gray-700">Your Name (Optional)</label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 text-gray-700">Donation Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            min="1"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? "Processing..." : editingDonation ? "Update" : "Donate"}
            </button>
          </div>
        </form>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Your Donations</h3>
        <ul className="mt-2 max-h-40 overflow-auto">
          {donations.length === 0 ? (
            <p className="text-sm text-gray-500">No donations yet.</p>
          ) : (
            donations.map((donation) => (
              <li key={donation.id} className="border p-2 rounded flex justify-between items-center">
                <span>${donation.amount}</span>
                <div>
                  <button
                    className="text-blue-500 text-sm mr-2"
                    onClick={() => {
                      setEditingDonation(donation);
                      setAmount(donation.amount);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DonationForm;
