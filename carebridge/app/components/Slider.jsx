'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

const ImageSlider = () => {
  const slides = [
    { image: "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg", title: "Clean Water Project", link: "/projects/clean-water" },
    { image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg", title: "Girls' Education", link: "/projects/education" },
    { image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg", title: "Food & Sanitation", link: "/projects/food" },
    { image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg", title: "Hygiene Initiative", link: "/projects/hygiene" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-lg shadow-md"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative p-2">
              <Image 
                src={slide.image} 
                alt={slide.title} 
                width={400} 
                height={300} 
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
                <Link href={slide.link} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
