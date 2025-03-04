"use client";

import React, { useState, useEffect } from "react";

const ImpactStories = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({
    title: "",
    category: "",
    description: "",
  });

  // Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/stories");
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewStory({ ...newStory, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStory.title || !newStory.category || !newStory.description) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStory),
      });

      if (response.ok) {
        const result = await response.json();
        setStories([...stories, { id: result.id, ...newStory }]); // Add new story to list
        setNewStory({ title: "", category: "", description: "" }); // Clear form
      } else {
        console.error("Error adding story");
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Impact Stories</h1>

      {/* Stories Table */}
      <div className="p-4 shadow-lg bg-white w-full mb-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Stories</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border">
                <td className="border p-2">{story.title}</td>
                <td className="border p-2">{story.category}</td>
                <td className="border p-2">{story.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Story Form */}
      <div className="p-4 shadow-lg bg-white w-full rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add New Story</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newStory.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newStory.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newStory.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImpactStories;
