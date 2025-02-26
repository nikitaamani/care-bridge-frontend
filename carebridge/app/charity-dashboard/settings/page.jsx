"use client";
import React, { useState } from "react";

const Settings = () => {
  const [charityInfo, setCharityInfo] = useState({
    name: "Charity Name",
    description: "Supporting those in need.",
    email: "contact@charity.org",
    logo: "",
    password: "",
  });

  const handleChange = (e) => {
    setCharityInfo({ ...charityInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated Successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Settings</h1>

      {/* Profile Settings Card */}
      <div className="p-4 shadow-lg bg-white w-full max-w-2xl mx-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={charityInfo.name}
            onChange={handleChange}
            placeholder="Charity Name"
            className="p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={charityInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-2 border rounded-md"
          />
          <textarea
            name="description"
            value={charityInfo.description}
            onChange={handleChange}
            placeholder="Charity Description"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={charityInfo.password}
            onChange={handleChange}
            placeholder="New Password"
            className="p-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </div>

      {/* Danger Zone Card */}
      <div className="p-4 shadow-lg bg-white w-full max-w-2xl mx-auto mt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
