"use client";

import React, { useState } from "react";
import Link from "next/link";

const ImpactStories = () => {
  const [stories, setStories] = useState([
    { id: 1, title: "Clean Water for Village A", category: "Clean Water", description: "Providing clean drinking water to 100 families." },
    { id: 2, title: "Sanitary Supplies for Schools", category: "Sanitary Supplies", description: "Distributed 500 sanitary pads to school girls." },
  ]);

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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border">
                <td className="border p-2">{story.title}</td>
                <td className="border p-2">{story.category}</td>
                <td className="border p-2">{story.description}</td>
                <td className="border p-2">
                  <Link href={`/impact-stories/${story.id}`} className="text-blue-500 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add New Story Form */}
      <div className="p-4 shadow-lg bg-white w-full rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add New Story</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Title" className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Category" className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Description" className="w-full p-2 border border-gray-300 rounded-lg" />
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImpactStories;
