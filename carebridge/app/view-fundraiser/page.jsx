"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2, Heart, MessageCircle, Gift, ArrowLeft } from "lucide-react";

export default function ViewFundraiser() {
  const router = useRouter();

  // Example fundraiser data (Replace with actual data from API)
  const fundraiser = {
    title: "Help Build a School in Kenya",
    description:
      "We are raising funds to construct a school for children in need. Your contribution will help provide education and a brighter future for hundreds of children.",
    image:
      "https://images.pexels.com/photos/30945259/pexels-photo-30945259/free-photo-of-aerial-view-of-school-campus-with-sports-facilities.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URL
    goalAmount: 10000,
    amountRaised: 5200,
    donors: 120,
    deadline: "2024-12-31",
    organizer: "John Doe",
    topDonors: [
      { name: "Alice Johnson", amount: 500 },
      { name: "Mark Smith", amount: 300 },
      { name: "Sophia Lee", amount: 250 },
    ],
    comments: [
      { name: "David Brown", message: "Great cause! Wishing you success." },
      { name: "Emily Clark", message: "Happy to support this initiative!" },
    ],
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((fundraiser.amountRaised / fundraiser.goalAmount) * 100);
  }, [fundraiser.amountRaised, fundraiser.goalAmount]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Fundraiser Image */}
        <div className="relative h-64 w-full">
          <img
            src={fundraiser.image}
            alt={fundraiser.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {/* Back Button */}
            <Button
              onClick={() => router.back()}
              className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 hover:bg-gray-100 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </Button>
            <h1 className="text-4xl font-bold text-white text-center px-4">
              {fundraiser.title}
            </h1>
          </div>
        </div>

        {/* Fundraiser Info */}
        <div className="p-6">
          <p className="text-gray-600 text-lg">{fundraiser.description}</p>
          <p className="text-gray-500 mt-4">
            Organized by:{" "}
            <span className="font-semibold text-gray-700">
              {fundraiser.organizer}
            </span>
          </p>

          {/* Fundraising Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700">
                Raised ${fundraiser.amountRaised} of ${fundraiser.goalAmount}
              </p>
              <p className="text-sm text-gray-500">{fundraiser.donors} donors</p>
            </div>
            <Progress value={progress} className="h-3 mt-2" />
          </div>

          {/* Donation Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              onClick={() => router.push("/donate")}
            >
              <Gift className="w-5 h-5" /> Donate Now
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" /> Share
            </Button>
          </div>

          {/* Top Donors */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top Donors
            </h2>
            <div className="space-y-3">
              {fundraiser.topDonors.map((donor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <p className="text-gray-700 font-medium">{donor.name}</p>
                  <p className="text-green-600 font-semibold">${donor.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comments & Support Messages
            </h2>
            <div className="space-y-4">
              {fundraiser.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-800">
                      {comment.name}:
                    </span>{" "}
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Updates & Milestones */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Updates & Milestones
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  🎉 50% of our goal reached! Thank you for your support!
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  🏫 We have secured land for the school construction!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
