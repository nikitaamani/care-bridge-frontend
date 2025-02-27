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
      description: "We have successfully built wells and filtration systems in remote areas, ensuring thousands of people have access to clean and safe drinking water. By addressing water scarcity, we have reduced waterborne diseases and improved overall health in communities lacking proper sanitation. This initiative not only saves lives but also empowers communities by reducing the burden on women and children, who often travel long distances to fetch water." 
    },
    { 
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg", 
      title: "Girls' Education", 
      link: "/projects/education", 
      description: "Through scholarships, mentorship programs, and school supply distributions, we are ensuring that young girls receive quality education and the necessary resources to break free from poverty. By addressing barriers such as school fees, lack of learning materials, and gender-based discrimination, we have empowered countless girls to pursue their dreams, gain financial independence, and contribute meaningfully to society." 
    },
    { 
      image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg", 
      title: "Food & Sanitation", 
      link: "/projects/food", 
      description: "Hunger and poor sanitation are among the leading causes of malnutrition and disease in underprivileged communities. Through this initiative, we provide nutritious food packages, clean water, and essential hygiene supplies to families in need. Our efforts help improve children's health, boost immunity, and create a sustainable solution to food insecurity, ultimately leading to a healthier and more resilient population." 
    },
    { 
      image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg", 
      title: "Hygiene Initiative", 
      link: "/projects/hygiene", 
      description: "Proper hygiene is fundamental to preventing disease outbreaks, especially in areas with limited access to healthcare. Our workshops educate communities on the importance of handwashing, menstrual hygiene, and sanitation practices while distributing essential hygiene kits that include soap, sanitary pads, and disinfectants. This initiative plays a crucial role in reducing infections, increasing school attendance among girls, and promoting overall community well-being." 
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4">
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
        className="rounded-lg shadow-lg overflow-hidden"
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
        <p className="text-gray-600 max-w-2xl mx-auto mb-5">Your donation helps us provide clean water, education, food, and hygiene to those in need.</p>
        <Link href="/donate" className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition">
          Donate Now
        </Link>
      </div>
    </div>
  );
};

export default ImageSlider;
