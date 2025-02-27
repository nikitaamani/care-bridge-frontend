"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (by looking for a token)
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      localStorage.setItem("access_token", data.token); // Store token
      localStorage.setItem("user_role", data.role); // Store role
  
      setIsLoggedIn(true);
  
      // Redirect based on role
      switch (data.role) {
        case "donor":
          router.push("/donor-dashboard");
          break;
        case "charity":
          router.push("/charity-dashboard");
          break;
        case "admin":
          router.push("/admin-dashboard");
          break;
        default:
          router.push("/dashboard"); // Fallback in case role is missing
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
    setSubmitting(false);
  };
  

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token
    setIsLoggedIn(false);
    router.push("/login"); // Stay on login page after logout
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">You are logged in</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded transition-colors duration-300 hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-black">Email</label>
                    <Field type="email" name="email" className="w-full p-2 border rounded text-black" />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Password Field with Toggle */}
                  <div className="relative">
                    <label className="block text-black">Password</label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full p-2 border rounded text-black"
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 hover:bg-blue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-center text-black">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-800">
                Sign up here
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
