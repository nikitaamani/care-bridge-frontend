"use client"; // Required for Next.js App Router

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ensure token persists after page refresh
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("https://carebridge-backend-fys5.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // Store token
      localStorage.setItem("user_role", data.role); // Store role
      setIsLoggedIn(true);

      // Redirect based on role
      router.push(
        data.role === "admin"
          ? "/admin-dashboard"
          : data.role === "charity"
          ? "/charity-dashboard"
          : "/donor-dashboard"
      );
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginError(error.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://carebridge-backend-fys5.onrender.com/auth/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
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

            {loginError && <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded">{loginError}</div>}

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
                    <span className="absolute right-3 top-9 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
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

                  <button
                    type="button"
                    className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-black py-2 rounded mt-2 hover:bg-gray-200"
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle className="text-xl" />
                    <span>Sign in with Google</span>
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
