'use client'
import React, { useState } from "react";
import { FiHome, FiDollarSign, FiRepeat, FiHeart, FiCreditCard, FiBarChart, FiUser } from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DonationForm from "./DonationForm";

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="w-64 bg-blue-900 h-screen text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Donor Dashboard</h2>
      <ul className="space-y-4">
        {[
          { icon: <FiHome />, label: "Dashboard" },
          { icon: <FiDollarSign />, label: "Donation History" },
          { icon: <FiRepeat />, label: "Recurring Donations" },
          { icon: <FiHeart />, label: "Saved Causes" },
          { icon: <FiCreditCard />, label: "Payment Methods" },
          { icon: <FiBarChart />, label: "Impact Reports" },
          { icon: <FiUser />, label: "Profile Settings" }
        ].map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-blue-800 rounded"
            onClick={() => setActiveSection(label)}
          >
            {icon} {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [donations, setDonations] = useState([
    { amount: 400, month: "Jan" },
    { amount: 300, month: "Feb" },
    { amount: 500, month: "Mar" },
  ]);

  const addDonation = (newDonation) => {
    setDonations([...donations, { amount: newDonation.amount, month: new Date().toLocaleString('default', { month: 'short' }) }]);
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-6 bg-gray-100 h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{activeSection}</h1>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => setShowForm(true)}
          >
            Quick Donate
          </button>
        </div>

        {showForm && <DonationForm setShowForm={setShowForm} addDonation={addDonation} />}

        {activeSection === "Dashboard" && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <FaRegMoneyBillAlt className="text-green-500 text-3xl" />
                <div>
                  <h3 className="text-gray-700 text-lg font-semibold">Total Donated</h3>
                  <p className="text-gray-500 text-xl">${donations.reduce((acc, curr) => acc + curr.amount, 0)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Donation Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
