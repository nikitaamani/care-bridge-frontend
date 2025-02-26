"use client"
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [charityInfo, setCharityInfo] = useState({
    name: "Charity Name",
    description: "Supporting those in need.",
    email: "contact@charity.org",
    logo: "",
    password: ""
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
      
      <Card className="p-4 shadow-lg bg-white w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            value={charityInfo.name}
            onChange={handleChange}
            placeholder="Charity Name"
          />
          <Input
            type="email"
            name="email"
            value={charityInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <textarea
            name="description"
            value={charityInfo.description}
            onChange={handleChange}
            placeholder="Charity Description"
            className="p-2 border rounded-md"
          />
          <Input
            type="password"
            name="password"
            value={charityInfo.password}
            onChange={handleChange}
            placeholder="New Password"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
        </form>
      </Card>
      
      <Card className="p-4 shadow-lg bg-white w-full max-w-2xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
        <Button className="bg-red-500 hover:bg-red-600 w-full">Delete Account</Button>
      </Card>
    </div>
  );
};

export default Settings;
