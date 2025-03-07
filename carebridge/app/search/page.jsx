'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCause, setSelectedCause] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    donationType: "One-time",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // List of Pexels images for charity cards
  const pexelsImages = [
    "https://images.pexels.com/photos/593522/pexels-photo-593522.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6646930/pexels-photo-6646930.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // Fetch charities from backend
  useEffect(() => {
    const fetchCharities = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://carebridge-backend-fys5.onrender.com/charities");
        if (!response.ok) throw new Error("Failed to fetch charities.");
        let data = await response.json();

        // Add images to each charity dynamically
        const updatedData = data.map((charity, index) => ({
          ...charity,
          image: pexelsImages[index % pexelsImages.length], // Cycle through images
        }));

        setSearchResults(updatedData);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCharities();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      try {
        const results = searchResults.filter(
          (charity) =>
            charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            charity.cause.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        if (results.length === 0) {
          setError("No charities found. Try adjusting your search filters.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="bg-white">
      {/* Search Section */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Find a Charity</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name or cause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-center text-red-600 my-8">{error}</div>}

        {/* Search Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((charity) => (
            <div key={charity.id} className="bg-white shadow-lg p-6 rounded-lg">
              <img
                src={charity.image}
                alt={charity.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-black mb-2">{charity.name}</h2>
              <p className="text-gray-600 mb-4">{charity.description}</p>
              <Link
                href={`/set/${charity.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Get Involved Section */}
      <div className="bg-gradient-to-r from-blue-50 to-white py-12">
        <div className="container mx-auto px-6 max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Get Involved</h2>
          {formSubmitted ? (
            <p className="text-green-600 text-center">Thank you for your submission!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              />
              <select
                name="donationType"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              >
                <option value="One-time">One-time Donation</option>
                <option value="Monthly">Monthly Donation</option>
                <option value="In-kind">In-kind Donation</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;