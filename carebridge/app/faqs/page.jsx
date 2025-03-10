"use client";

import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("General");
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const faqs = {
        General: [
            { question: "How does child sponsorship work?", answer: "Sponsorship provides children with essential resources like education, healthcare, and food." },
            { question: "What benefits do sponsored children receive?", answer: "Sponsored children gain access to education, sanitary towels, health programs, and community support." },
            { question: "How can I become a sponsor?", answer: "You can sign up on our website and choose a sponsorship plan." },
            { question: "Can I communicate with my sponsored child?", answer: "Yes, sponsors can send letters and receive updates." },
            { question: "What is the age range of children available for sponsorship?", answer: "Children from ages 3 to 18 are available for sponsorship." },
        ],
        Donation: [
            { question: "How can I donate?", answer: "You can donate online through our website." },
            { question: "Are my donations secure?", answer: "Yes, we use encrypted payment gateways for secure transactions." },
            { question: "Can I set up recurring donations?", answer: "Yes, we offer options for monthly, quarterly, and yearly donations." },
            { question: "Will I receive a donation receipt?", answer: "Yes, receipts are emailed immediately after a successful donation." },
        ],
        Charity: [
            { question: "What is CareBridge Organisation?", answer: "CareBridge is a nonprofit supporting underprivileged children through sponsorship and donations." },
            { question: "How can I get involved with CareBridge?", answer: "You can volunteer, sponsor a child, or donate to support our cause." },
            { question: "What regions do you operate in?", answer: "We operate in various sub-Saharan countries." },
            { question: "How do you ensure transparency in fund usage?", answer: "We publish annual reports and financial statements for public review." },
        ]
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://salvusmission.org/wp-content/uploads/2024/02/Untitled-design-45.png)' }}>
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white bg-opacity-80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
                <div className="py-4 px-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black">CareBridge</h1>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="text-black hover:text-blue-500">Home</a></li>
                        <li><a href="/about" className="text-black hover:text-blue-500">About</a></li>
                        <li><a href="/gallery" className="text-black hover:text-blue-500">Gallery</a></li>
                        <li><a href="/contact" className="text-black hover:text-blue-500">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Header */}
            <div className="text-center pt-36">
                <h1 className="text-5xl font-bold text-white">Frequently Asked Questions</h1>
                <h2 className="text-3xl mt-2 text-white">[FAQ's]</h2>
            </div>

            {/* FAQ Section */}
            <div className="bg-white text-black w-full max-w-4xl mx-auto rounded-lg shadow-md p-6 overflow-auto h-3/5 mt-10 mb-10">
                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-4">
                    {Object.keys(faqs).map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 text-sm font-semibold rounded ${activeCategory === category ? "bg-blue-900 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="h-96 overflow-y-auto px-2">
                    {faqs[activeCategory].map((faq, index) => (
                        <details key={index} className="mb-3 border-b pb-2">
                            <summary className="font-semibold cursor-pointer text-blue-900">{faq.question}</summary>
                            <p className="mt-1 text-gray-700">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
