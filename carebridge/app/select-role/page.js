"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode"; // Import jwt-decode to decode the JWT token

const SelectRole = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log("Search Params:", searchParams.toString()); // Log the entire search params
    console.log("Token from URL:", token); // Log the token
  }, [searchParams, token]);

  const handleRoleSelection = async (role) => {
    if (!token) {
      console.error("Token is undefined");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/select-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();
      console.log("Response from backend:", data); // Debugging

      if (response.ok) {
        console.log("Role selected successfully:", data);
        if (data.redirect) {
          // Save the role in local storage
          localStorage.setItem("role", role);
          router.push(data.redirect); // Redirect to the appropriate dashboard
        } else {
          console.error("Redirect URL not found in response:", data);
          router.push("/fallback-route"); // Redirect to a default route
        }
      } else {
        // Handle cases where the backend returns an error
        console.error("Error selecting role:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Check if the user is already logged in and redirect them to their dashboard
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken); // Decode the JWT token
        const role = decodedToken.role; // Extract the role from the token

        // Redirect to the appropriate dashboard based on the role
        if (role === "admin") {
          router.push("/admin-dashboard");
        } else if (role === "charity") {
          router.push("/charity-dashboard");
        } else if (role === "donor") {
          router.push("/donor-dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access_token"); // Clear invalid token
        router.push("/login"); // Redirect to login page
      }
    }
  }, [router]);

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

export default SelectRole;