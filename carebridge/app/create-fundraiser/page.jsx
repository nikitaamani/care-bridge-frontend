"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectItem } from "../components/ui/select";
import { Upload } from "lucide-react";

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
    <div className="min-h-screen bg-slate-100 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center">Create a Fundraiser</h1>
        <p className="text-gray-600 text-center mt-2">
          Start your campaign and make a difference!
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Fundraiser Title */}
          <Input
            name="title"
            placeholder="Fundraiser Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Category Selection */}
          <Select name="category" value={formData.category} onChange={handleChange}>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
          </Select>

          {/* Goal Amount */}
          <Input
            name="goalAmount"
            type="number"
            placeholder="Goal Amount ($)"
            value={formData.goalAmount}
            onChange={handleChange}
            required
          />

          {/* Deadline */}
          <Input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          {/* Fundraiser Description */}
          <Textarea
            name="description"
            placeholder="Tell people why you're fundraising..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <Upload className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-blue-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {formData.image && <span className="text-gray-600">{formData.image.name}</span>}
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
            <label className="text-gray-700 text-sm">I agree to the Terms of Service & Privacy Policy.</label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Create Fundraiser
          </Button>
        </form>
      </div>
    </div>
  );
}
