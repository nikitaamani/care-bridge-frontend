"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png')" }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-black mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button 
            type="submit" 
            className="w-full bg-[#202952] text-white py-2 rounded transition-colors duration-300 hover:bg-[#F55920]"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-black">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#2f449e] hover:text-[#F55920]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
