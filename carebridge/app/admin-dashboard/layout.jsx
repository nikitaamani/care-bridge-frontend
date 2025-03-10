"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import admin from "./admin.module.css";
import "remixicon/fonts/remixicon.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    fetch("https://carebridge-backend-fys5.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        sessionStorage.removeItem("adminToken");
        router.push("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        alert("Logout failed. Please try again.");
      });
  };

  // Fetch user data
  

  return (
    <div className={admin.main}>
      {/* Menu Button for Mobile */}
      <button className={admin.menuButton} onClick={toggleSidebar}>
        <i className="ri-menu-line"></i>
      </button>

      {/* Sidebar */}
      <div className={`${admin.left} ${isSidebarOpen ? admin.active : ""}`}>
        <nav className={admin.navigation}>
          <Link href="/admin-dashboard" className={pathname === "/admin-dashboard" ? admin.active : ""}>
            <i className="ri-home-3-line"></i>
            <span>Home</span>
          </Link>
          <Link href="/admin-dashboard/charity-applications" className={pathname.includes("charity-applications") ? admin.active : ""}>
            <i className="ri-mail-settings-line"></i>
            <span>Charity Applications</span>
          </Link>
          <Link href="/admin-dashboard/manage-charities" className={pathname.includes("manage-charities") ? admin.active : ""}>
            <i className="ri-user-heart-fill"></i>
            <span>Manage Charities</span>
          </Link>
          <Link href="/admin-dashboard/users" className={pathname.includes("users") ? admin.active : ""}>
            <i className="ri-user-settings-line"></i>
            <span>User Management</span>
          </Link>
          <Link href="/admin-dashboard/statistics" className={pathname.includes("statistics") ? admin.active : ""}>
            <i className="ri-bar-chart-fill"></i>
            <span>Platform Statistics</span>
          </Link>
        </nav>

        {/* User Info and Logout Button */}
        <div className={admin.bottom}>
          <p className="text-center font-semibold">{user}</p>
          <button
            className="bg-[#F55920] text-white px-5 py-2 rounded hover:bg-[#F55920] mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={admin.right}>{children}</div>
    </div>
  );
}