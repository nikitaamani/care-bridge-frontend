'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

const ImageSlider = () => {
  const slides = [
    { 
      image: "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg", 
      title: "Clean Water Project", 
      link: "/projects/clean-water", 
      description: "We have successfully built wells and filtration systems in remote areas, ensuring thousands of people have access to clean and safe drinking water. This initiative not only saves lives but also empowers communities by reducing the burden on women and children, who often travel long distances to fetch water." 
    },
    { 
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg", 
      title: "Girls' Education", 
      link: "/projects/education", 
      description: "Through scholarships, mentorship programs, and school supply distributions, we are ensuring that young girls receive quality education and the necessary resources to break free from poverty." 
    },
    { 
      image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg", 
      title: "Food & Sanitation", 
      link: "/projects/food", 
      description: "Providing nutritious food packages, clean water, and essential hygiene supplies to families in need, improving children's health, and boosting community resilience." 
    },
    { 
      image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg", 
      title: "Hygiene Initiative", 
      link: "/projects/hygiene", 
      description: "Educating communities on hygiene practices while distributing essential hygiene kits to prevent diseases and improve overall health." 
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center text-center p-10 bg-gradient-to-r from-gray-100 to-gray-200">
      
      {/* Left Image Section */}
      <div className="hidden lg:flex w-1/3 flex-col items-center">
        <Image 
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
          alt="Support Our Mission"
          width={500}
          height={500}
          className="rounded-xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
        />
        <p className="mt-6 text-gray-700 text-lg font-semibold italic text-center max-w-sm">
          Together, we can build a brighter future. Your support helps provide access to clean water, quality education, and essential resources for communities in need.
        </p>
      </div>
    
      {/* Right Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        
        {/* Title & Intro */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Making a Difference</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is to provide clean water, education, food, and hygiene solutions to those in need. 
            Every initiative we take is a step towards a healthier and brighter future. Join us in making a meaningful impact.
          </p>
        </div>

        {/* Image Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="w-full max-w-4xl rounded-lg shadow-xl overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300">
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  width={500} 
                  height={350} 
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-3">{slide.title}</h3>
                  <p className="text-sm text-gray-200 mb-4 text-center">{slide.description.substring(0, 100)}...</p>
                  <Link href={slide.link} className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Learn More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold mb-4">Support Our Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
            Your donation helps us provide clean water, education, food, and hygiene to those in need. 
            Every contribution brings us one step closer to changing lives.
          </p>
          <Link href="/donate" className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-orange-600 transition">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
