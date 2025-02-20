// components/HowItWorks.js
import { FaHandHoldingHeart, FaDollarSign, FaCreditCard } from 'react-icons/fa';
import Image from 'next/image';

const HowItWorks = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-black">How It Works</h2>
                <p className="text-lg text-black">Making a donation is easy. Just follow these steps:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Step 1: Choose a Charity */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Image 
                        src="https://images.pexels.com/photos/6646912/pexels-photo-6646912.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Choose a Charity"
                        width={300}
                        height={200}
                        className="rounded-lg mx-auto mb-4"
                    />
                    <div className="text-blue-500 text-4xl mb-4">
                        <FaHandHoldingHeart />
                    </div>
                    <h3 className="font-semibold text-xl mb-4">1. Choose a Charity</h3>
                    <p className="text-gray-600">Browse our list of trusted charities and select the one you want to support.</p>
                </div>

                {/* Step 2: Pick an Amount */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Image 
                        src="https://images.pexels.com/photos/4386347/pexels-photo-4386347.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Pick an Amount"
                        width={300}
                        height={200}
                        className="rounded-lg mx-auto mb-4"
                    />
                    <div className="text-green-500 text-4xl mb-4">
                        <FaDollarSign />
                    </div>
                    <h3 className="font-semibold text-xl mb-4">2. Pick an Amount</h3>
                    <p className="text-gray-600">Select a donation amount or enter your own custom amount.</p>
                </div>

                {/* Step 3: Complete Payment */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Image 
                        src="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Complete Payment"
                        width={300}
                        height={200}
                        className="rounded-lg mx-auto mb-4"
                    />
                    <div className="text-yellow-500 text-4xl mb-4">
                        <FaCreditCard />
                    </div>
                    <h3 className="font-semibold text-xl mb-4">3. Complete Payment</h3>
                    <p className="text-gray-600">Use PayPal, Credit Card, or other payment methods to complete your donation.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;


