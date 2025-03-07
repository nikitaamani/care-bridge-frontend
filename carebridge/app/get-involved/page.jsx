"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaFacebook, FaTwitter, FaLinkedin, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const GetInvolved = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const animateCount = (target, setCount, increment) => {
      let currentCount = 0;
      const updateCount = () => {
        currentCount += increment;
        if (currentCount >= target) {
          setCount(target);
          return;
        }
        setCount(currentCount);
        requestAnimationFrame(updateCount);
      };
      updateCount();
    };

    animateCount(5000, setCount1, 50);
    animateCount(1200, setCount2, 10);
    animateCount(50000, setCount3, 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Thank you for signing up as a volunteer!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to submit volunteer form");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="bg-black" />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/8061642/pexels-photo-8061642.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get Involved</h1>
          <p className="text-lg md:text-xl max-w-2xl">Join us in making a difference in people's lives through volunteering and support.</p>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.pexels.com/photos/6565756/pexels-photo-6565756.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Volunteering"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-bold opacity-0 hover:opacity-100 transition duration-300">
                Join Us & Make a Difference
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-800">Volunteer With Us</h2>
              <p className="text-lg text-gray-600">Be part of a movement that’s changing lives. Your time and skills can make a real impact.</p>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <span className="text-3xl font-bold text-blue-600">{count1}+</span>
                  <p className="text-sm text-gray-600 mt-2">Volunteers</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <span className="text-3xl font-bold text-green-600">{count2}+</span>
                  <p className="text-sm text-gray-600 mt-2">Projects Completed</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <span className="text-3xl font-bold text-red-600">{count3}+</span>
                  <p className="text-sm text-gray-600 mt-2">Lives Impacted</p>
                </div>
              </div>

              {/* Volunteer Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Why do you want to volunteer?"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Become a Volunteer"}
                </button>
              </form>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-lg flex items-center">
                  <FaCheckCircle className="mr-2" /> {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg flex items-center">
                  <FaExclamationCircle className="mr-2" /> {errorMessage}
                </div>
              )}

              {/* Testimonial */}
              <blockquote className="mt-6 italic text-gray-700">
                "Volunteering here changed my life. I never knew I could make such an impact!" – Alex, Volunteer
              </blockquote>

              {/* Social Media Links */}
              <div className="flex justify-center space-x-6">
                <FaFacebook className="text-blue-600 text-2xl cursor-pointer hover:text-blue-700" />
                <FaTwitter className="text-blue-400 text-2xl cursor-pointer hover:text-blue-500" />
                <FaLinkedin className="text-blue-700 text-2xl cursor-pointer hover:text-blue-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetInvolved;