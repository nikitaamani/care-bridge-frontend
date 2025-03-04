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
  const router = useRouter(); // Initialize useRouter

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setIsAnonymous(data.is_anonymous || false); // Default to false if not provided
          setReceiveReminders(data.receive_reminders || false); // Default to false if not provided
        } else {
          setError(data.error || "Failed to fetch profile data");
        }
      } catch (err) {
        setError("Network error. Try again later.");
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update
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
    };
  
    // Only include password if it's not empty
    if (password) {
      profileData.password = password;
    }
  
    try {
      const response = await fetch("http://localhost:5000/profile", {
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove the token
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mr-2"
            />
            Donate Anonymously
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              checked={receiveReminders}
              onChange={(e) => setReceiveReminders(e.target.checked)}
              className="mr-2"
            />
            Receive Reminders
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsPage;