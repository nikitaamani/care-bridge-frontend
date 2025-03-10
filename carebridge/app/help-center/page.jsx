'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from "next/legacy/image";

const HelpCenter = () => {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqs = [
        { question: "How do I donate?", answer: "You can donate by clicking the 'Donate' button on our homepage and following the instructions." },
        { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
        { question: "Is my donation tax-deductible?", answer: "Yes, all donations are tax-deductible as per local regulations." },
        { question: "How can I contact support?", answer: "You can reach us via the 'Contact Us' page or email support@charityconnect.org." }
    ];

    return (
        <>
            <Navbar />
            <section 
                className="relative w-full min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: "url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            >
                <div className="max-w-6xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Help Center</h2>
                    <p className="text-lg mb-8">Find answers to common questions and get support.</p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto py-12 px-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                            <button onClick={() => toggleFaq(index)} className="text-lg font-medium flex justify-between w-full">
                                {faq.question}
                                <span>{faqOpen === index ? '-' : '+'}</span>
                            </button>
                            {faqOpen === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </section>
            
            <Footer />
        </>
    );
};

export default HelpCenter;
