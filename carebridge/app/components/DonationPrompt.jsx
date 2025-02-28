"use client"; // ✅ Add this line

import { useRouter } from "next/navigation";
import { FaDonate, FaHandHoldingHeart } from "react-icons/fa";

const DonationPrompt = () => {
  const router = useRouter();

  // Handle Donate Action (Redirect or API Call)
  const handleDonate = () => {
    router.push("/donate"); // Redirect to donation page
  };

  // Handle Learn More Action
  const handleLearnMore = () => {
    router.push("/about"); // Redirect to about page
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Make a Difference Today
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your donation helps provide essential resources like clean water,
          education, and sanitary products to those in need. Every little bit
          counts.
        </p>

        {/* Donation Form */}
        <div className="space-y-6">
          <div className="relative w-full max-w-sm mx-auto">
            <span className="absolute left-4 top-3 text-gray-400 text-lg">
              $
            </span>
            <input
              type="number"
              placeholder="Enter donation amount"
              className="w-full p-4 pl-10 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="1"
              step="0.01"
            />
          </div>

          <div className="flex justify-center space-x-6">
            <button
              onClick={handleDonate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-3 transition transform hover:scale-105 shadow-md"
            >
              <FaDonate />
              <span className="font-semibold">Donate Now</span>
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 bg-gray-100 text-blue-600 rounded-lg hover:bg-gray-200 flex items-center space-x-3 transition transform hover:scale-105 shadow-md"
            >
              <FaHandHoldingHeart />
              <span className="font-semibold">Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPrompt;
