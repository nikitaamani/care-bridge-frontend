"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing token.");
    }
  }, [token]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: values.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Password reset failed");
      }

      setSuccessMessage("Password successfully reset! Redirecting...");
      setErrorMessage("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setErrorMessage(error.message);
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
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Reset Password</h2>

        {token ? (
          <>
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="relative">
                    <label className="block text-black">New Password</label>
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

                  <div className="relative">
                    <label className="block text-black">Confirm Password</label>
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="w-full p-2 border rounded text-black"
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer text-gray-600"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 hover:bg-blue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <p className="text-red-500 text-center">Invalid or missing token.</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
