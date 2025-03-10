import { useRouter } from "next/router";
import Link from "next/link";

const charities = [
  { 
    id: 1, 
    name: "Clean Water Initiative", 
    cause: "Environment", 
    description: "Providing clean water to underserved communities.", 
    rating: 4.5, 
    image: "https://images.pexels.com/photos/68262/pexels-photo-68262.jpeg?auto=compress&cs=tinysrgb&w=600", 
    mission: "Our mission is to ensure access to clean water for all.", 
    programs: ["Well Construction", "Water Filtration Systems"], 
    impact: "Over 500,000 people have gained access to clean drinking water.",
    testimonials: [
      "Thanks to this initiative, our village now has clean water for the first time! - Amina, Kenya",
      "An amazing organization that truly changes lives. - carebridge, save life today "
    ],
    website: "https://care-bridge-deploy.vercel.app/",
    donationLink: "https://care-bridge-deploy.vercel.app/"
  },
  { 
    id: 2, 
    name: "Girls' Education Fund", 
    cause: "Education", 
    description: "Empowering girls through education and mentorship.", 
    rating: 4.8, 
    image: "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=600", 
    mission: "We aim to provide quality education to girls worldwide.", 
    programs: ["Scholarships", "Mentorship Programs"], 
    impact: "Over 10,000 girls have received scholarships and mentorship.",
    testimonials: [
      "Education changed my life. This fund made it possible. - Fatima, Nigeria",
      "Every girl deserves a chance, and this fund gives them that! - Nikita, Kenya"
    ],
    website: "https://girlseducationfund.org",
    donationLink: "https://girlseducationfund.org/donate"
  },
  { 
    id: 3, 
    name: "Food for All", 
    cause: "Poverty Alleviation", 
    description: "Delivering nutritious meals to families in need.", 
    rating: 4.2, 
    image: "https://images.pexels.com/photos/6646930/pexels-photo-6646930.jpeg?auto=compress&cs=tinysrgb&w=600", 
    mission: "To end hunger by providing food to those in need.", 
    programs: ["Food Distribution", "Community Kitchens"], 
    impact: "Over 2 million meals served worldwide.",
    testimonials: [
      "I no longer go to bed hungry thanks to this program. - Juan, Mexico",
      "An essential lifeline for struggling families. - Shadrack, Kenya"
    ],
    website: "https://foodforall.org",
    donationLink: "https://foodforall.org/donate"
  }
];

const CharityProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const charity = charities.find((charity) => charity.id === parseInt(id));

  if (!charity) {
    return <div className="text-center text-red-600 my-8">Charity not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Charity Image */}
          <img
            src={charity.image}
            alt={charity.name}
            className="w-full h-96 object-cover object-center"
          />

          {/* Charity Details */}
          <div className="p-8">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{charity.name}</h1>
            <p className="text-xl text-gray-600 mb-8">{charity.description}</p>

            {/* Cause and Rating */}
            <div className="flex items-center space-x-6 mb-8">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Cause:</span> {charity.cause}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Rating:</span> ⭐ {charity.rating}
              </p>
            </div>

            {/* Mission */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🌍 Mission</h2>
              <p className="text-xl text-gray-600">{charity.mission}</p>
            </div>

            {/* Programs */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📌 Programs</h2>
              <ul className="list-disc list-inside text-xl text-gray-600 space-y-2">
                {charity.programs.map((program, index) => (
                  <li key={index}>{program}</li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Impact</h2>
              <p className="text-xl text-gray-600">{charity.impact}</p>
            </div>

            {/* Testimonials */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">💬 Testimonials</h2>
              <div className="space-y-4">
                {charity.testimonials.map((testimonial, index) => (
                  <blockquote
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500 italic text-gray-600"
                  >
                    "{testimonial}"
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Website & Donation */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 Get Involved</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                  Visit Website
                </a>
                <a
                  href={charity.donationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-transform transform hover:scale-105"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Link
                href="/search"
                className="inline-block bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-transform transform hover:scale-105"
              >
                🔙 Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;