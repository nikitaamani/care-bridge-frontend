"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
      await axios.post("/api/login", values);
      router.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
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
      </div>
    </div>
  );
};

export default LoginPage;
