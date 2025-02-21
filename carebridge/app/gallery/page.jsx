'use client';

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
          <li><a href="/success-stories" className="text-blue-600 font-semibold">Gallery</a></li>
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
    title: "Rebuilding Homes in Haiti",
    snippet: "After the devastating earthquake, Carebridge provided shelter and resources to thousands of families.",
    image: "https://images.pexels.com/photos/30668017/pexels-photo-30668017/free-photo-of-urban-road-construction-in-bratislava-city-center.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/haiti",
  },
  {
    title: "Clean Water for Sudan",
    snippet: "We helped bring clean drinking water to villages affected by drought and conflict in Sudan.",
    image: "https://images.pexels.com/photos/1446504/pexels-photo-1446504.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/sudan",
  },
  {
    title: "Educational Support for Refugees",
    snippet: "Providing books, school supplies, and safe learning spaces for displaced children.",
    image: "https://images.pexels.com/photos/5427998/pexels-photo-5427998.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/stories/refugees",
  },
];