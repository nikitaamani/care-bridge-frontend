"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ImpactStories() {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
  const [editingStoryId, setEditingStoryId] = useState(null); // Track which story is being edited
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get("https://carebridge-backend-fys5.onrender.com/stories", {
        withCredentials: true,
      });
      setStories(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching stories:", error);
      setError("Failed to fetch stories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("You must be logged in to create a story.");
        return;
      }

      const payload = {
        title,
        content,
        image_url: imageUrl, // Include image_url in the payload
      };

      if (editingStoryId) {
        // Update existing story
        await axios.put(

          `https://carebridge-backend-fys5.onrender.com/stories/${editingStoryId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setEditingStoryId(null); // Reset editing state
      } else {
        // Create new story

        await axios.post("https://carebridge-backend-fys5.onrender.com/stories", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }

      fetchStories(); // Refresh stories
      setTitle("");
      setContent("");
      setImageUrl("");
      setError("");
    } catch (error) {
      console.error("Error creating/updating story:", error);
      setError("Failed to post story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (story) => {
    setTitle(story.title);
    setContent(story.content);
    setImageUrl(story.image_url); // Pre-fill image_url when editing
    setEditingStoryId(story.id);
  };

  const handleDelete = async (storyId) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("You must be logged in to delete a story.");
        return;
      }


      await axios.delete(`https://carebridge-backend-fys5.onrender.com/stories/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      fetchStories(); // Refresh stories
      setError("");
    } catch (error) {
      console.error("Error deleting story:", error);
      setError("Failed to delete story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Impact Stories</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : editingStoryId ? "Update Story" : "Post Story"}
        </button>
        {editingStoryId && (
          <button
            type="button"
            onClick={() => {
              setEditingStoryId(null);
              setTitle("");
              setContent("");
              setImageUrl("");
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel Edit
          </button>
        )}
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading ? (
        <p>Loading stories...</p>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-gray-700">{story.content}</p>
              {story.image_url && (
                <img
                  src={story.image_url}
                  alt={story.title}
                  className="mt-2 rounded-lg"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleEdit(story)}
                  className="text-green-500 hover:text-green-700 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}