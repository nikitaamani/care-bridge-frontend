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
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center text-center p-3 bg-gray-300">
      {/* Image Section */}
      <div className="hidden lg:block w-1/3 p-5">
        <Image 
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
          alt="Support Our Mission"
          width={800}
          height={800}
          className="rounded-lg shadow-lg object-cover"
        />
        <p className="mt-4 text-gray-700 text-lg font-semibold">
          Together, we can build a brighter future. Your support helps provide access to clean water, quality education, and essential resources for communities in need.
        </p>
      </div>
    
      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        {/* Statements Section */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Making a Difference</h2>
          <p className="text-gray-600 text-lg">
            Our mission is to provide clean water, education, food, and hygiene solutions to those in need. 
            Every initiative we take is a step towards a healthier and brighter future. Join us in making a meaningful impact.
          </p>
        </div>

        {/* Image Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full max-w-5xl rounded-lg shadow-lg overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-lg overflow-hidden shadow-md group">
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  width={500} 
                  height={350} 
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-5">
                  <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm text-gray-200 mb-2">{slide.description.substring(0, 100)}...</p>
                  <Link href={slide.link} className="mt-2 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Learn More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-3">Support Our Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-5">
            Your donation helps us provide clean water, education, food, and hygiene to those in need. 
            Every contribution brings us one step closer to changing lives.
          </p>
          <Link href="/donate" className="px-5 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-orange-600 transition">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
