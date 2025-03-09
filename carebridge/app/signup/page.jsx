"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().oneOf(["admin", "donor", "charity"], "Invalid role").required("Role is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Sending signup request:", values); // Debugging

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword, // Ensure confirmPassword is sent
        role: values.role || "donor", // Default to "donor" if empty
      });

  
      let responseData;
      try {
        responseData = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        throw new Error("Internal server error");
      }
  
      console.log("Response from backend:", responseData);
      if (!response.ok) throw new Error(responseData.error || "Signup failed");
      console.log("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(`Signup failed: ${error.response?.data?.error || error.message}`);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="w-80 p-6 bg-white shadow-md rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <Field type="text" name="username" className="w-full p-2 border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <Field type="email" name="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium">Password</label>
              <div className="flex items-center">
                <Field type={showPassword ? "text" : "password"} name="password" className="w-full p-2 border rounded" />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <div className="flex items-center">
                <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="w-full p-2 border rounded" />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Role</label>
              <Field as="select" name="role" className="w-full p-2 border rounded">
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="donor">Donor</option>
                <option value="charity">Charity</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center mt-4">
              <p>Or sign up with</p>
              <button type="button" className="flex items-center justify-center w-full py-2 mt-2 border rounded hover:bg-gray-100">
                <FcGoogle className="mr-2" /> Google
              </button>
            </div>

            <p className="text-center mt-4">
              Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;

