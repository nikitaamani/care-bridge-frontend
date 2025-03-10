"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const ProfileSettingsPage = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receiveReminders, setReceiveReminders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const router = useRouter(); // Initialize useRouter

  // Fetch current profile data (including profile picture)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }

      try {

        const response = await fetch("https://carebridge-backend-fys5.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setIsAnonymous(data.is_anonymous || false);
          setReceiveReminders(data.receive_reminders || false);
          setProfilePicture(data.profile_picture || null); // Set profile picture from backend
        } else {
          setError(data.error || "Failed to fetch profile data");
        }
      } catch (err) {
        setError("Network error. Try again later.");
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update (including profile picture)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    // Prepare profile data
    const profileData = {
      username,
      email,
      is_anonymous: isAnonymous,
      receive_reminders: receiveReminders,
      profile_picture: profilePicture, // Include profile picture in the update
    };

    // Only include password if it's not empty
    if (password) {
      profileData.password = password;
    }

    try {

      const response = await fetch("https://carebridge-backend-fys5.onrender.com/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove the token
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile Settings</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Profile Picture Section */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="text-sm text-gray-700"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsPage;