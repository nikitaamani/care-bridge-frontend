'use client'
import React, { useState, useEffect } from "react";
import { FiHome, FiDollarSign, FiRepeat, FiHeart, FiCreditCard, FiBarChart, FiUser } from "react-icons/fi";
import { FaRegMoneyBillAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DonationForm from "./DonationForm";

const Sidebar = ({ setActiveSection, activeSection }) => {
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
            className={`flex items-center gap-3 cursor-pointer p-2 hover:bg-blue-800 rounded ${
              activeSection === label ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection(label)}
          >
            {icon} {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DonationHistoryCard = ({ donation }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-gray-800">{donation.charity_name}</h3>
      <span className={`px-2 py-1 rounded text-sm ${
        donation.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>
        {donation.status}
      </span>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-2">${donation.amount}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{new Date(donation.date).toLocaleDateString()}</span>
      {donation.is_anonymous && <span className="text-gray-400">Anonymous</span>}
    </div>
  </div>
);

const RecurringDonationCard = ({ donation }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-gray-800">{donation.charity_name}</h3>
      <div className="flex items-center text-orange-500">
        <FaClock className="mr-1" />
        <span className="text-sm">{donation.frequency}</span>
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-2">${donation.amount}</p>
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">Next donation: {new Date(donation.next_date).toLocaleDateString()}</span>
      <button className="text-red-500 hover:text-red-600">Cancel</button>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [donations, setDonations] = useState([
    { amount: 400, month: "Jan", charity_name: "Clean Water Initiative", status: "completed", date: "2024-01-15", is_anonymous: false },
    { amount: 300, month: "Feb", charity_name: "Education for All", status: "completed", date: "2024-02-15", is_anonymous: true },
    { amount: 500, month: "Mar", charity_name: "Healthcare Access", status: "pending", date: "2024-03-15", is_anonymous: false },
  ]);
  const [recurringDonations, setRecurringDonations] = useState([
    { 
      charity_name: "Clean Water Initiative",
      amount: 50,
      frequency: "monthly",
      next_date: "2024-04-15",
      status: "active"
    },
    {
      charity_name: "Education for All",
      amount: 100,
      frequency: "quarterly",
      next_date: "2024-06-15",
      status: "active"
    }
  ]);

  const addDonation = (newDonation) => {
    const donation = {
      ...newDonation,
      month: new Date().toLocaleString('default', { month: 'short' }),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setDonations([...donations, donation]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{activeSection}</h1>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            onClick={() => setShowForm(true)}
          >
            Quick Donate
          </button>
        </div>

        {showForm && <DonationForm setShowForm={setShowForm} addDonation={addDonation} />}

        {activeSection === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <FaRegMoneyBillAlt className="text-green-500 text-3xl" />
                <div>
                  <h3 className="text-gray-700 text-lg font-semibold">Total Donated</h3>
                  <p className="text-gray-500 text-xl">${donations.reduce((acc, curr) => acc + curr.amount, 0)}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <FaClock className="text-orange-500 text-3xl" />
                <div>
                  <h3 className="text-gray-700 text-lg font-semibold">Active Recurring</h3>
                  <p className="text-gray-500 text-xl">{recurringDonations.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <FaCheckCircle className="text-blue-500 text-3xl" />
                <div>
                  <h3 className="text-gray-700 text-lg font-semibold">Completed</h3>
                  <p className="text-gray-500 text-xl">
                    {donations.filter(d => d.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Donation Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#f97316" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeSection === "Donation History" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donations.map((donation, index) => (
              <DonationHistoryCard key={index} donation={donation} />
            ))}
          </div>
        )}

        {activeSection === "Recurring Donations" && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Recurring Donations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recurringDonations.map((donation, index) => (
                  <RecurringDonationCard key={index} donation={donation} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
