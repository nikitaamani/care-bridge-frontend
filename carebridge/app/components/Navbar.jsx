"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Image,
  LayoutDashboard,
  LogIn,
  Search as SearchIcon,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Dummy frontend content to search through
  const frontendContent = [
    { id: 1, text: "Welcome to CareBridge", link: "/" },
    { id: 2, text: "About Us", link: "/about" },
    { id: 3, text: "Our Gallery", link: "/gallery" },
    { id: 4, text: "Donor Dashboard", link: "/donor-dashboard" },
    { id: 5, text: "Charity Dashboard", link: "/charity-dashboard" },
    { id: 6, text: "Admin Panel", link: "/admin-dashboard" },
  ];

  // Dummy footer content to search through
  const footerContent = [
    { id: 1, text: "Privacy Policy", link: "/privacy-policy" },
    { id: 2, text: "Terms of Service", link: "/terms" },
    { id: 3, text: "Contact Us", link: "/contact" },
    { id: 4, text: "FAQ", link: "/faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Combine frontend and footer content for searching
    const allContent = [...frontendContent, ...footerContent];

    // Filter content based on the search query
    const results = allContent.filter((item) =>
      item.text.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolling
          ? "bg-white bg-opacity-80 backdrop-blur-md shadow-md text-black"
          : "bg-transparent text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-slate-800">
            <Link href="/">CareBridge</Link>
          </div>

          {/* Centered Search Bar */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-black" />
            </div>

            {/* Display Search Results */}
            {searchQuery && (
              <div className="absolute top-12 w-96 bg-white shadow-lg rounded-md overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      {result.text}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-700">
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-7 items-center">
            <Link href="/" onClick={handleLinkClick} className="nav-link">
              <Home className="w-5 h-5 mr-1" /> Home
            </Link>
            <Link href="/about" onClick={handleLinkClick} className="nav-link">
              <Info className="w-5 h-5 mr-1" /> About
            </Link>
            <Link href="/gallery" onClick={handleLinkClick} className="nav-link">
              <Image className="w-5 h-5 mr-1" /> Gallery
            </Link>

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="nav-link flex items-center"
              >
                <LayoutDashboard className="w-5 h-5 mr-1" /> Pages{" "}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                  <Link
                    href="/donor-dashboard"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Donor Dashboard
                  </Link>
                  <Link
                    href="/charity-dashboard"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Charity Dashboard
                  </Link>
                  <Link
                    href="/admin-dashboard"
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Login/Logout Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-1" /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          className="absolute top-5 right-5 text-black"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <Link href="/" onClick={handleLinkClick} className="nav-link-mobile">
            <Home className="w-5 h-5 mr-1" /> Home
          </Link>
          <Link href="/about" onClick={handleLinkClick} className="nav-link-mobile">
            <Info className="w-5 h-5 mr-1" /> About
          </Link>
          <Link href="/gallery" onClick={handleLinkClick} className="nav-link-mobile">
            <Image className="w-5 h-5 mr-1" /> Gallery
          </Link>

          {/* Mobile Pages Dropdown */}
          <div className="w-full text-center">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="nav-link-mobile flex items-center justify-center w-full"
            >
              <LayoutDashboard className="w-5 h-5 mr-1" /> Pages{" "}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 space-y-2">
                <Link href="/donor-dashboard" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Donor Dashboard
                </Link>
                <Link href="/charity-dashboard" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Charity Dashboard
                </Link>
                <Link href="/admin-dashboard" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Admin Panel
                </Link>
              </div>
            )}
          </div>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-1" /> Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <LogIn className="w-5 h-5 mr-1" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;