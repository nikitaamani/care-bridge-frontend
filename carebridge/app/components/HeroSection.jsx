'use client'
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/pexelsr.jpg')" }}>
      
      {/* Darker Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 max-w-3xl px-6 text-white flex flex-col items-center justify-center">
        {/* Title with Framer Motion animation */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          Empower Change with Every Donation
        </motion.h1>
        
        {/* Mission Statement */}
        <motion.p 
          className="text-lg md:text-xl mb-6 text-white" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Support education and provide access to essential hygiene products for girls, street children, and orphans.
        </motion.p>
        
        {/* Additional Mission Statement or Tagline */}
        <motion.p 
          className="text-sm md:text-base mb-8 italic"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Join us in creating a brighter future for all children in need.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/donate" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            Donate Now
          </Link>
          <Link href="/about" className="bg-white text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-full transition duration-300">
            Learn More
          </Link>
          <Link href="/get-involved" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            Get Involved
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
