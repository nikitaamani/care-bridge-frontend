"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const charities = [
  {
    name: "African Medical and Research Foundation (AMREF)",
    location: "Nairobi, Kenya",
    rating: 96,
    category: "Healthcare & Medical Aid",
    size: "Large",
    aid: "Medical Supplies & Health Services",
  },
  {
    name: "Gift of the Givers",
    location: "Johannesburg, South Africa",
    rating: 97,
    category: "Disaster Relief & Humanitarian Aid",
    size: "Global",
    aid: "Emergency Food & Shelter",
  },
  {
    name: "The African Child Foundation",
    location: "Lagos, Nigeria",
    rating: 94,
    category: "Education & Child Welfare",
    size: "Medium",
    aid: "School Supplies & Scholarships",
  },
];

const affectedCountries = [
  "Sudan",
  "Democratic Republic of Congo",
  "Somalia",
  "Ethiopia",
  "Haiti",
  "South Sudan",
];

const donationTypes = [
  "Money",
  "Food Supplies",
  "Clothes",
  "Medical Supplies",
  "School Materials",
];

const CharityCard = ({ charity, onDonate }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-all transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900">{charity.name}</h3>
      <p className="text-gray-600 text-sm">{charity.location}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
          {charity.category}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
          {charity.size}
        </span>
        <span className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium">
          {charity.aid}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-3xl font-bold text-green-500">{charity.rating}%</span>
        <button
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition hover:from-red-600 hover:to-red-700 transform hover:scale-105"
          onClick={() => onDonate(charity)}
        >
          Donate
        </button>
      </div>
    </div>
  );
};

const CharityList = () => {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [donationType, setDonationType] = useState("");
  const [donations, setDonations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCharity || !selectedCountry || !donationType) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Add new donation to the list
    const newDonation = {
      ...selectedCharity,
      country: selectedCountry,
      type: donationType,
      date: new Date().toLocaleString(),
    };

    setDonations([newDonation, ...donations]);

    // Reset form
    setSelectedCharity(null);
    setSelectedCountry("");
    setDonationType("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Support a Charity in Africa</h1>
        <p className="text-gray-600 text-lg text-center mt-2">
          Choose a charity and help those in need.
        </p>

        {/* Charity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {charities.map((charity, index) => (
            <CharityCard key={index} charity={charity} onDonate={setSelectedCharity} />
          ))}
        </div>

        {/* Donation Form */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Make a Donation</h2>
          <p className="text-gray-600 text-center mb-6">
            Select a charity, country in need, and type of donation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Choose a Charity:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={selectedCharity?.name || ""}
                onChange={(e) =>
                  setSelectedCharity(charities.find((c) => c.name === e.target.value))
                }
              >
                <option value="">Select a Charity</option>
                {charities.map((charity) => (
                  <option key={charity.name} value={charity.name}>
                    {charity.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Country in Need:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select a Country</option>
                {affectedCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Type of Donation:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
              >
                <option value="">Select a Donation Type</option>
                {donationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Submit Donation
            </button>
          </form>
        </div>

        {/* Recent Donations Section */}
        {donations.length > 0 && (
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Recent Donations</h2>
            <ul className="mt-4 space-y-4">
              {donations.map((donation, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                  <strong>{donation.name}</strong> ({donation.location}) received a{" "}
                  <span className="text-green-600">{donation.type}</span> donation for{" "}
                  <span className="text-red-600">{donation.country}</span> on {donation.date}.
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CharityList;
