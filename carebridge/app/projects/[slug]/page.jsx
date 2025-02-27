import { notFound } from 'next/navigation';

// Sample project data
const projectData = {
  "clean-water": {
    title: "Clean Water Project",
    description: "Ensuring access to clean and safe drinking water for communities in need.",
    image: "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg",
  },
  "education": {
    title: "Girls' Education",
    description: "Supporting education for girls and ensuring equal opportunities in learning.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  },
  "food": {
    title: "Food & Sanitation",
    description: "Providing nutritious food and improving sanitation in vulnerable areas.",
    image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
  },
  "hygiene": {
    title: "Hygiene Initiative",
    description: "Promoting hygiene awareness and distributing hygiene essentials.",
    image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg",
  },
};

// ✅ Ensure this function is `async`
export default function ProjectPage({ params }) {
  if (!params || !params.slug) {
    return notFound(); // Ensure params exist before accessing them
  }

  const project = projectData[params.slug]; // Access the slug correctly

  if (!project) {
    return notFound(); // Handle unknown slugs
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mt-4" />
      <p className="mt-4 text-lg">{project.description}</p>
    </div>
  );
}
