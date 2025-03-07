import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20 px-8"> {/* Increased padding */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10">
          {/* Branding and Description */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-gray-400 mt-2 max-w-md">
              Making it easy and safe for you to support charities worldwide, while giving nonprofits the tools they need to thrive.
            </p>
          </div>

          {/* Interactive Help Center Button */}
          <Link href="/help-center">
            <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition">
              Help Center
            </button>
          </Link>
        </div>

        {/* Footer Links Grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-gray-400 text-base"> {/* Increased base text size */}
  <div>
    <h3 className="text-orange-400 font-bold text-lg mb-4">Donors</h3> {/* Increased size */}
    <ul>
      <li><Link href="/how" className="text-md hover:text-white transition">Ways to Give</Link></li>
    </ul>
  </div>

  <div>
    <h3 className="text-orange-400 font-bold text-lg mb-4">Charity</h3> {/* Increased size */}
    <ul>
      <li><Link href="/health" className="text-md hover:text-white transition">Health & Medical</Link></li>
      <li><Link href="/humanitarian" className="text-md hover:text-white transition">Disaster Relief</Link></li>
      <li><Link href="/education" className="text-md hover:text-white transition">Education</Link></li>
    </ul>
  </div>

  <div>
    <h3 className="text-orange-400 font-bold text-lg mb-4">About Us</h3> {/* Increased size */}
    <ul>
      <li><Link href="/team" className="text-md hover:text-white transition">Our Team</Link></li>
      <li><Link href="/faqs" className="text-md hover:text-white transition">FAQs</Link></li>
      <li><Link href="/contact" className="text-md hover:text-white transition">Contact Us</Link></li>
    </ul>
  </div>

  <div>
    <h3 className="text-orange-400 font-bold text-lg mb-4">Learn More</h3> {/* Increased size */}
    <ul>
      <li><Link href="/gallery" className="text-md hover:text-white transition">Gallery</Link></li>
    </ul>
  </div>
</div>


        


        {/* Project Name at the Bottom */}
        <div className="mt-12 text-center">
          <h1 className="text-center text-[3.8rem] md:text-[9rem] lg:text-[11rem] xl:tracking-[0.12em] font-black py-6 my-2 uppercase tracking-widest text-[#E6F5F0]">CareBridge</h1> {/* Large and bold */}
        </div>
        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2025 CareBridge, a 501(c)(3) CareBridge organization. EIN: +254-3456789.</p>
          {/* Currency Selector */}
          <select className="mt-4 md:mt-0 bg-gray-800 text-white border border-gray-600 rounded px-3 py-1">
            <option>$ USD</option>
            <option>€ EUR</option>
            <option>£ GBP</option>
          </select>
        </div>
        {/* Social Media & Security */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-6 text-xl text-gray-400">
            <Link href="/facebook"><FaFacebook className="hover:text-blue-500" /></Link>
            <Link href="/instagram"><FaInstagram className="hover:text-pink-500" /></Link>
            <Link href="/linkedin"><FaLinkedin className="hover:text-blue-700" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
