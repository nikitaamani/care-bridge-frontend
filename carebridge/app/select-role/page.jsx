"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const SelectRoleContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchedToken = searchParams.get("token");
    const storedToken = localStorage.getItem("access_token");

    if (fetchedToken) {
      setToken(fetchedToken);
      console.log("Token from URL:", fetchedToken);
    } else if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const role = decodedToken.role;
        if (role === "admin") router.push("/admin-dashboard");
        else if (role === "charity") router.push("/charity-dashboard");
        else if (role === "donor") router.push("/donor-dashboard");
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access_token");
        router.push("/login");
      }
    }
  }, [searchParams, router]);

  const handleRoleSelection = async (role) => {
    if (!token) {
      console.error("Token is undefined");
      return;
    }

    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/auth/select-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        localStorage.setItem("role", role);
        router.push(data.redirect || getDefaultRedirect(role));
      } else {
        console.error("Error selecting role:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDefaultRedirect = (role) => {
    if (role === "admin") return "/admin-dashboard";
    if (role === "charity") return "/charity-dashboard";
    return "/donor-dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
        <button
          onClick={() => handleRoleSelection("donor")}
          className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700"
        >
          Donor
        </button>
        <button
          onClick={() => handleRoleSelection("charity")}
          className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700"
        >
          Charity
        </button>
        <button
          onClick={() => handleRoleSelection("admin")}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

const SelectRole = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SelectRoleContent />
  </Suspense>
);

export default SelectRole;
