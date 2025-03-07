'use client';
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage("Thank you for signing up! Check your email for confirmation.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="text-center py-20 bg-cover bg-center text-white" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
        <h1 className="text-5xl font-bold mb-4">Join Our Volunteer Team</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Make a lasting impact in the lives of children in need. Volunteer with us and be a part of meaningful change.
        </p>
      </section>
      
      {/* Volunteer Form Section */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Sign Up to Volunteer</h2>
        <p className="text-lg text-gray-600 mb-6">Fill out the form below to join our volunteer team.</p>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input 
              type="tel" 
              name="phone" 
              placeholder="Your Phone Number" 
              value={formData.phone} 
              onChange={handleChange} 
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <textarea 
              name="message" 
              placeholder="Tell us why you want to volunteer" 
              value={formData.message} 
              onChange={handleChange} 
              rows="4"
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
