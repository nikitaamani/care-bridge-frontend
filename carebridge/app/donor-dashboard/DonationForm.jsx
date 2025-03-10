"use client";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await fetch("https://carebridge-backend-fys5.onrender.com/charities");
        if (!response.ok) {
          throw new Error("Failed to fetch charities");
        }
        const data = await response.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
        setError("Failed to load charities. Please try again later.");
      }
    };

    const fetchDonationDetails = async () => {
      if (donation) {
        try {
          const response = await fetch(`https://carebridge-backend-fys5.onrender.com/donations/${donation.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch donation details");
          }
          const data = await response.json();
          setAmount(data.amount);
          setDonorName(data.donor_name);
          setIsAnonymous(data.donor_name === "Anonymous");
          setSelectedCharity({ id: data.charity_id, name: "" });
          setSelectedCategory({ id: data.category_id, name: "" });
          setIsRecurring(data.is_recurring);
          setFrequency(data.frequency);
        } catch (error) {
          console.error("Error fetching donation details:", error);
          setError("Failed to load donation details. Please try again later.");
        }
      }
    };

    fetchCharities();
    fetchDonationDetails();
  }, [donation]);

  const createPayPalOrder = async (data, actions) => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (!user) {
      setError("You must be logged in to make a donation.");
      return;
    }

    if (!user?.email) {
      setError("User email is missing. Please log in again.");
      return;
    }

    setError("");

    const token = localStorage.getItem("access_token");
    if (!token || token === "undefined") {
      setError("Session expired. Please log in again.");
      return;
    }

    const requestData = {
      amount: amount,
      charity_id: selectedCharity.id,
      category_id: selectedCategory.id,
      email: user?.email,
      is_anonymous: isAnonymous,
      donor_name: isAnonymous ? "Anonymous" : donorName,
      donation_type: "money",
      payment_method: "paypal",
    };

    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/create-paypal-payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        return result.orderID;
      } else {
        setError(result.error || "Failed to create PayPal order.");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderID = urlParams.get("access_token");

    if (orderID) {
      const capturePayment = async () => {
        const token = localStorage.getItem("access_token");
        if (!token || token === "undefined") {
          setError("Session expired. Please log in again.");
          return;
        }

        try {
          const response = await fetch("https://carebridge-backend-fys5.onrender.com/execute-paypal-payment", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderID }),
          });

          const result = await response.json();

          if (response.ok) {
            alert("🎉 Donation Successful!");
            setAmount("");
            setDonorName("");
            setIsAnonymous(false);
            setIsRecurring(false);
            setFrequency("monthly");
            setError("");
            fetchDonations();
            setShowForm(false);
          } else {
            setError(result.error || "Failed to process payment.");
          }
        } catch (err) {
          setError("Network error. Try again later.");
        }
      };

      capturePayment();
    }
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "ATOm1GzlqyrHSwC2m5estbrSgAkmkOn_WREJj1WOCN5Ho2VmuyCJcXA9pQpuLVhXwMTgr379Q-g6dJDX", currency: "USD" }}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {donation ? "Edit Donation" : "Make a Donation"}
          </h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={(e) => e.preventDefault()}>
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
              {charities.map((charity) => (
                <option key={charity.id} value={charity.id}>
                  {charity.name}
                </option>
              ))}
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

            <div className="mb-4">
              <PayPalButtons
                createOrder={createPayPalOrder}
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "donate" }}
                disabled={!amount || amount <= 0}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default DonationForm;