"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { Button } from "../components/ui/button";
import { Share2, ArrowRight, Plus } from "lucide-react";

export default function FundraiserSuccess() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Handle resizing for dynamic window size updates
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Example fundraiser data (Replace with actual data)
  const fundraiser = {
    title: "Help Build a School in Kenya",
    goalAmount: 10000,
    deadline: "2023-12-31",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 🎉 Confetti Effect */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        gravity={0.2}
        recycle={false}
      />

      {/* Main Content */}
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 text-center">
          {/* Celebration Emoji */}
          <div className="text-6xl mb-4">🎉</div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4">Your fundraiser has been created successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for starting your campaign. Here's a summary of your fundraiser:
          </p>

          {/* Fundraiser Details */}
          <div className="bg-blue-50 p-6 rounded-lg text-left space-y-4 mb-8">
            <div>
              <span className="font-semibold">Title:</span> {fundraiser.title}
            </div>
            <div>
              <span className="font-semibold">Goal Amount:</span> ${fundraiser.goalAmount}
            </div>
            <div>
              <span className="font-semibold">Deadline:</span> {fundraiser.deadline}
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
              onClick={() => router.push("/share-fundraiser")}
            >
              <Share2 className="w-5 h-5 mr-2" /> Share Fundraiser
            </Button>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
              onClick={() => router.push("/view-fundraiser")}
            >
              <ArrowRight className="w-5 h-5 mr-2" /> View Fundraiser
            </Button>
            <Button
              className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center"
              onClick={() => router.push("/create-fundraiser")}
            >
              <Plus className="w-5 h-5 mr-2" /> Create Another Fundraiser
            </Button>
          </div>

          {/* Tips for Success */}
          <div className="mt-8 text-gray-600 text-sm">
            <p className="font-semibold">Tips for Success:</p>
            <ul className="list-disc list-inside">
              <li>Share your fundraiser with friends and family.</li>
              <li>Post updates regularly to keep donors engaged.</li>
              <li>Thank your donors personally.</li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="mt-8">
            <p className="text-gray-600">
              Need help?{" "}
              <a href="/contact" className="text-blue-500 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}