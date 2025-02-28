'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaPaypal, FaCreditCard } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const DonateNow = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [amount, setAmount] = useState('');

    return (
        <PayPalScriptProvider options={{ "client-id": "your-actual-client-id-here" }}>

            <div className="max-w-3xl mx-auto p-6">
                {/* Donation Guide */}
                <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">How to Donate</h2>
                    <p className="text-gray-700 mb-2">1. Sign up or log in to your account.</p>
                    <p className="text-gray-700 mb-2">2. Choose a charity you want to support.</p>
                    <p className="text-gray-700 mb-2">3. Select a donation amount or enter a custom amount.</p>
                    <p className="text-gray-700 mb-2">4. Pick a payment method (PayPal, Credit Card, etc.).</p>
                    <p className="text-gray-700">5. Submit your donation and receive a confirmation.</p>
                </div>

                {/* Signup/Login Prompt */}
                {!isLoggedIn ? (
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-6 text-center">
                        <h3 className="text-xl font-semibold text-yellow-700 mb-4">Sign Up to Continue</h3>
                        <p className="text-gray-700 mb-4">You need an account to make a donation.</p>
                        <div className="space-x-4">
                            <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</Link>
                            <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Log In</Link>
                        </div>
                    </div>
                ) : (
                    /* Donation Form */
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Make a Donation</h3>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter donation amount"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            min="0"
                            step="0.01"
                        />
                        <div className="flex space-x-4">
                            {/* PayPal Button */}
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    if (amount <= 0) {
                                        alert("Please enter a valid donation amount.");
                                        return;
                                    }
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: amount,
                                            },
                                        }],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        // Handle successful payment
                                        console.log("Payment Successful", details);
                                    });
                                }}
                                onError={(err) => {
                                    console.log("Payment Error:", err);
                                }}
                            />

                            {/* Card Button */}
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center space-x-2 hover:bg-green-600">
                                <FaCreditCard /> <span>Donate via Card</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PayPalScriptProvider>
    );
};

export default DonateNow;