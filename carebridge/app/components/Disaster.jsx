'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import Link from 'next/link';

// Disaster locations
const disasterLocations = [
  { name: 'Haiti', lat: 18.9712, lng: -72.2852, issue: 'Earthquake & Political Crisis' },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433, issue: 'Earthquake' },
  { name: 'Sudan', lat: 12.8628, lng: 30.2176, issue: 'War & Humanitarian Crisis' },
  { name: 'Congo', lat: -4.0383, lng: 21.7587, issue: 'Conflict & Displacement' },
];

// Disaster Images with stories
const disasterImages = [
  {
    src: 'https://images.pexels.com/photos/25228172/pexels-photo-25228172/free-photo-of-men-on-boat-on-water-in-village-during-flood.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Flooded area',
    story: 'A village submerged in floodwaters, where families are stranded with no access to clean water or shelter...',
    slug: 'flooded-village-crisis',
  },
  {
    src: 'https://images.pexels.com/photos/11477799/pexels-photo-11477799.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Destroyed buildings',
    story: 'A once-thriving community now reduced to rubble, with families searching for safety and rebuilding their lives...',
    slug: 'earthquake-destruction',
  },
  {
    src: 'https://images.pexels.com/photos/10629468/pexels-photo-10629468.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Refugee camp',
    story: 'A temporary camp housing thousands who have fled conflict and disaster, waiting for food, medical aid, and stability...',
    slug: 'refugee-camp-struggles',
  },
  {
    src: 'https://images.pexels.com/photos/2898214/pexels-photo-2898214.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Emergency relief team',
    story: 'A group of emergency responders working tirelessly to distribute food, medical care, and emotional support to survivors...',
    slug: 'emergency-relief-efforts',
  },
];

export default function DisasterRecovery() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Disaster Recovery</h2>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left: Text Section */}
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Supporting Communities in Crisis</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong>Carebridge</strong> is dedicated to providing aid to communities affected by natural disasters, wars, and humanitarian crises worldwide.
          </p>
          <p className="text-gray-600 mb-4">
            Your donations help deliver urgent relief, including <strong>clean water, food, medical assistance, and safe shelter</strong> to those in need.
          </p>
          <p className="text-gray-600">
            Explore the map to see ongoing crisis areas and learn how your support can help <strong>rebuild lives</strong>.
          </p>
        </div>

        {/* Right: Map Section */}
        <div className="w-[600px] h-[600px] rounded-xl overflow-hidden shadow-2xl border border-gray-300">
          <MapContainer center={[10, 20]} zoom={2} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {disasterLocations.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  {location.issue}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Disaster Impact Section */}
      <h3 className="text-3xl font-semibold text-gray-900 text-center mt-16 mb-8">Disaster Impact</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {disasterImages.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Image src={img.src} alt={img.alt} width={300} height={200} className="object-cover w-full h-44" />
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-700">{img.story}</p>
              <Link href={`/stories/${img.slug}`} className="text-blue-600 font-semibold mt-2 block hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
