'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-shadow ${isSticky ? 'shadow-md bg-black/90' : 'bg-black'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 mb-3">
            <Image src="/images/logo/logo-bg-remove.png" alt="Logo" width={120} height={40} priority />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 font-medium">
          <a href="#" className="hover:text-red-500">Company</a>
          <a href="#" className="hover:text-red-500">Products</a>
          <a href="#" className="hover:text-red-500">Downloads</a>
          <a href="#" className="hover:text-red-500">Events</a>
          <a href="#" className="hover:text-red-500">B2B Solutions</a>
        </div>

        {/* Language & Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <span>🇬🇧</span>
            <span>EN</span>
          </div>
          <button className="bg-red-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-red-700 transition">
            Contact Us
          </button>
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
          <a href="#" className="block hover:text-red-500">Company</a>
          <a href="#" className="block hover:text-red-500">Products</a>
          <a href="#" className="block hover:text-red-500">Downloads</a>
          <a href="#" className="block hover:text-red-500">Events</a>
          <a href="#" className="block hover:text-red-500">B2B Solutions</a>
          <div className="flex items-center gap-2 mt-2">
            <span>🇬🇧 EN</span>
            <button className="bg-red-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-red-700 transition">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
