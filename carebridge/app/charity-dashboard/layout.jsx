"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import admin from "./admin.module.css";
import "remixicon/fonts/remixicon.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={admin.main}>
      {/* Menu Button for Mobile */}
      <button className={admin.menuButton} onClick={toggleSidebar}>
        <i className="ri-menu-line"></i>
      </button>

      {/* Sidebar */}
      <div className={`${admin.left} ${isSidebarOpen ? admin.active : ""}`}>
        <nav className={admin.navigation}>
          <Link href="/charity-dashboard/dashboard" className={pathname === "/charity-dashboard" ? admin.active : ""}>
            <i className="ri-home-3-line"></i>
            <span>Home</span>
          </Link>
          <Link href="/charity-dashboard/manage-donations" className={pathname.includes("manage-donations") ? admin.active : ""}>
            <i className="ri-mail-settings-line"></i>
            <span>Manage Donations</span>
          </Link>
          <Link href="/charity-dashboard/impact-stories" className={pathname.includes("impact-stories") ? admin.active : ""}>
            <i className="ri-user-heart-fill"></i>
            <span>Impact Stories</span>
          </Link>
          <Link href="/charity-dashboard/beneficiaries" className={pathname.includes("beneficiaries") ? admin.active : ""}>
            <i className="ri-user-settings-line"></i>
            <span>Beneficiaries</span>
          </Link>
          <Link href="/charity-dashboard/settings" className={pathname.includes("settings") ? admin.active : ""}>
            <i className="ri-settings-5-line"></i>
            <span>Settings</span>
          </Link>
        </nav>
        <div className={admin.bottom}>
        <div className={admin.holder}></div>
        <h1>Kenyan</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={admin.right}>{children}</div>
    </div>
  );
}
