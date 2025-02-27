'use client';
import React, { useState } from "react";
import { FaPaypal, FaCreditCard, FaRegClock, FaUserSecret } from 'react-icons/fa';

const DonationForm = ({ setShowForm, addDonation, charityId }) => {
  const [formData, setFormData] = useState({
    amount: "",
    donorName: "",
    isRecurring: false,
    frequency: "monthly",
    isAnonymous: false,
    paymentMethod: "card",
    nextDonationDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate default next donation date (1st of next month)
  const getDefaultNextDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    setLoading(true);
    setError("");

    const donationData = {
      charity_id: charityId,
      amount: parseFloat(formData.amount),
      donation_type: "money",
      is_anonymous: formData.isAnonymous,
      payment_method: formData.paymentMethod
    };

    if (formData.isRecurring) {
      donationData.frequency = formData.frequency;
      donationData.next_donation_date = formData.nextDonationDate || getDefaultNextDate();
    }

    try {
      const endpoint = formData.isRecurring ? '/donations/recurring' : '/donations';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        addDonation(result);
        setShowForm(false);
      } else {
        setError(result.error || "Failed to process donation");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Make a Donation</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="1"
              step="0.01"
              required
            />
          </div>

          {/* Recurring Donation Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isRecurring"
              id="isRecurring"
              checked={formData.isRecurring}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="isRecurring" className="text-sm text-gray-700 flex items-center">
              <FaRegClock className="mr-2" />
              Make this a recurring donation
            </label>
          </div>

          {/* Frequency Selection (shown only for recurring donations) */}
          {formData.isRecurring && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="nextDonationDate"
                  value={formData.nextDonationDate || getDefaultNextDate()}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}

          {/* Anonymous Donation Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAnonymous"
              id="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="isAnonymous" className="text-sm text-gray-700 flex items-center">
              <FaUserSecret className="mr-2" />
              Make this an anonymous donation
            </label>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                className={`flex items-center justify-center p-3 border rounded-md ${
                  formData.paymentMethod === 'card'
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-300 hover:border-orange-500'
                }`}
              >
                <FaCreditCard className="mr-2" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                className={`flex items-center justify-center p-3 border rounded-md ${
                  formData.paymentMethod === 'paypal'
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-300 hover:border-orange-500'
                }`}
              >
                <FaPaypal className="mr-2" />
                PayPal
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300"
            >
              {loading ? "Processing..." : "Complete Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
