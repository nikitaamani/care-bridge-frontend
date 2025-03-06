import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HealthCharities() {
  // Success Stories Data
  const successStories = [
    {
      id: 1,
      title: "Amina's Journey",
      description:
        "Meet Amina, a 14-year-old girl who now attends school daily thanks to consistent donations providing her with sanitary pads and hygiene education.",
      image:
        "https://images.pexels.com/photos/31002640/pexels-photo-31002640/free-photo-of-portrait-of-three-smiling-girls-in-hijabs.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Grace's New Beginning",
      description:
        "Grace, a 16-year-old from Kenya, was able to complete her education and secure a scholarship after receiving menstrual health support.",
      image:
        "33.jpeg",
    },
    {
      id: 3,
      title: "Maria's Empowerment",
      description:
        "Maria, a young woman from Uganda, now leads hygiene workshops in her community after benefiting from our programs.",
      image:
        "https://images.pexels.com/photos/29118561/pexels-photo-29118561/free-photo-of-young-nigerian-woman-in-traditional-hijab.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title: "Fatima's Bright Future",
      description:
        "Fatima, a 13-year-old from Tanzania, no longer misses school due to periods and dreams of becoming a doctor.",
      image:
        "https://images.pexels.com/photos/29118559/pexels-photo-29118559/free-photo-of-portrait-of-a-young-woman-in-traditional-wear.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Video Background */}
      <div className="relative w-full h-[80vh] flex flex-col justify-center items-center text-white text-center px-6">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="https://www.youtube.com/watch?v=-A-wzkVsF_k" type="video/mp4" />
        </video>
        <h1 className="text-4xl font-bold drop-shadow-md">
          Empowering Girls Through Health and Hygiene
        </h1>
        <p className="mt-3 text-lg max-w-2xl drop-shadow-md">
          Millions of school-going girls in Sub-Saharan Africa struggle with access to sanitary pads, clean water, and hygienic toilets.
        </p>
        <button className="mt-5 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Help Center
        </button>
      </div>

      {/* How Your Donation Helps */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold">How Your Donation Helps</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/2642/2642656.png" alt="Sanitary Pads" className="w-16 mb-4" />
            <p className="text-lg font-medium">$10 provides a month’s supply of sanitary towels for one girl.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/3176/3176366.png" alt="Toilet" className="w-16 mb-4" />
            <p className="text-lg font-medium">$50 helps build clean toilets in rural schools.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Education" className="w-16 mb-4" />
            <p className="text-lg font-medium">$100+ contributes to menstrual health education programs.</p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center">Success Stories</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white p-4 shadow-lg rounded-lg">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-semibold">{story.title}</h3>
              <p className="mt-2 text-gray-700">{story.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 px-6">
        <h2 className="text-3xl font-semibold">Make a Difference Today</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Donate Now
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HealthCharities;
