'use client';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Carebridge</h1>
        <ul className="flex space-x-6">
          <li><a href="/" className="text-gray-700 hover:text-blue-500">Home</a></li>
          <li><a href="/about" className="text-gray-700 hover:text-blue-500">About</a></li>
          <li><a href="/gallery" className="text-blue-600 font-semibold">Gallery</a></li>
          <li><a href="/contact" className="text-gray-700 hover:text-blue-500">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div 
        className="h-[500px] bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-lg">
          <h2 className="text-5xl font-bold">Gallery</h2>
          <p className="mt-4 text-lg">Discover how Carebridge has made an impact worldwide.</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto py-16 px-6">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-12">Real Impact, Real People</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image src={story.image} alt={story.title} width={400} height={250} className="object-cover w-full h-56" />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900">{story.title}</h4>
                <p className="text-gray-700 mt-2">{story.snippet}</p>
                <a href={story.link} className="text-blue-500 font-semibold mt-4 inline-block">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const stories = [
  {
    title: "Providing Clean Water to children in Rural Kenya",
    snippet: "Your donations have helped build wells and water filtration systems, ensuring children can attend school instead of fetching water.",
    image: "https://images.pexels.com/photos/1446504/pexels-photo-1446504.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/kenya",
  },
  {
    title: "Feeding Malnourished Children in Ethiopia",
    snippet: "With your support, we provide nutritious meals to ensure young girls have the strength to grow and learn.",
    image: "https://media.istockphoto.com/id/1392324180/photo/african-kids-in-the-village-eating.jpg?b=1&s=612x612&w=0&k=20&c=bxs6C8XbE2c8maq7Xlq2H0l5_LCO-jRtCEo8tDoOm6c=",
    link: "/stories/ethiopia",
  },
  {
    title: "Safe Shelters for Displaced children in South Sudan",
    snippet: "We offer secure housing and support for children who have been displaced by conflict.",
    image: "https://images.pexels.com/photos/14456845/pexels-photo-14456845.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/south-sudan",
  },
  {
    title: "Access to Medical Assistance for children in Uganda",
    snippet: "Donations help provide vaccines, prenatal care, and essential medical aid for vulnerable children in Uganda.",
    image: "https://img.freepik.com/premium-photo/helping-poor-old-women-children-from-charity-fun-flood-affected-starving-people_1014754-20057.jpg?uid=R188422947&ga=GA1.1.1513866671.1739815807&semt=ais_hybrid",
    link: "/stories/uganda",
  },
  {
    title: "Empowering children Through Education in DRC",
    snippet: "Your contributions fund school supplies, scholarships, and mentorship programs for children in need.",
    image: "https://images.pexels.com/photos/11580454/pexels-photo-11580454.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/tanzania",
  },
  {
    title: "Helping children Overcome Hunger in Nigeria",
    snippet: "We provide food relief and long-term support to ensure no child goes to bed hungry.",
    image: "https://images.pexels.com/photos/11738251/pexels-photo-11738251.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/nigeria",
  },
  {
    title: "Providing Sanitary Pads for Girls in Zambia",
    snippet: "We ensure that young girls have access to sanitary products, allowing them to stay in school with confidence and dignity.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzMOp4pK5Vb6SIMzP_XXUPuq6vDlR6py5R9Q&s",
    link: "/stories/zambia",
  },
];