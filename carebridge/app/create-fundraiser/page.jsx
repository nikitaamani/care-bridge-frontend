"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Upload } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function CreateFundraiser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "Education",
    goalAmount: "",
    deadline: "",
    description: "",
    image: null,
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAgreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log("Fundraiser Data:", formData);
    router.push("/fundraiser-success"); // Redirect after submission
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Content Wrapper */}
      <div className="flex-grow flex justify-center items-center bg-slate-100 p-14">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center">Create a Fundraiser</h1>
          <p className="text-gray-600 text-center mt-2">
            Start your campaign and make a difference!
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Fundraiser Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                name="title"
                placeholder="Fundraiser Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Disaster Relief">Disaster Relief</option>
              </select>
            </div>

            {/* Goal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Goal Amount ($)</label>
              <Input
                name="goalAmount"
                type="number"
                placeholder="Enter amount"
                value={formData.goalAmount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <Input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fundraiser Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                name="description"
                placeholder="Tell people why you're fundraising..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-md">
                  <Upload className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-blue-500">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {formData.image && (
                  <span className="text-gray-600 text-sm">{formData.image.name}</span>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                required
              />
              <label className="text-gray-700 text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Create Fundraiser
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Stays at Bottom */}
      <Footer className="w-full mt-auto" />
    </div>
  );
}
