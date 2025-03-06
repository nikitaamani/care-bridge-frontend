import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          {/* Branding and Description */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-yellow-400">CharityConnect</h2>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-400 text-sm">
          <div>
            <h3 className="text-orange-400 font-semibold mb-3">Donors</h3>
            <ul>
              <li><Link href="/HowItWorks">Ways to Give</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange-400 font-semibold mb-3">Charity</h3>
            <ul>
              <li><Link href="/health">Health & Medical</Link></li>
              <li><Link href="/humanitarian">Disaster Relief</Link></li>
              <li><Link href="/education">Education</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange-400 font-semibold mb-3">About Us</h3>
            <ul>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange-400 font-semibold mb-3">Learn More</h3>
            <ul>
              <li><Link href="/gallery">Gallery</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Security */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-6 text-xl text-gray-400">
            <Link href="/facebook"><FaFacebook className="hover:text-blue-500" /></Link>
            <Link href="/instagram"><FaInstagram className="hover:text-pink-500" /></Link>
            <Link href="/linkedin"><FaLinkedin className="hover:text-blue-700" /></Link>
          </div>

          {/* Security Badges */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <img src="/images/security-badge.png" alt="SSL Secure" className="h-6" />
            <img src="/images/trust-badge.png" alt="Accredited Charity" className="h-6" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2025 CharityConnect, a 501(c)(3) CareBridge organization. EIN: +254-3456789.</p>
          {/* Currency Selector */}
          <select className="mt-4 md:mt-0 bg-gray-800 text-white border border-gray-600 rounded px-2 py-1">
            <option>$ USD</option>
            <option>€ EUR</option>
            <option>£ GBP</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
