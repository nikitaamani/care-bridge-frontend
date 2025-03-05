"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google icon

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
    try {
      const response = await axios.post("http://localhost:5000/auth/register", values);
      console.log("Signup Success:", response.data);
      router.push("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
    setSubmitting(false);
  };

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Redirect to dashboard after Google signup
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Sign Up</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-black">Username</label>
                <Field type="text" name="username" className="w-full p-2 border rounded text-black" placeholder="Enter your username" />
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-black">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded text-black" placeholder="Enter your email" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-black">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full p-2 border rounded text-black"
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-black">Confirm Password</label>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full p-2 border rounded text-black"
                  placeholder="Confirm your password"
                />
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-600"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-black">Select Role</label>
                <Field as="select" name="role" className="w-full p-2 border rounded text-black">
                  <option value="">Choose a role...</option>
                  <option value="admin">Admin</option>
                  <option value="donor">Donor</option>
                  <option value="charity">Charity</option>
                </Field>
                <ErrorMessage name="role" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-black py-2 rounded mt-2 hover:bg-gray-200"
              >
                <FcGoogle className="text-xl" />
                <span>Sign up with Google</span>
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;