"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-black">Name</label>
            <input {...register("name")} className="w-full p-2 border rounded text-black" />
            <p className="text-black text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block text-black">Email</label>
            <input {...register("email")} className="w-full p-2 border rounded text-black" />
            <p className="text-black text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block text-black">Password</label>
            <input type="password" {...register("password")} className="w-full p-2 border rounded text-black" />
            <p className="text-black text-sm">{errors.password?.message}</p>
          </div>
          <div>
            <label className="block text-black">Confirm Password</label>
            <input type="password" {...register("confirmPassword")} className="w-full p-2 border rounded text-black" />
            <p className="text-black text-sm">{errors.confirmPassword?.message}</p>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#202952] text-white py-2 rounded transition-colors duration-300 hover:bg-[#F55920]"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2f449e] hover:text-[#F55920]">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
