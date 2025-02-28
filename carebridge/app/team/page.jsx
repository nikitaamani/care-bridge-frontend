"use client";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function Team() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const teamMembers = [
      {
        name: "Nikita Amani",
        role: "Founder & CEO",
        description: "Leads strategic direction and partnerships.",
        image: "/Nik.jpeg", 
      },
      {
        name: "Brian Nyakundi",
        role: "Program Manager",
        description: "Oversees project implementation and community outreach.",
        image: "/brian.jpeg",
      },
      {
        name: "Philip Emdokolo",
        role: "Finance & Admin",
        description: "Manages budgets, funding, and financial reports.",
        image: "/phil.jpeg",
      },
      {
        name: "Shadrack Kipkemei",
        role: "Volunteer Coordinator",
        description: "Coordinates volunteers and training programs.",
        image: "/Shadrack.jpg",
      },
    ];
  
    return (
        <div className="h-screen flex flex-col">
          {/* Navbar */}
          <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white bg-opacity-80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
            <div className="py-4 px-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Carebridge</h1>
              <ul className="flex space-x-6">
                <li><a href="/" className="text-gray-700 hover:text-blue-500">Home</a></li>
                <li><a href="/about" className="text-gray-700 hover:text-blue-500">About</a></li>
                <li><a href="/gallery" className="text-gray-700 hover:text-blue-500">Gallery</a></li>
                <li><a href="/contact" className="text-gray-700 hover:text-blue-500">Contact</a></li>
              </ul>
            </div>
          </nav>

          {/* Content Wrapper */}
          <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 p-6 pt-20">
            <div className="max-w-6xl w-full ">


              {/* Team Section */}
              <h1 className="text-3xl font-bold text-black my-6 text-center">Meet Our Team</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-3"
                    />
                    <h2 className="text-black font-bold">{member.name}</h2>
                    <p className="text-black font-semibold">{member.role}</p>
                    <p className="text-black text-sm">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      );
}
