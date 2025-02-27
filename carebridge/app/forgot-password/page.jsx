"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";

const ForgotPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/request-password-reset", values);
      setSuccessMessage(response.data.message || "Check your email for reset instructions.");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong. Please try again.");
      setSuccessMessage("");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Forgot Password</h2>
        <p className="text-center text-black mb-4">
          Enter your email, and we'll send you a password reset link.
        </p>

        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-black">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded text-black" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-black">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
