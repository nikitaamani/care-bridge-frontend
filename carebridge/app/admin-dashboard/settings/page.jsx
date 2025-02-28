"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const [settings, setSettings] = useState({
    username: "Admin",
    password: "",
    confirmPassword: "",
    donationReminder: true,
    profilePicture: null,
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleToggleReminder = () => {
    setSettings({ ...settings, donationReminder: !settings.donationReminder });

    fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donationReminder: !settings.donationReminder }),
    });
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    setSettings({ ...settings, profilePicture: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (settings.password && settings.password !== settings.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", settings.username);
    if (settings.password) formData.append("password", settings.password);
    if (settings.profilePicture) formData.append("profilePicture", settings.profilePicture);

    fetch("/api/admin/update-profile", {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert("Profile Updated Successfully!"))
      .catch((err) => console.error(err));
  };


  return (
    <div className="p-6 bg-white shadow rounded-lg w-full">
      <h2 className="text-xl font-bold mb-9 text-black text-center ">UPDATE SETTINGS</h2>

      {/* Profile Picture Upload */}
      <div className="mb-7">
        <label className="block font-semibold text-black">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleProfilePicture} className="mt-1 block w-full" />
      </div>

      {/* Username Input */}
      <div className="mb-7">
        <label className="block font-semibold text-black">Username</label>
        <input type="text" name="username" value={settings.username} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
      </div>

      {/* Password Input */}
      <div className="mb-7">
        <label className="block font-semibold text-black">New Password</label>
        <input type="password" name="password" value={settings.password} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
      </div>

      {/* Confirm Password Input */}
      <div className="mb-7">
        <label className="block font-semibold text-black">Confirm Password</label>
        <input type="password" name="confirmPassword" value={settings.confirmPassword} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
      </div>

      {/* Donation Reminder Toggle */}
      <label className="flex items-center space-x-2 mb-7 p-2 border border-gray-300 rounded-lg">
        <input
          type="checkbox"
          checked={settings.donationReminder}
          onChange={handleToggleReminder}
          className="h-5 w-5 accent-blue-500"
        />
        <span className="text-gray-900 font-medium">Enable Monthly Donation Reminders</span>
      </label>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-[#202952]" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
