'use client'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Updated project data with detailed descriptions
const projectData = {
  "clean-water": {
    title: "Clean Water Project",
    description: "Ensuring access to clean and safe drinking water for communities in need.",
    fullDescription: `
      Providing Access to Safe and Sustainable Drinking Water  
      We have successfully built wells and filtration systems in remote areas, ensuring thousands of people have access to clean and safe drinking water. 
      By addressing water scarcity, we have reduced waterborne diseases and improved overall health in communities lacking proper sanitation. 
      This initiative not only saves lives but also empowers communities by reducing the burden on women and children, who often travel long distances to fetch water.
    `,
    image: "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg",
  },
  "education": {
    title: "Girls' Education",
    description: "Supporting education for girls and ensuring equal opportunities in learning.",
    fullDescription: `
      Empowering the Next Generation of Women Leaders  
      Through scholarships, mentorship programs, and school supply distributions, we are ensuring that young girls receive quality education and the necessary resources to break free from poverty. 
      By addressing barriers such as school fees, lack of learning materials, and gender-based discrimination, we have empowered countless girls to pursue their dreams, 
      gain financial independence, and contribute meaningfully to society.
    `,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  },
  "food": {
    title: "Food & Sanitation",
    description: "Providing nutritious food and improving sanitation in vulnerable areas.",
    fullDescription: `
      Ensuring Nutrition and Hygiene for Vulnerable Families  
      Hunger and poor sanitation are among the leading causes of malnutrition and disease in underprivileged communities. 
      Through this initiative, we provide nutritious food packages, clean water, and essential hygiene supplies to families in need. 
      Our efforts help improve children's health, boost immunity, and create a sustainable solution to food insecurity, ultimately leading to a healthier and more resilient population.
    `,
    image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
  },
  "hygiene": {
    title: "Hygiene Initiative",
    description: "Promoting hygiene awareness and distributing hygiene essentials.",
    fullDescription: `
      Preventing Disease and Promoting Health Through Hygiene Education  
      Proper hygiene is fundamental to preventing disease outbreaks, especially in areas with limited access to healthcare. 
      Our workshops educate communities on the importance of handwashing, menstrual hygiene, and sanitation practices while distributing essential hygiene kits that include soap, sanitary pads, and disinfectants. 
      This initiative plays a crucial role in reducing infections, increasing school attendance among girls, and promoting overall community well-being.
    `,
    image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg",
  },
};

export default function ProjectPage({ params }) {
  const router = useRouter();

  if (!params?.slug || !projectData[params.slug]) {
    return notFound();
  }

  const { title, fullDescription, image } = projectData[params.slug];

  return (
    <>
      <Head>
        <title>{title} | Our Projects</title>
        <meta name="description" content={fullDescription.substring(0, 160)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={fullDescription.substring(0, 160)} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar />

      <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
        <button 
          onClick={() => router.back()} 
          className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          ← Back to Projects
        </button>

        <h1 className="text-3xl font-bold">{title}</h1>
        
        <div className="relative w-full h-64 mt-4 rounded-lg overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            width={800} 
            height={500} 
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="mt-4 text-lg">
          <div dangerouslySetInnerHTML={{ __html: fullDescription.replace(/\n/g, "<br/>") }} />
        </div>

        <div className="mt-6 flex gap-4">
          <a href="/volunteer" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
            Become a Volunteer
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
