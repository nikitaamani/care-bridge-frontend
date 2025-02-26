// components/DonationPrompt.js
import { FaDonate } from 'react-icons/fa';

const DonationPrompt = () => {
    return (
        <section className="bg-gray-100 text-gray-800 py-16">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
                <p className="text-lg mb-8">Your donation helps provide essential resources like clean water, education, and sanitary products to those in need. Every little bit counts.</p>

                {/* Donation Form */}
                <div className="space-y-6">
                    <input
                        type="number"
                        placeholder="Enter donation amount"
                        className="w-full max-w-sm mx-auto p-4 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        step="0.01"
                    />
                    <div className="flex justify-center space-x-6">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-3">
                            <FaDonate />
                            <span>Donate Now</span>
                        </button>
                        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200 flex items-center space-x-3">
                            <FaDonate />
                            <span>Learn More</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationPrompt;
