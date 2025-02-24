"use client";
import Footer from '../components/Footer';

export default function Team() {
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
        <div className="min-h-screen flex flex-col justify-center p-6 bg-gray-100">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">


            {/* Navbar */}
          <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Carebridge</h1>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-700 hover:text-blue-500">Home</a></li>
              <li><a href="/about" className="text-gray-700 hover:text-blue-500">About</a></li>
              <li><a href="/gallery" className="text-gray-700 hover:text-blue-500">Gallery</a></li>
              <li><a href="/contact" className="text-gray-700 hover:text-blue-500">Contact</a></li>
            </ul>
          </nav>
            
            {/* CareBridge Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
              <div className="relative w-full h-[500px]">
                <img
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Volunteers working"
                  className="w-full h-full rounded-lg object-cover"
                />
                <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">
                  Welcome
                </h1>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Who We Are</h2>
                <p className="text-gray-700 mb-6">
                  <strong>CareBridge</strong> is dedicated to creating lasting change for underserved, vulnerable, and underprivileged childred in sub-Saharan countries. Our name, <strong>“CareBridge”</strong> symbolizes bridging the gap between those who can give and those in need to create safe environments for children across the sub-saharan countries.
                </p>
    
                <h2 className="text-3xl font-bold text-black mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  <strong>CareBridge Mission</strong> is to ensure every child has the opportunity to thrive and reach their full potential, irrespective of their background or circumstances. We empower children by providing access to education, healthcare, clean water, and advocating for their rights. Through compassion and integrity, we strive to make a lasting positive impact on children’s lives.
                </p>
    
                <h2 className="text-3xl font-bold text-black mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  We envision a world where every child has equal opportunities for growth, development, and success, regardless of their circumstances. By empowering vulnerable children through education, healthcare, clean water, and advocacy, we aim to create lasting change globally.
                </p>
    
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-800">
                  Support Our Vision
                </button>
              </div>
            </div>
    
            {/* Team Section */}
            <h1 className="text-3xl font-bold text-black mb-6 text-center">Meet Our Team</h1>
    
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
          {/* Footer */}
        <Footer />
        </div>
      );
    }