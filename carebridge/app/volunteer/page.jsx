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
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for signing up! We will reach out soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
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
      
      {/* Why Volunteer Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Become a Volunteer?</h2>
        <p className="text-lg text-gray-600 mb-6">Volunteering with us allows you to contribute to a cause you care about while gaining valuable experiences.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Make a Difference</h3>
            <p className="text-gray-600">Help provide essential aid and education to children in need.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Meet Like-Minded People</h3>
            <p className="text-gray-600">Connect with a community of passionate volunteers.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Gain Experience</h3>
            <p className="text-gray-600">Develop valuable skills while making a real impact.</p>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Sign Up to Volunteer</h2>
        <p className="text-lg text-gray-600 mb-6">Fill out the form below to join our volunteer team.</p>
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            Submit
          </button>
        </form>
      </section>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
