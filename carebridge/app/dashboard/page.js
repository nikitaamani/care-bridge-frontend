"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      localStorage.setItem("token", token);
      console.log("Token stored:", token);
    }
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Welcome to the Dashboard!
        <p>This is a test web page to show that google authentication works,<br></br> The site is still under construction</p>
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;