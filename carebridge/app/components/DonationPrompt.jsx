"use client";
import { useState } from "react";
import Link from "next/link";
import { Progress } from "../components/ui/progress"; // Relative import
import { Button } from "../components/ui/button";   // Relative import
import { Share2, Plus, Heart, Users } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FundraisingPage() {
  const [raisedAmount, setRaisedAmount] = useState(7500);
  const goalAmount = 10000;
  const progress = (raisedAmount / goalAmount) * 100;

  // Function to handle fundraiser creation
  const handleStartFundraiser = () => {
    toast.info("Redirecting to fundraiser creation page...");
    setTimeout(() => {
      window.location.href = "/create-fundraiser"; // Adjust this route if needed
    }, 2000);
  };

  // Function to handle sharing challenge
  const handleShareChallenge = async () => {
    const shareText = "Join the #CareBridgeChallenge! Donate $10 and tag 3 friends to do the same.";
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: "CareBridge Challenge", text: shareText, url: shareUrl });
        toast.success("Challenge shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Failed to share the challenge.");
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.info("Challenge link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">CareBridge Fundraising</h1>
          <p className="text-lg text-gray-600 mt-3">
            Join us in making a difference! Start a campaign, track donations, or take on a social media challenge.
          </p>
        </div>

        {/* Real-Time Donation Tracker */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-blue-800">Real-Time Donation Tracker</h2>
          <p className="text-gray-700 mt-2">
            ${raisedAmount.toLocaleString()} out of ${goalAmount.toLocaleString()} raised this month!
          </p>
          <Progress value={progress} className="w-full h-3 mt-4 bg-blue-100" />
          <div className="text-sm text-gray-600 mt-2">
            {progress.toFixed(1)}% of the goal achieved
          </div>
        </div>

        {/* Peer-to-Peer Fundraising */}
        <div className="mt-8 bg-green-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-green-800">Start Your Own Fundraiser</h2>
              <p className="text-gray-700 mt-1">
                Create a birthday fundraiser and invite your friends to support!
              </p>
            </div>
          </div>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            onClick={handleStartFundraiser}
          >
            <Plus className="w-5 h-5 mr-2" /> Start Fundraiser
          </Button>
        </div>

        {/* Social Media Challenge */}
        <div className="mt-8 bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-purple-800">#CareBridgeChallenge</h2>
              <p className="text-gray-700 mt-1">
                Donate $10 and tag 3 friends to do the same!
              </p>
            </div>
          </div>
          <Button
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto flex items-center"
            onClick={handleShareChallenge}
          >
            <Share2 className="w-5 h-5 mr-2" /> Share Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}
