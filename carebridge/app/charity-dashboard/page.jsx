"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [totalDonations, setTotalDonations] = useState(0);
  const [anonymousDonations, setAnonymousDonations] = useState(0);
  const [nonAnonymousDonations, setNonAnonymousDonations] = useState(0);
  const [charities, setCharities] = useState([]);
  const [newCharity, setNewCharity] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchDonations();
    fetchCharities();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/donations", {
        withCredentials: true,
      });
      const donations = response.data;

      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      const anonymous = donations
        .filter((donation) => donation.is_anonymous)
        .reduce((sum, donation) => sum + donation.amount, 0);
      const nonAnonymous = total - anonymous;

      setTotalDonations(total);
      setAnonymousDonations(anonymous);
      setNonAnonymousDonations(nonAnonymous);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const fetchCharities = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/charities", {
        withCredentials: true,
      });
      setCharities(response.data);
    } catch (error) {
      console.error("Error fetching charities:", error);
    }
  };

  const handleCreateCharity = async () => {
    try {
      // Retrieve the JWT token from local storage or cookies
      const token = localStorage.getItem("token"); // Adjust this based on where you store the token
  
      if (!token) {
        alert("You must be logged in to create a charity.");
        return;
      }
  
      const response = await axios.post(
        "http://127.0.0.1:5000/charities/create",
        newCharity,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
          },
          withCredentials: true,
        }
      );
  
      alert("Charity application submitted successfully!");
      setNewCharity({ name: "", description: "" });
      fetchCharities();
    } catch (error) {
      console.error("Error creating charity:", error);
      alert("Failed to create charity. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Charity Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Apply to be a Charity</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Charity Name"
            value={newCharity.name}
            onChange={(e) => setNewCharity({ ...newCharity, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Charity Description"
            value={newCharity.description}
            onChange={(e) => setNewCharity({ ...newCharity, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleCreateCharity}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Submit Application
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Charities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <div key={charity.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{charity.name}</h3>
              <p className="text-sm text-gray-600">{charity.description}</p>
              <p className="text-sm text-gray-600">
                {charity.is_approved ? "Approved" : "Pending Approval"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
