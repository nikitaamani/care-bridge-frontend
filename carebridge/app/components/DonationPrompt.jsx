"use client";

import { useRouter } from "next/navigation";
import { FaDonate, FaShareAlt } from "react-icons/fa";

const SocialChallenge = () => {
  const router = useRouter();

  // Handle Donate Action (Redirect to donation page)
  const handleDonate = () => {
    router.push("/donate");
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center bg-white shadow-xl rounded-xl p-8">
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full p-4">
          <img
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Social Challenge"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        
        {/* Right Side: Information */}
        <div className="md:w-1/2 w-full text-center md:text-left p-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Join the Social Challenge!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your donation supports clean water, education, and hygiene for those in need. 
            Each donation brings us closer to our goal and inspires others to join the challenge!
          </p>
          
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Why Participate?</h3>
          <ul className="text-gray-600 mb-6 list-disc pl-6">
            <li>Make a direct impact on communities in need.</li>
            <li>Encourage friends & family to give back.</li>
            <li>Be part of a global movement for change.</li>
          </ul>
          
          <div className="flex justify-center md:justify-start space-x-4">
            <button
              onClick={handleDonate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-3 transition transform hover:scale-105 shadow-md"
            >
              <FaDonate />
              <span className="font-semibold">Donate Now</span>
            </button>
            <button
              className="px-6 py-3 bg-gray-100 text-blue-600 rounded-lg hover:bg-gray-200 flex items-center space-x-3 transition transform hover:scale-105 shadow-md"
            >
              <FaShareAlt />
              <span className="font-semibold">Share Challenge</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialChallenge;
