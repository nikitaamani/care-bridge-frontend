import Image from 'next/image';
import { notFound } from 'next/navigation';

// Sample disaster data (this would ideally come from an API or database)
const disasterImages = [
  {
    slug: 'flooded-village-crisis',
    title: 'Flooded Village Crisis',
    src: 'https://images.pexels.com/photos/25228172/pexels-photo-25228172/free-photo-of-men-on-boat-on-water-in-village-during-flood.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: [
      "It started as a normal morning, but within hours, the riverbanks had burst, sending waves of muddy water through the village. Families rushed to higher ground, but many homes were already submerged.",
      "Rescue teams worked tirelessly, maneuvering boats through what used to be streets, searching for survivors stranded on rooftops. Parents held their children tight, unsure of what the next few hours would bring.",
      "The flood wiped out food supplies, clean water sources, and homes. Relief organizations quickly mobilized, but the need was overwhelming. Despite the devastation, the community came together, determined to rebuild and support one another."
    ]
  },
  {
    slug: 'earthquake-destruction',
    title: 'Earthquake Destruction',
    src: 'https://images.pexels.com/photos/11477799/pexels-photo-11477799.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: [
      "In the middle of the night, the ground trembled violently. Walls cracked, buildings collapsed, and within moments, the city was unrecognizable.",
      "Survivors emerged from the rubble, searching for loved ones. The air was filled with cries for help and the distant sound of emergency sirens as first responders rushed to pull people from the wreckage.",
      "Temporary shelters were set up, but the aftershocks made it difficult for anyone to feel safe. With no electricity or running water, families relied on humanitarian aid to survive the days that followed."
    ]
  },
  {
    slug: 'refugee-camp-struggles',
    title: 'Refugee Camp Struggles',
    src: 'https://images.pexels.com/photos/10629468/pexels-photo-10629468.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: [
      "The camp was meant to be a temporary refuge, but for many, it became home for years. Rows of makeshift tents stretched as far as the eye could see, filled with families who had fled war and disaster.",
      "Children ran barefoot through the dust, their laughter a sharp contrast to the hardship around them. Food was rationed, and clean water was scarce. Medical teams worked day and night to treat illnesses that spread quickly in the crowded conditions.",
      "Despite the struggles, hope remained. Volunteers taught children in makeshift classrooms, and small businesses emerged inside the camp as people tried to regain a sense of normalcy."
    ]
  },
  {
    slug: 'emergency-relief-efforts',
    title: 'Emergency Relief Efforts',
    src: 'https://images.pexels.com/photos/2898214/pexels-photo-2898214.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: [
      "As soon as the disaster struck, relief teams sprang into action. Trucks loaded with food, medicine, and blankets made their way to affected areas, navigating broken roads, flooded streets, and collapsed infrastructure. Many volunteers had left their own families behind, driven by an unwavering commitment to help those in need. In the face of chaos, they worked around the clock, distributing emergency aid and setting up medical tents for the injured.",
      "Aid workers set up distribution centers, ensuring families received what they needed to survive. The hardest-hit areas were often the most difficult to reach, requiring teams to navigate dangerous terrain, unstable buildings, and, in some cases, ongoing conflict. Helicopters were deployed to deliver supplies to stranded communities, while rescue boats ferried the vulnerable—children, the elderly, and the injured—to safety. Despite limited resources, every effort was made to provide food, clean water, and medical care.",
      "For many survivors, the relief workers were a lifeline, offering not just supplies, but also comfort and reassurance in the midst of unimaginable loss. Volunteers listened to heartbreaking stories of families torn apart, offering words of hope and a shoulder to lean on. As days turned into weeks, makeshift shelters transformed into temporary communities, where survivors found solidarity in shared grief and resilience. Though rebuilding would take months—if not years—the kindness of strangers gave them the strength to face an uncertain future."
    ]
  }
];

export default function StoryPage({ params }) {
  const story = disasterImages.find((item) => item.slug === params.slug);

  if (!story) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{story.title}</h1>
      <Image src={story.src} alt={story.title} width={800} height={500} className="rounded-xl shadow-lg mb-6" />

      <div className="text-lg text-gray-700 space-y-6">
        {story.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
