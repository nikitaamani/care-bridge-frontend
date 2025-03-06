'use client';
import { useState } from "react";
import Link from "next/link";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCause, setSelectedCause] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Example charity data (replace with real data from an API)
  const charities = [
    { id: 1, name: "Clean Water Initiative", cause: "Environment", description: "Providing clean water to underserved communities.", rating: 4.5, image: "/water.jpg" },
    { id: 2, name: "Girls' Education Fund", cause: "Education", description: "Empowering girls through education and mentorship.", rating: 4.8, image: "/education.jpg" },
    { id: 3, name: "Food for All", cause: "Poverty Alleviation", description: "Delivering nutritious meals to families in need.", rating: 4.2, image: "/food.jpg" },
  ];

  const handleSearch = () => {
    setLoading(true);
    setError("");

    // Simulate API call with a delay
    setTimeout(() => {
      try {
        const results = charities.filter(
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

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        Find a Charity
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or cause..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={selectedCause}
          onChange={(e) => setSelectedCause(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">All Causes</option>
          <option value="Environment">Environment</option>
          <option value="Education">Education</option>
          <option value="Poverty Alleviation">Poverty Alleviation</option>
        </select>
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
      {error && (
        <div className="text-center text-red-600 my-8">
          {error}
        </div>
      )}

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
            <p className="text-sm text-gray-500">Cause: {charity.cause}</p>
            <p className="text-sm text-gray-500">Rating: {charity.rating} ★</p>
            <Link
              href={`/set/${charity.id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;