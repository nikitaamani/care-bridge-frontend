'use client';

import Image from "next/image";
import Link from "next/link";

const DonateWithGiving = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-8 lg:p-16">
          {/* Left Side - Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              The Smart, Easy Way to Give
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Charity Navigator's Giving Basket empowers you to support multiple charities 
              in one convenient checkout while controlling how much of your information 
              you share with each organization.
            </p>
            <Link
              href="/more"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <Image
              src="/Giving.jpeg"
              alt="Giving Basket"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateWithGiving;
