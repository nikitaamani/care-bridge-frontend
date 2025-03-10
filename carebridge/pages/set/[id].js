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
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Charity Image */}
        <img
          src={charity.image}
          alt={charity.name}
          className="w-full h-72 object-cover"
        />

        {/* Charity Details */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-black mb-4">{charity.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{charity.description}</p>
          <p className="text-sm text-gray-500 mb-2">Cause: <span className="font-semibold">{charity.cause}</span></p>
          <p className="text-sm text-gray-500 mb-4">Rating: ⭐ {charity.rating}</p>

          {/* Mission */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">🌍 Mission</h2>
            <p className="text-gray-700">{charity.mission}</p>
          </div>

          {/* Programs */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">📌 Programs</h2>
            <ul className="list-disc list-inside text-gray-700">
              {charity.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">🚀 Impact</h2>
            <p className="text-gray-700">{charity.impact}</p>
          </div>

          {/* Testimonials */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">💬 Testimonials</h2>
            <div className="space-y-3">
              {charity.testimonials.map((testimonial, index) => (
                <blockquote key={index} className="bg-gray-100 p-4 rounded-lg italic">
                  "{testimonial}"
                </blockquote>
              ))}
            </div>
          </div>

          {/* Website & Donation */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">🔗 Get Involved</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={charity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Website
              </a>
              <a
                href={charity.donationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Donate Now
              </a>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              href="/search"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              🔙 Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
