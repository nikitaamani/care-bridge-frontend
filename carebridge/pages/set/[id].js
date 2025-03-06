// pages/set/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import the Link component

// Example charity data (replace with data from an API or database)
const charities = [
  { 
    id: 1, 
    name: "Clean Water Initiative", 
    cause: "Environment", 
    description: "Providing clean water to underserved communities.", 
    rating: 4.5, 
    image: "/water.jpg", 
    mission: "Our mission is to ensure access to clean water for all.", 
    programs: ["Well Construction", "Water Filtration Systems"], 
    website: "https://cleanwater.org" 
  },
  { 
    id: 2, 
    name: "Girls' Education Fund", 
    cause: "Education", 
    description: "Empowering girls through education and mentorship.", 
    rating: 4.8, 
    image: "/education.jpg", 
    mission: "We aim to provide quality education to girls worldwide.", 
    programs: ["Scholarships", "Mentorship Programs"], 
    website: "https://girlseducationfund.org" 
  },
  { 
    id: 3, 
    name: "Food for All", 
    cause: "Poverty Alleviation", 
    description: "Delivering nutritious meals to families in need.", 
    rating: 4.2, 
    image: "/food.jpg", 
    mission: "To end hunger by providing food to those in need.", 
    programs: ["Food Distribution", "Community Kitchens"], 
    website: "https://foodforall.org" 
  },
];

const CharityProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the charity by ID
  const charity = charities.find((charity) => charity.id === parseInt(id));

  if (!charity) {
    return <div className="text-center text-red-600 my-8">Charity not found.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Charity Image */}
        <img
          src={charity.image}
          alt={charity.name}
          className="w-full h-64 object-cover"
        />

        {/* Charity Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-black mb-4">{charity.name}</h1>
          <p className="text-gray-600 mb-4">{charity.description}</p>
          <p className="text-sm text-gray-500 mb-2">Cause: {charity.cause}</p>
          <p className="text-sm text-gray-500 mb-4">Rating: {charity.rating} ★</p>

          {/* Mission */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-2">Mission</h2>
            <p className="text-gray-600">{charity.mission}</p>
          </div>

          {/* Programs */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-2">Programs</h2>
            <ul className="list-disc list-inside text-gray-600">
              {charity.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          </div>

          {/* Website Link */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-2">Website</h2>
            <a
              href={charity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          </div>

          {/* Back Button */}
          <Link
            href="/search"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;