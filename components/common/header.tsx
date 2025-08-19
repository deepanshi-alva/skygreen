"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import LanguageDropdown from "@/components/LanguageDropdown"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path: string) =>
    `hover:text-green-500 transform hover:scale-110 transition-transform duration-300 ${
      pathname === path ? "text-green-500 font-semibold" : ""
    }`;

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-shadow ${
        isSticky ? "shadow-md bg-black/90" : "bg-black"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center space-x-2 mb-3"
        >
          <Image
            src="/images/logo/logo-bg-remove.png"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 font-medium">
          <Link
            href={"/"}
            className={linkClasses("/")}
          >
            Home
          </Link>
          <Link
            href={"/products"}
            className={linkClasses("/products")}
          >
            Products
          </Link>
          {/* <button
            className={linkClasses("/calculator")}
          >
            Calculator
          </button> */}
          <Link
            href={"/faqs"}
            className={linkClasses("/faqs")}
          >
            FAQ&apos;s
          </Link>
          <Link
            href={"/join"}
            className={linkClasses("/join")}
          >
            Join Us
          </Link>
        </div>

        {/* Language & Button */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <LanguageDropdown/> */}
          <Link
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
          <Link
            href={"/"}
            className={linkClasses("/")}
          >
            Home
          </Link>
          <Link
            href={"/products"}
            className={linkClasses("/products")}
          >
            Products
          </Link>
          {/* <Link
            href={"#"}
            className={linkClasses("/calculator")}
          >
            Calculator
          </Link> */}
          <Link
            href={"/faqs"}
            className={linkClasses("/faqs")}
          >
            FAQ&apos;s
          </Link>
          <Link
            href={"/join"}
            className={linkClasses("/join")}
          >
            Join Us
          </Link>
          <div className="flex items-center gap-2 mt-2">
            {/* <LanguageDropdown/> */}
            <Link
              href={"/contact"}
              className="bg-green-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-green-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
