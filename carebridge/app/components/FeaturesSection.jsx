// components/FeaturedCharities.js
'use client'
import { FaWater, FaBook, FaFemale } from 'react-icons/fa';
import { useState } from 'react';

const FeaturedCharities = () => {
    // State to toggle full story visibility
    const [selectedCharity, setSelectedCharity] = useState(null);

    // Charity Data
    const charities = [
        {
            id: 1,
            icon: <FaWater />,
            title: 'Clean Water Initiative',
            summary: 'Your donations can provide access to clean water for communities in need.',
            fullStory: 'The Clean Water Initiative aims to provide access to safe, clean drinking water in areas where water scarcity is a major issue. With your support, we are able to build wells, rainwater harvesting systems, and sanitation facilities.',
            image: 'https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 2,
            icon: <FaBook />,
            title: 'Education for All',
            summary: 'Help support education programs and provide resources to children in need.',
            fullStory: 'Education is a basic human right, and yet millions of children worldwide are denied this right. The Education for All initiative aims to provide educational resources, including books, uniforms, and scholarships, to children in impoverished regions.',
            image: 'https://images.pexels.com/photos/716281/pexels-photo-716281.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 3,
            icon: <FaFemale />,
            title: 'Sanitary Products for Girls',
            summary: 'Your donation helps provide sanitary products to schoolgirls in need.',
            fullStory: 'Access to sanitary products is a key factor in girls’ ability to stay in school. This program provides menstrual hygiene kits to girls in underserved regions to ensure they do not miss school due to lack of access to sanitary products.',
            image: 'https://images.pexels.com/photos/5712304/pexels-photo-5712304.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 4,
            icon: <FaFemale />,
            title: 'Girls’ Education & Empowerment',
            summary: 'Donations help support girls’ education and empower them to become leaders.',
            fullStory: 'Our Girls’ Education & Empowerment program focuses on breaking the cycle of poverty by educating and empowering girls to be leaders in their communities. Your donations help provide scholarships, mentorship, and career-building opportunities.',
            image: 'https://images.pexels.com/photos/9879939/pexels-photo-9879939.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Charities</h2>
                <p className="text-lg text-gray-700">Choose from a list of amazing charities you can support and make a difference.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {charities.map((charity) => (
                    <div
                        key={charity.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={charity.image}
                            alt={charity.title}
                            className="w-full h-64 object-cover rounded-t-lg mb-4 hover:scale-105 transition-transform duration-300"
                        />
                        <div className="text-4xl text-blue-500 mb-4">{charity.icon}</div>
                        <h3 className="font-semibold text-xl mb-4">{charity.title}</h3>
                        <p className="text-gray-600 mb-4">{charity.summary}</p>
                        {selectedCharity === charity.id ? (
                            <p className="text-gray-700 mb-4">{charity.fullStory}</p>
                        ) : (
                            <button
                                onClick={() => setSelectedCharity(charity.id)}
                                className="text-blue-500 hover:underline transition duration-300"
                            >
                                Learn More
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCharities;
