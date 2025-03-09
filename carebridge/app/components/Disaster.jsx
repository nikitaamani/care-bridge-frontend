"use client";
import Image from "next/legacy/image";
import Link from "next/link";

export default function DisasterRecovery() {
  // Affected countries suffering from disasters
  const affectedCountries = [
    {
      src: "https://images.pexels.com/photos/25228172/pexels-photo-25228172/free-photo-of-men-on-boat-on-water-in-village-during-flood.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Flood in Bangladesh",
      country: "Bangladesh",
      crisis: "Severe flooding has displaced thousands, leaving communities without access to clean water and shelter."
    },
    {
      src: "https://images.pexels.com/photos/11477799/pexels-photo-11477799.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Earthquake destruction in Turkey",
      country: "Turkey",
      crisis: "A devastating earthquake has reduced homes and infrastructure to rubble, requiring urgent humanitarian aid."
    },
    {
      src: "https://images.pexels.com/photos/10629468/pexels-photo-10629468.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Drought in Sudan",
      country: "Sudan",
      crisis: "A prolonged drought has left millions facing food and water shortages, worsening the humanitarian crisis."
    },
    {
      src: "https://images.pexels.com/photos/2898214/pexels-photo-2898214.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "War-torn region in Ukraine",
      country: "Ukraine",
      crisis: "Ongoing conflict has displaced millions, leading to a dire need for medical aid, food, and safe shelter."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section - Left Image, Right Content */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <Image 
            src="https://images.pexels.com/photos/10629468/pexels-photo-10629468.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Disaster Recovery Hero" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left mt-6 md:mt-0">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Disaster Recovery</h1>
          <p className="text-lg text-gray-700">
            Providing aid and hope to communities affected by disasters. 
            Join us in making a difference.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Supporting Communities in Crisis</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <strong>Carebridge</strong> is committed to providing emergency relief 
          in regions affected by <strong>natural disasters, conflicts, and humanitarian crises</strong>. 
          Your support helps deliver clean water, food, medical assistance, and safe shelter.
        </p>
      </div>

      {/* Affected Countries Section */}
      <div className="bg-white py-16">
        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-10">Countries in Crisis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 container mx-auto px-6">
          {affectedCountries.map((country, index) => (
            <div 
              key={index} 
              className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out bg-white">
              <Image src={country.src} alt={country.alt} width={300} height={200} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">{country.country}</h4>
                <p className="text-sm text-gray-700 mt-2">{country.crisis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
