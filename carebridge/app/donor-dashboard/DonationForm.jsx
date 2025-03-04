"use client";
import React, { useState, useEffect } from "react";

const DonationForm = ({ setShowForm, addDonation, user, donation, fetchDonations }) => {
  const [amount, setAmount] = useState(donation ? donation.amount : "");
  const [donorName, setDonorName] = useState(donation ? donation.donor_name : user?.name || "");
  const [isAnonymous, setIsAnonymous] = useState(donation ? donation.donor_name === "Anonymous" : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedCharity, setSelectedCharity] = useState(donation ? { id: donation.charity_id, name: "" } : { id: "", name: "" });
  const [selectedCategory, setSelectedCategory] = useState(donation ? { id: donation.category_id, name: "" } : { id: "", name: "" });
  const [isRecurring, setIsRecurring] = useState(donation ? donation.is_recurring : false);
  const [frequency, setFrequency] = useState(donation ? donation.frequency : "monthly");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let token = localStorage.getItem("access_token");
    if (!token || token === "undefined") {
      setError("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    if (!token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }

    const donationData = {
      amount: parseFloat(amount) || 0,
      charity_id: selectedCharity.id,
      category_id: selectedCategory.id,
      beneficiary_id: 1,
      donation_type: "money",
      status: "pending",
      donor_name: isAnonymous ? "Anonymous" : donorName,
      is_recurring: isRecurring,
      frequency: isRecurring ? frequency : null, // Only include frequency if it's a recurring donation
      next_donation_date: isRecurring ? new Date().toISOString().split("T")[0] : null, // Format as YYYY-MM-DD
    };

    try {
      const url = donation ? `http://localhost:5000/donations/${donation.id}` : "http://localhost:5000/donations";
      const method = donation ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(donation ? "🎉 Donation Updated Successfully!" : "🎉 Donation Successful!");
        setAmount("");
        setDonorName("");
        setIsAnonymous(false);
        setIsRecurring(false);
        setFrequency("monthly");
        setError("");
        if (donation) {
          fetchDonations(); // Refresh donations after update
        } else {
          addDonation(data.donation); // Add new donation to the list
        }
        setShowForm(false);
      } else {
        setError(data.msg || (donation ? "Failed to update donation." : "Failed to donate."));
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
          {donation ? "Edit Donation" : "Make a Donation"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700">Your Name (Optional)</label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            disabled={isAnonymous}
          />

          <label className="block mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mr-2"
            />
            Donate Anonymously
          </label>

          <label className="block mb-2 text-gray-700">Select Charity</label>
          <select
            value={selectedCharity.id}
            onChange={(e) => setSelectedCharity({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Choose a Charity</option>
            <option value="1">Charity A</option>
            <option value="2">Charity B</option>
          </select>

          <label className="block mb-2 text-gray-700">Select Category</label>
          <select
            value={selectedCategory.id}
            onChange={(e) => setSelectedCategory({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Choose a Category</option>
            <option value="1">Education</option>
            <option value="2">Health</option>
            <option value="3">Food</option>
            <option value="4">Clothing</option>
          </select>

          <label className="block mb-2 text-gray-700">Donation Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            min="1"
            required
          />

          <label className="block mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2"
            />
            Set up recurring donation
          </label>

          {/* Frequency Selection (only visible if recurring is checked) */}
          {isRecurring && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full" disabled={loading}>
            {loading ? "Processing..." : (donation ? "Update Donation" : "Donate")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;