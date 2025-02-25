'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

const GetInvolved = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state

  useEffect(() => {
    setIsMounted(true);

    const animateCount = (target, setCount, increment) => {
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(currentCount);
        }
      }, 30);
      return interval;
    };

    const interval1 = animateCount(5000, setCount1, 50);
    const interval2 = animateCount(1200, setCount2, 10);
    const interval3 = animateCount(50000, setCount3, 500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Navbar Section */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white bg-opacity-80 backdrop-blur-md shadow-md" // Blurred and semi-transparent background
            : "bg-transparent" // Transparent background
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            carebridge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/volunteer"
              className="text-lg text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="text-lg text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Donate
            </Link>
            <Link
              href="/fundraise"
              className="text-lg text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Fundraise
            </Link>
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-white bg-opacity-80 backdrop-blur-md shadow-md`}
        >
          <div className="flex flex-col items-center py-4">
            <Link
              href="/volunteer"
              className="text-lg text-gray-800 hover:text-blue-500 py-2 transition duration-300"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="text-lg text-gray-800 hover:text-blue-500 py-2 transition duration-300"
            >
              Donate
            </Link>
            <Link
              href="/fundraise"
              className="text-lg text-gray-800 hover:text-blue-500 py-2 transition duration-300"
            >
              Fundraise
            </Link>
          </div>
        </div>
      </nav>

      {/* Background Image Section */}
      <section
        className="text-center pt-32 pb-64 bg-cover bg-center p-20 brightness-20"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=600')",
          backgroundAttachment: "fixed",
        }}
      >
        <h2 className="text-4xl font-semibold mb-4 text-black">Why Make a Difference?</h2>
        <p className="text-lg md:text-xl text-black mb-8 max-w-2xl mx-auto">
          Your donation will provide essential products like sanitary items, clean
          water, and educational resources for children in need. Every little bit
          counts, and together we can create lasting change in their lives.
        </p>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">How You Can Help</h3>

          {/* Volunteer Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
            <div className="w-full md:w-1/2">
              <img
                src="pexelsc.jpg"
                alt="Volunteer"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-semibold mb-4">Volunteer with Us</h4>
              <p className="text-lg text-gray-600 mb-6">
                Join our passionate team of volunteers who help make a real
                difference in the lives of children.
              </p>
              <Link
                href="/volunteer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>

          {/* Donate Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
            <div className="w-full md:w-1/2">
              <img
                src="pexelsr.jpg"
                alt="Donate"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-semibold mb-4">Make a Donation</h4>
              <p className="text-lg text-gray-600 mb-6">
                Your donation provides essential products and education for
                children in need. Every bit helps!
              </p>
              <Link
                href="/donate"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Donate Now
              </Link>
            </div>
          </div>

          {/* Fundraising Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
            <div className="w-full md:w-1/2">
              <img
                src="pexels.jpg"
                alt="Fundraise"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-semibold mb-4">Start a Fundraiser</h4>
              <p className="text-lg text-gray-600 mb-6">
                Help raise funds by setting up your own campaign for children in
                need. It’s easy and impactful!
              </p>
              <Link
                href="/fundraise"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Start Fundraising
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h3 className="text-3xl font-semibold mb-6">Your Impact</h3>
        <p className="text-lg text-gray-600 mb-6">
          Thanks to people like you, we’ve achieved so much. But we need your
          help to do even more!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-xl font-semibold text-gray-800">
            <span className="block text-3xl font-bold">{count1}</span> Children
            helped with essential products
          </div>
          <div className="text-xl font-semibold text-gray-800">
            <span className="block text-3xl font-bold">{count2}</span> Hours
            volunteered worldwide
          </div>
          <div className="text-xl font-semibold text-gray-800">
            <span className="block text-3xl font-bold">{count3}</span> Raised in
            community fundraisers
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12 bg-blue-500 text-white">
        <h2 className="text-3xl font-semibold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-8">
          Take the first step in changing a child’s life today. Whether you
          volunteer, donate, or fundraise, your help matters.
        </p>
        <Link
          href="/get-involved"
          className="bg-white text-blue-500 hover:text-blue-600 font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Get Involved Now
        </Link>
      </section>
    </div>
  );
};

export default GetInvolved;
