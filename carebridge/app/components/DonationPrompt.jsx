"use client";
import { useState } from "react";
import Link from "next/link";
import { Progress } from "../components/ui/progress"; // Relative import
import { Button } from "../components/ui/button";   // Relative import
import { Share2 } from "lucide-react";

export default function FundraisingPage() {
  const [raisedAmount, setRaisedAmount] = useState(7500);
  const goalAmount = 10000;
  const progress = (raisedAmount / goalAmount) * 100;

  // Function to handle fundraiser creation
  const handleStartFundraiser = () => {
    alert("Redirecting to fundraiser creation page...");
    window.location.href = "/create-fundraiser"; // Adjust this route if needed
  };

  // Function to handle sharing challenge
  const handleShareChallenge = async () => {
    const shareText = "Join the #CareBridgeChallenge! Donate $10 and tag 3 friends to do the same.";
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: "CareBridge Challenge", text: shareText, url: shareUrl });
        alert("Challenge shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Challenge link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center">CareBridge Fundraising</h1>
        <p className="text-center text-lg text-gray-600 mt-2">
          Join us in making a difference! Start a campaign, track donations, or take on a social media challenge.
        </p>

        {/* Real-Time Donation Tracker */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Real-Time Donation Tracker</h2>
          <p className="text-gray-700 mt-2">${raisedAmount} out of ${goalAmount} raised this month!</p>
          <Progress value={progress} className="w-full h-4 mt-2 bg-gray-300" />
        </div>

        {/* Peer-to-Peer Fundraising */}
        <div className="mt-8 bg-blue-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700">Start Your Own Fundraiser</h2>
          <p className="text-gray-700 mt-2">
            Create a birthday fundraiser and invite your friends to support!
          </p>
          <Button 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white" 
            onClick={handleStartFundraiser}
          >
            Start Fundraiser
          </Button>
        </div>

        {/* Social Media Challenge */}
        <div className="mt-8 bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700">#CareBridgeChallenge</h2>
          <p className="text-gray-700 mt-2">
            Donate $10 and tag 3 friends to do the same!
          </p>
          <Button 
            className="mt-4 bg-green-500 hover:bg-green-600 text-white flex items-center"
            onClick={handleShareChallenge}
          >
            <Share2 className="w-5 h-5 mr-2" /> Share Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}
