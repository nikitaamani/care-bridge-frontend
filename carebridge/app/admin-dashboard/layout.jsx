"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import admin from "./admin.module.css";
import 'remixicon/fonts/remixicon.css';

export default function Layout({ children }) {

  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        sessionStorage.removeItem("adminToken");
        router.push("/login");
      })
      .catch((err) => console.error("Logout failed:", err));
  };
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/typicode/demo/profile")
      .then((res) => res.json())
      .then((data) => setUser(data.name || "Kenyan"));
  }, []);

  return (
    <div className={admin.main}>
      {/* Menu Button for Mobile */}
      <button className={admin.menuButton} onClick={toggleSidebar}>
        <i className="ri-menu-line"></i>
      </button>

      {/* Sidebar */}
      <div className={`${admin.left} ${isSidebarOpen ? admin.active : ""}`}>

        <nav className={admin.navigation}>
          <Link href="/admin-dashboard" className={pathname === "/admin" ? admin.active : ""}>
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
          <Link href="/admin-dashboard/settings" className={pathname.includes("settings") ? admin.active : ""}>
            <i className="ri-settings-5-line"></i>
            <span>Settings</span>
          </Link>
        </nav>
        <div className={admin.bottom}>
        <div className={admin.holder}></div>
        <h1>{user}</h1>
        </div>
        <button className="{admin.checker} bg-[#F55920] text-white px-5 py-2 rounded hover:bg-[#F55920]" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className={admin.right}>
        
        {children}
      </div>
    </div>
  );
}
