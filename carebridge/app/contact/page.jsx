'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from "next/legacy/image";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
        }
    };

    return (
        <>
            <Navbar />
            <section 
                className="bg-cover bg-center text-white py-16 px-6 relative" 
                style={{ backgroundImage: "url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                    <p className="text-lg mb-8">We'd love to hear from you! Reach out to us with any questions or feedback.</p>
                </div>

                <div className="max-w-5xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 hidden md:block">
                        <Image src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" alt="Contact" width={500} height={500} className="rounded-lg" />
                    </div>
                    <div className="md:w-1/2 w-full">
                        {submitted ? (
                            <p className="text-green-600 text-center">Thank you! Your message has been sent.</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
                                <div>
                                    <label className="block text-lg font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto text-center mt-12">
                    <h3 className="text-2xl font-bold">Contact Information</h3>
                    <p>Email: contact@charity.org</p>
                    <p>Phone: +254708781407</p>
                    <p>Address: 786 Mews, Riverside, Lavington</p>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
