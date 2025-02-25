'use client';
import React, { useState } from "react";

const DonationForm = ({ setShowForm, addDonation }) => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState(""); // Optional donor name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;
    
    setLoading(true);
    setError("");

    const donationData = {
      amount: parseFloat(amount),
      donor_name: donorName || "Anonymous",
    };

    try {
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        addDonation(donationData); // Update dashboard
        setShowForm(false); // Close form
      } else {
        setError(result.error || "Failed to process donation");
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
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Make a Donation</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
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
              {loading ? "Processing..." : "Donate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
