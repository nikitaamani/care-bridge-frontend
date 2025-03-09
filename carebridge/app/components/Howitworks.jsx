// components/HowItWorks.js
import { FaHandHoldingHeart, FaDollarSign, FaCreditCard } from 'react-icons/fa';
import Image from 'next/image';

const HowItWorks = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">How It Works</h2>
                    <p className="text-lg text-gray-600">Making a donation is easy. Just follow these steps:</p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Step 1: Choose a Charity */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 w-full mb-6">
                            <Image
                                src="https://images.pexels.com/photos/6646912/pexels-photo-6646912.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Example"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="text-blue-500 text-4xl mb-4">
                            <FaHandHoldingHeart />
                        </div>
                        <h3 className="font-semibold text-xl mb-4 text-gray-900">1. Choose a Charity</h3>
                        <p className="text-gray-600">Browse our list of trusted charities and select the one you want to support.</p>
                    </div>

                    {/* Step 2: Pick an Amount */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 w-full mb-6">
                            <Image
                                src="https://images.pexels.com/photos/4386347/pexels-photo-4386347.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Pick an Amount"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="text-green-500 text-4xl mb-4">
                            <FaDollarSign />
                        </div>
                        <h3 className="font-semibold text-xl mb-4 text-gray-900">2. Pick an Amount</h3>
                        <p className="text-gray-600">Select a donation amount or enter your own custom amount.</p>
                    </div>

                    {/* Step 3: Complete Payment */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 w-full mb-6">
                            <Image
                                src="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Complete Payment"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="text-yellow-500 text-4xl mb-4">
                            <FaCreditCard />
                        </div>
                        <h3 className="font-semibold text-xl mb-4 text-gray-900">3. Complete Payment</h3>
                        <p className="text-gray-600">Use PayPal, Credit Card, or other payment methods to complete your donation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;