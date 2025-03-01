"use client";
import React, { useState, useEffect } from "react";

const DonationForm = ({ setShowForm, addDonation, updateDonation, deleteDonation, user }) => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState(user?.name || "Anonymous");
  const [donations, setDonations] = useState([]);
  const [editingDonation, setEditingDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // ✅ Ensure selected charity & category have valid defaults
  const [selectedCharity, setSelectedCharity] = useState({ id: "", name: "" });
  const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" });

  useEffect(() => {
    fetchDonations();
  }, []);

  // ✅ READ: Fetch all donations
  const fetchDonations = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to view donations.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:5000/donations", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setDonations(data);
      } else {
        setError(data.error || "Failed to load donations");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    }
  };

  // ✅ Call `fetchDonations()` when the page loads
useEffect(() => {
  fetchDonations();
}, []);

  // ✅ CREATE: Submit a new donation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let token = localStorage.getItem("access_token");

    if (!token || token === "undefined") {  // Check for undefined or empty token
        console.error("❌ No token found! User must log in again.");
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
    }

    if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;  // Ensure correct format
    }

    const donationData = {
        amount: parseFloat(amount) || 0,
        donor_id: user?.id || 1,
        charity_id: selectedCharity.id,
        category_id: selectedCategory.id,
        beneficiary_id: 1,
        donation_type: "money",
        status: "pending",
    };

    console.log("✅ Sending donation data:", donationData);
    console.log("🔑 Authorization Token:", token);

    try {
        const response = await fetch("http://localhost:5000/donations", {
            method: "POST",
            headers: {
                "Authorization": token,  // Ensure token is in correct format
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donationData),
        });

        const data = await response.json();
        console.log("🔄 Server Response:", data);

        if (response.ok) {
            alert("🎉 Donation Successful!");
            setAmount("");
            setError("");
            fetchDonations();
        } else {
            console.error("❌ Donation failed. Server Response:", data);
            setError(data.msg || "Failed to donate.");
        }
    } catch (err) {
        console.error("❌ Network error:", err);
        setError("Network error. Try again later.");
    } finally {
        setLoading(false);
    }
};


  // ✅ UPDATE: Edit an existing donation
  const handleUpdate = async () => {
    if (!editingDonation || !amount) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to update a donation.");
      return;
    }

    if (parseFloat(amount) === editingDonation.amount) {
      setError("No changes made to the donation amount.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/donations/${editingDonation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (response.ok) {
        updateDonation(editingDonation.id, parseFloat(amount));
        fetchDonations();
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
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
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

          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full" disabled={loading}>
            {loading ? "Processing..." : editingDonation ? "Update" : "Donate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
