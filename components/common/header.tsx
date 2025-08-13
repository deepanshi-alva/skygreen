"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    setMobileMenuOpen(false); // close mobile menu on navigation
    router.push(path);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow ${
        isSticky ? "shadow-md bg-black/90" : "bg-black"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        {/* Logo */}
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center space-x-2 mb-3"
        >
          <Image
            src="/images/logo/logo-bg-remove.png"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 font-medium">
          <Link
            href={"/"}
            onClick={() => handleNavigate("/company")}
            className="hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
          >
            Home
          </Link>
          <Link
            href={"/products"}
            onClick={() => handleNavigate("/products")}
            className="hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
          >
            Products
          </Link>
          <button
            onClick={() => handleNavigate("/calculator")}
            className="hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
          >
            Calculator
          </button>
          <button
            onClick={() => handleNavigate("/events")}
            className="hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
          >
            Solutions
          </button>
          <button
            onClick={() => handleNavigate("/b2b-solutions")}
            className="hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
          >
            Join Us
          </button>
        </div>

        {/* Language & Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <span>🇬🇧</span>
            <span>EN</span>
          </div>
          <Link
            // onClick={() => handleNavigate("/contact")}
            href={"/contact"}
            className="bg-red-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-red-700 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4 space-y-2">
          <button
            onClick={() => handleNavigate("/company")}
            className="block hover:text-red-500"
          >
            Company
          </button>
          <button
            onClick={() => handleNavigate("/products")}
            className="block hover:text-red-500"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigate("/downloads")}
            className="block hover:text-red-500"
          >
            Downloads
          </button>
          <button
            onClick={() => handleNavigate("/events")}
            className="block hover:text-red-500"
          >
            Events
          </button>
          <button
            onClick={() => handleNavigate("/b2b-solutions")}
            className="block hover:text-red-500"
          >
            B2B Solutions
          </button>
          <div className="flex items-center gap-2 mt-2">
            <span>🇬🇧 EN</span>
            <button
              onClick={() => handleNavigate("/contact")}
              className="bg-green-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-green-700 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
