"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function WaysToGive() {
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 p-6 pt-20">
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-4xl font-bold text-black mb-6">Ways to Give</h1>
                    <p className="text-gray-700 mb-6">
                        Your generosity helps us continue our mission. There are several ways you can support us.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-black mb-4">One-Time Donation</h2>
                            <p className="text-gray-700 mb-4">Make a one-time contribution to support our programs.</p>
                            <button 
                                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-800"
                                onClick={() => router.push("/donate")}
                            >
                                Donate Now
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-black mb-4">Monthly Giving</h2>
                            <p className="text-gray-700 mb-4">Join our monthly donor program to make a lasting impact.</p>
                            <button 
                                className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-800"
                                onClick={() => router.push("/donate?monthly=true")}
                            >
                                Give Monthly
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-black mb-4">Fundraise</h2>
                            <p className="text-gray-700 mb-4">Start a fundraiser and rally your community for our cause.</p>
                            <button 
                                className="bg-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-800"
                                onClick={() => router.push("/fundraiser-success")}
                            >
                                Start Fundraising
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-black mb-4">Corporate Giving</h2>
                            <p className="text-gray-700 mb-4">Partner with us to create a larger social impact.</p>
                            <button 
                                className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-800"
                                onClick={() => router.push("/volunteer")}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
