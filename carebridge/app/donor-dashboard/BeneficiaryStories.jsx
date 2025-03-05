import React, { useState, useEffect } from "react";

const BeneficiaryStories = () => {
  const [stories, setStories] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStoriesAndBeneficiaries = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:5000/donor/beneficiary-stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setStories(data.stories);
          setBeneficiaries(data.beneficiaries);
        } else {
          setError(data.error || "Failed to fetch beneficiary stories.");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoriesAndBeneficiaries();
  }, []);

  if (loading) {
    return <p>Loading stories and beneficiaries...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Beneficiary Stories</h2>

      {/* Display Stories */}
      <div className="space-y-6">
        {stories.length === 0 ? (
          <p>No stories found.</p>
        ) : (
          stories.map((story) => (
            <div key={story.id} className="border p-4 rounded-lg">
              {story.image_url && (
                <img
                  src={story.image_url}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="text-gray-700">{story.content}</p>
              <p className="text-sm text-gray-500">
                Published on: {new Date(story.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Display Beneficiaries */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Beneficiaries</h2>
      {beneficiaries.length === 0 ? (
        <p>No beneficiaries found.</p>
      ) : (
        <div className="space-y-4">
          {beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{beneficiary.name}</h3>
              <p className="text-gray-700">{beneficiary.description}</p>
              <p className="text-gray-700"><strong>Location:</strong> {beneficiary.location}</p>
              <p className="text-gray-700"><strong>Needs:</strong> {beneficiary.needs}</p>
              <p className="text-sm text-gray-500">
                Added on: {new Date(beneficiary.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryStories;