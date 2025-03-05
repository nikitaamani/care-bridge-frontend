// app/gallery/[storyId]/page.jsx
"use client";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "@/app/components/Navbar";

const stories = {
  kenya: {
    title: "Providing Clean Water to Children in Rural Kenya",
    content: "Thanks to generous donations, we have built wells and water filtration systems. Before these initiatives, children had to walk miles to collect water, often from unsafe sources. Now, they can attend school without worrying about their daily water needs.",
    image: "https://images.pexels.com/photos/1446504/pexels-photo-1446504.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  ethiopia: {
    title: "Feeding Malnourished Children in Ethiopia",
    content: "With your support, we provide nutritious meals to ensure children can grow and learn. Many children suffer from malnutrition due to food scarcity. Our feeding programs supply daily meals to thousands, giving them hope for a better future.",
    image: "https://media.istockphoto.com/id/1392324180/photo/african-kids-in-the-village-eating.jpg?b=1&s=612x612&w=0&k=20&c=bxs6C8XbE2c8maq7Xlq2H0l5_LCO-jRtCEo8tDoOm6c=",
  },
  "south-sudan": {
    title: "Safe Shelters for Displaced Children in South Sudan",
    content: "War and conflict have displaced thousands of children. Through our shelters, we provide them with a safe place to stay, access to education, and psychological support to help them heal from their trauma.",
    image: "https://images.pexels.com/photos/14456845/pexels-photo-14456845.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  uganda: {
    title: "Access to Medical Assistance for Children in Uganda",
    content: "Our health initiatives provide vaccinations, prenatal care, and essential medical aid to vulnerable children. Through our mobile clinics, we reach children in the most remote villages, ensuring they get the healthcare they need.",
    image: "https://img.freepik.com/premium-photo/helping-poor-old-women-children-from-charity-fun-flood-affected-starving-people_1014754-20057.jpg?uid=R188422947&ga=GA1.1.1513866671.1739815807&semt=ais_hybrid",
  },
  drc: {
    title: "Empowering Children Through Education in DRC",
    content: "Your contributions fund school supplies, scholarships, and mentorship programs for children in need. Education is key to breaking the cycle of poverty, yet many children in the Democratic Republic of Congo lack access to learning resources. Through our initiatives, we provide essential tools to help children stay in school and achieve their dreams.",
    image: "https://images.pexels.com/photos/11580454/pexels-photo-11580454.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  nigeria: {
    title: "Helping Children Overcome Hunger in Nigeria",
    content: "We provide food relief and long-term support to ensure no child goes to bed hungry. Hunger is a major challenge affecting thousands of children in Nigeria. Through feeding programs and sustainable solutions, we help improve children's nutrition and give them a chance at a brighter future.",
    image: "https://images.pexels.com/photos/11738251/pexels-photo-11738251.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  zambia: {
    title: "Providing Sanitary Pads for Girls in Rural Schools",
    content: "Millions of young girls in rural areas miss school every month due to a lack of access to sanitary products. Our program ensures that girls receive reusable and disposable sanitary pads, empowering them to continue their education without fear, shame, or interruption. We also educate communities about menstrual health, breaking taboos and promoting dignity for all.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZy0n-gleNodmx85984-c6rsI95Jekl_Rpw&s",
  },
};

const StoryDetails = () => {
  const { storyId } = useParams(); 

  const story = stories[storyId];

  if (!story) {
    return <p className="text-center text-red-500 mt-10">Story not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
     <Navbar />

      <div className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">{story.title}</h2>
        <div className="w-full flex justify-center mb-6">
          <img src={story.image} alt={story.title} className="w-full max-w-3xl h-80 object-cover rounded-lg" /> 
        </div>
        <p className="text-gray-700">{story.content}</p>
      </div>

      <Footer />
    </div>
  );
};

export default StoryDetails;
