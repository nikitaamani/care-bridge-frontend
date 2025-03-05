"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const LearnMore = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-black mb-4">
            Make Your Giving Simpler and More Impactful!
          </h1>
          <p className="text-lg text-black mb-6">
            The Giving Basket allows you to support multiple charities in one easy checkout.
          </p>
          <Link
            href="/donate"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2">
          <Image
            src="/45.jpeg"
            alt="Giving Basket"
            width={600}
            height={400}
            className="rounded-lg"
            unoptimized
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Here’s How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
            title: "1. Donate Easily",
            desc: "Click the 'Donate' button on any charity's profile to start.",
            img: "/pexelsc.jpg"
          }, {
            title: "2. Support Many Causes",
            desc: "Add multiple charities to your Giving Basket and check out at once.",
            img: "/pexels.jpg"
          }, {
            title: "3. Control Your Privacy",
            desc: "Choose how much personal information to share (or not share).",
            img: "/Safe.jpeg"
          }, {
            title: "4. Make It Personal",
            desc: "Donate in honor of a loved one, and send them a personalized notification.",
            img: "/donar.jpeg"
          }].map((step, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center">
              <Image
                src={step.img}
                alt={step.title}
                width={300}
                height={200}
                className="rounded-lg mx-auto mb-4"
                unoptimized
              />
              <h3 className="text-xl font-semibold text-black">{step.title}</h3>
              <p className="text-black mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Benefits Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Additional benefits of using the Giving Basket
        </h2>
        <div className="max-w-2xl mx-auto">
          {["Donate as much (or as little) as you want", "Easily keep track of your donations", "More of your donation goes toward the cause", "Set up recurring donations"].map((title, index) => (
            <div key={index} className="border-b border-gray-300 py-3">
              <button
                className="flex justify-between w-full text-lg font-semibold text-black"
                onClick={() => toggleAccordion(index)}
              >
                {title}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-black">Detailed information about {title.toLowerCase()}.</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-black">
          <strong>Questions?</strong> <Link href="/knowledgebase" className="text-blue-600 underline">Visit our knowledgebase</Link> for more information about the Giving Basket.
        </p>
      </div>

      {/* Charity Search Section */}
      <div className="container mx-auto px-6 py-12 bg-gray-50 rounded-lg flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <Image
            src="/Unity.jpeg"
            alt="Search for Charity"
            width={600}
            height={400}
            className="rounded-lg"
            unoptimized
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left px-6">
          <h3 className="text-2xl font-bold text-black mb-3">Looking for a charity that aligns with your passions?</h3>
          <p className="text-black mb-4">
            Use the search bar in the navigation to enter keywords and browse by cause or to find a specific charity and view their rating and profile.
          </p>
          <Link
            href="/search"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Search Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LearnMore;
