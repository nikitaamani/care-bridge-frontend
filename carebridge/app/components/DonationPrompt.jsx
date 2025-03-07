"use client";
import { useState } from "react";
import Link from "next/link";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Share2, Plus, Heart, Users } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FundraisingPage() {
  const [raisedAmount, setRaisedAmount] = useState(7500);
  const goalAmount = 10000;
  const progress = (raisedAmount / goalAmount) * 100;

  const handleStartFundraiser = () => {
    toast.info("Redirecting to fundraiser creation page...");
    setTimeout(() => {
      window.location.href = "/create-fundraiser";
    }, 2000);
  };

  const handleShareChallenge = async () => {
    const shareText = "Join the #CareBridgeChallenge! Donate $10 and tag 3 friends to do the same.";
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: "CareBridge Challenge", text: shareText, url: shareUrl });
        toast.success("Challenge shared successfully!");
      } catch (error) {
        toast.error("Failed to share the challenge.");
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.info("Challenge link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Banner Section with Image */}
        <div className="relative">
          <img
            src="/2.jpeg"
            alt="Fundraising"
            className="w-full h-64 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4 rounded-xl">
            <h1 className="text-4xl font-bold">CareBridge Fundraising</h1>
            <p className="text-lg mt-2">Make a difference with your donation!</p>
          </div>
        </div>

        {/* Real-Time Donation Tracker */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h2 className="text-2xl font-semibold text-blue-800">Donation Progress</h2>
          <p className="text-gray-700 mt-2">
            ${raisedAmount.toLocaleString()} raised out of ${goalAmount.toLocaleString()}!
          </p>
          <Progress value={progress} className="w-full h-3 mt-4 bg-blue-100" />
          <div className="text-sm text-gray-600 mt-2">{progress.toFixed(1)}% achieved</div>
        </div>

        {/* Fundraising & Challenge Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Start Fundraiser */}
          <div className="p-6 bg-green-50 rounded-xl flex flex-col items-center text-center">
            <Heart className="w-12 h-12 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-800 mt-4">Start a Fundraiser</h2>
            <p className="text-gray-700 mt-2">Create a campaign and invite friends!</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={handleStartFundraiser}>
              <Plus className="w-5 h-5 mr-2" /> Start Now
            </Button>
          </div>

          {/* Social Media Challenge */}
          <div className="p-6 bg-purple-50 rounded-xl flex flex-col items-center text-center">
            <Users className="w-12 h-12 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-800 mt-4">#CareBridgeChallenge</h2>
            <p className="text-gray-700 mt-2">Donate $10 & tag 3 friends!</p>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleShareChallenge}>
              <Share2 className="w-5 h-5 mr-2" /> Share Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
