'use client';

import { motion } from 'framer-motion';
import Image from "next/legacy/image";

const contributions = [
  {
    title: 'Disaster Relief Efforts',
    description:
      'Providing immediate assistance, food, and shelter to communities affected by natural disasters.',
    icon: '🌍',
    image: '/Unity.jpeg',
  },
  {
    title: 'Medical Assistance in Remote Areas',
    description:
      'Delivering healthcare services and medical supplies to underserved regions.',
    icon: '🏥',
    image: 'https://images.pexels.com/photos/4386369/pexels-photo-4386369.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Renewable Energy for Rural Communities',
    description:
      'Implementing solar energy solutions to provide sustainable electricity to off-grid areas.',
    icon: '🔋',
    image: 'https://images.pexels.com/photos/9799716/pexels-photo-9799716.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Empowering Women Through Education',
    description:
      'Providing scholarships and vocational training programs to women in marginalized communities.',
    icon: '📖',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function PopularContributions() {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Contributions</h2>
        <p className="text-gray-600 mb-10">See how your donations are making an impact in the community.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributions.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                width={300} 
                height={200} 
                className="rounded-xl mb-4"
              />
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
