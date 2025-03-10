"use client";
import React, { useState, useEffect } from "react";
import { FiHome, FiDollarSign, FiRepeat, FiHeart, FiCreditCard, FiBarChart, FiUser } from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DonationForm from "./DonationForm";
import ProfileSettings from "./ProfileSettings";
import BeneficiaryStories from "./BeneficiaryStories"; // Import the BeneficiaryStories component

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="w-64 bg-blue-900 text-white p-5 fixed top-0 left-0 h-full">
      <h2 className="text-2xl font-bold mb-6">Donor Dashboard</h2>
      <ul className="space-y-4">
        {[
          { icon: <FiHome />, label: "Dashboard" },
          { icon: <FiDollarSign />, label: "Donation History" },
          { icon: <FiRepeat />, label: "Recurring Donations" },
          // { icon: <FiHeart />, label: "Saved Causes" },
          // { icon: <FiCreditCard />, label: "Payment Methods" },
          { icon: <FiBarChart />, label: "Impact Reports" }, // Link to Impact Reports
          { icon: <FiUser />, label: "Profile Settings" },
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
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingDonation, setEditingDonation] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch donations from backend
  const fetchDonations = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }

    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/donations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched Donations:", data);
      if (response.ok) {
        setDonations(data);
      } else {
        console.error("Error fetching donations:", data.error);
      }
    } catch (err) {
      console.error("Network error while fetching donations:", err);
    }
  };

  // Fetch donations when the component loads
  useEffect(() => {
    fetchDonations();
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No token found. User must be logged in.");
        return;
      }
  
      try {
        const response = await fetch("https://carebridge-backend-fys5.onrender.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user data:", data.error);
        }
      } catch (err) {
        console.error("Network error while fetching user data:", err);
      }
    };
  
    fetchUserData();
  }, []);

  // Function to handle donation update
  const handleUpdateDonation = (donation) => {
    setEditingDonation(donation);
    setShowEditForm(true);
  };

  // Function to handle donation deletion
  const handleDeleteDonation = async (donationId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this donation?")) {
      return;
    }

    try {
      console.log(donationId);
      const response = await fetch(`https://carebridge-backend-fys5.onrender.com/donations/${donationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.text(); // Handle non-JSON responses
        console.error(`Error response: ${errorData}`); // Debugging
        throw new Error(errorData || "Failed to delete donation");
      }

      const data = await response.json();
      alert(data.message || "Donation deleted successfully!");
      fetchDonations(); // Refresh donations
    } catch (err) {
      console.error("Network error while deleting donation:", err);
      alert(err.message);
    }
  };

  // Function to update donation history after a new donation
  const addDonation = async (newDonation) => {
    setDonations((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount: newDonation.amount,
        month: new Date().toLocaleString("default", { month: "short" }),
      },
    ]);

    // Fetch latest donations from backend
    await fetchDonations();
  };

  // Filter recurring donations
  const recurringDonations = donations.filter((donation) => donation.frequency);

  return (
    <div className="flex">
      {/* Sidebar remains fixed */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Main content scrolls */}
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{activeSection}</h1>
          {activeSection !== "Profile Settings" && (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={() => setShowForm(true)}
            >
              Quick Donate
            </button>
          )}
        </div>

        {showForm && (
          <DonationForm
            setShowForm={setShowForm}
            addDonation={addDonation}
            user={user}
            selectedCharity={selectedCharity}
            selectedCategory={selectedCategory}
          />
        )}

        {showEditForm && (
          <DonationForm
            setShowForm={setShowEditForm}
            addDonation={addDonation}
            user={user}
            donation={editingDonation}
            fetchDonations={fetchDonations}
          />
        )}

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

        {activeSection === "Donation History" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Donation History</h2>
            {donations.length === 0 ? (
              <p className="text-gray-500">No donations found.</p>
            ) : (
              <ul className="space-y-4">
                {donations.map((donation) => (
                  <li key={donation.id} className="border p-4 rounded-lg shadow-md">
                    {/* Display Donor's Name if not anonymous */}
                    {donation.anonymous ? (
                      <p className="text-gray-500"><strong>Donor:</strong> Anonymous</p>
                    ) : (
                      <p className="text-gray-700"><strong>Donor:</strong> {donation.donor_name || "Unknown"}</p>
                    )}
                    <p className="text-gray-700"><strong>Amount:</strong> ${donation.amount}</p>
                    <p className="text-gray-700"><strong>Status:</strong> {donation.status || "Completed"}</p>
                    <p className="text-gray-700"><strong>Charity:</strong> {donation.charity_id || "N/A"}</p>
                    <p className="text-gray-700"><strong>Date:</strong> {donation.next_donation_date || "One-time donation"}</p>

                    {/* Update and Delete Buttons (only for pending donations) */}
                    {donation.status === "pending" && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleUpdateDonation(donation)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteDonation(donation.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeSection === "Recurring Donations" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recurring Donations</h2>
            {recurringDonations.length === 0 ? (
              <p className="text-gray-500">No recurring donations found.</p>
            ) : (
              <ul className="space-y-4">
                {recurringDonations.map((donation) => (
                  <li key={donation.id} className="border p-4 rounded-lg shadow-md">
                    {/* Display Donor's Name if not anonymous */}
                    {donation.anonymous ? (
                      <p className="text-gray-500"><strong>Donor:</strong> Anonymous</p>
                    ) : (
                      <p className="text-gray-700"><strong>Donor:</strong> {donation.donor_name || "Unknown"}</p>
                    )}
                    <p className="text-gray-700"><strong>Amount:</strong> ${donation.amount}</p>
                    <p className="text-gray-700"><strong>Status:</strong> {donation.status || "Active"}</p>
                    <p className="text-gray-700"><strong>Charity:</strong> {donation.charity_id || "N/A"}</p>
                    <p className="text-gray-700"><strong>Frequency:</strong> {donation.frequency}</p>
                    <p className="text-gray-700"><strong>Next Donation Date:</strong> {donation.next_donation_date || "N/A"}</p>

                    {/* Update and Delete Buttons (only for pending donations) */}
                    {donation.status === "pending" && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleUpdateDonation(donation)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteDonation(donation.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeSection === "Impact Reports" && (
          <div className="space-y-6">
            <BeneficiaryStories /> {/* Render the BeneficiaryStories component */}
          </div>
        )}

        {activeSection === "Profile Settings" && (
          <ProfileSettings onClose={() => setActiveSection("Dashboard")} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;