"use client";

import { useState, useEffect } from "react";
import { Menu, X, Headphones, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext"; // ✅ import auth context
import React, { useRef } from "react";
import AuthDropdown from "./authDropdown";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const pathname = usePathname();
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setSupportOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setSupportOpen(false);
    }, 2000); // delay 200ms before closing
  };

  const { user, logout } = useAuth(); // ✅ get user & logout

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path: string) =>
    `hover:text-green-500 transform hover:scale-110 transition-transform duration-300 ${pathname === path ? "text-green-500 font-semibold" : ""
    }`;

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 pb-1 transition-all duration-300 ${isSticky ? "bg-black/10 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <div className="w-full max-w-[200px] sm:max-w-[260px] text-center">
              <Image
                src="/images/logo/logo-bg-remove.png"
                alt="Logo"
                width={260}
                height={80}
                priority
                className="w-full h-auto" // ✅ responsive scaling
              />
              <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wide mt-1">
                हमारा सूरज, हमारी बिजली !!
              </p>
            </div>
          </Link>

          {/* Desktop Menu (moving green border applied) */}
          <div
            className="
              hidden md:flex mt-2 
              space-x-4 lg:space-x-8 xl:space-x-12 
              font-medium 
              text-sm lg:text-base xl:text-lg 
              py-3 px-4 
              rounded-full border border-white/20 bg-black/50 backdrop-blur-md shadow-md moving-border
              whitespace-nowrap
            "
          >

            <Link href={"/"} className={linkClasses("/")}>
              Home
            </Link>
            <Link href={"/products"} className={linkClasses("/products")}>
              Products
            </Link>
            <Link href={"/calculator"} className={linkClasses("/calculator")}>
              Solar Calculator
            </Link>
            <Link href={"/faqs"} className={linkClasses("/faqs")}>
              FAQ&apos;s
            </Link>
            <Link href={"/join"} className={linkClasses("/join")}>
              Join Us
            </Link>
          </div>

          {/* Right Section: Support + Auth */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Support Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Button */}
              <button
                className={`font-semibold flex mt-2 items-center mr-8 transition-transform duration-300 ${supportOpen
                  ? "text-green-500 scale-110"
                  : "hover:text-green-400 hover:scale-110"
                  } py-3 px-3 rounded-full border border-white/20 bg-black/60 backdrop-blur-md shadow-md`}
              >
                <Headphones size={22} />
              </button>

              {/* Dropdown */}
              <div
                onMouseEnter={() => setSupportOpen(true)}
                onMouseLeave={() => setSupportOpen(false)}
                className={`absolute right-1/2 translate-x-1/2 mt-3 bg-[#111] text-white rounded-lg shadow-lg px-5 py-4 z-50 border border-white/10 w-max
                  transition-all duration-300 origin-top transform
                  ${supportOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                {/* General & Sales */}
                <div className="mb-3">
                  <p className="font-semibold text-green-400 mb-1">
                    General & Sales Enquiries
                  </p>
                  <a
                    href="mailto:contact@skygreenenergies.com"
                    className="flex items-center gap-2 text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800/80 hover:text-green-400"
                  >
                    📧 contact [at] skygreenenergies [dot] com
                  </a>
                </div>

                <hr className="my-2 border-gray-700" />

                {/* Service & Warranty */}
                <div className="mb-3">
                  <p className="font-semibold text-green-400 mb-1">
                    Service & Warranty
                  </p>
                  <a
                    href="mailto:warranty@skygreen.com"
                    className="flex items-center gap-2 text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800/80 hover:text-green-400"
                  >
                    📧 warranty [at] skygreenenergies [dot] com
                  </a>
                </div>

                <hr className="my-2 border-gray-700" />

                {/* Customer Support */}
                <div>
                  <p className="font-semibold text-green-400 mb-1">
                    Customer Support (India)
                  </p>
                  <a
                    href="tel:+919891055535"
                    className="flex items-center gap-2 text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800/80 hover:text-green-400"
                  >
                    📞 +91 98112 • 23252
                  </a>
                  <p className="text-md font-bold text-white-500 mt-1 flex items-center gap-2">
                    🕒 Mon – Sat, 10:00 – 18:00 (IST)
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Auth Section (kept commented placeholders) */}
            {/* {!user ? (
              <Link
                href={"/login"}
                className="bg-green-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-green-700 transition"
              >
                Login
              </Link>
            ) : (
              <AuthDropdown />
            )} */}

            {/* Contact Us */}
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="relative group rounded-full px-6 py-3 bg-green-800/20 border border-green-400/40 backdrop-blur-md text-white font-semibold shadow-[0_0_15px_rgba(34,197,94,0.7)] hover:shadow-[0_0_25px_rgba(34,197,94,0.9)] transition-all duration-300 cursor-pointer flex items-center space-x-2 mt-2"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Contact Us
              </span>
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
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
          <div className="md:hidden bg-black/95 text-white px-4 py-6 space-y-4 rounded-b-2xl shadow-lg">
            {/* Links */}
            <div className="flex flex-col space-y-3 font-medium">
              <Link href="/" className={linkClasses("/")}>Home</Link>
              <Link href="/products" className={linkClasses("/products")}>Products</Link>
              <Link href="/calculator" className={linkClasses("/calculator")}>Solar Calculator</Link>
              <Link href="/faqs" className={linkClasses("/faqs")}>FAQ&apos;s</Link>
              <Link href="/join" className={linkClasses("/join")}>Join Us</Link>
            </div>

            {/* Mobile Support Dropdown */}
            <div className="mt-4">
              <button
                className="w-full flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-lg font-semibold hover:bg-zinc-700 transition"
                onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
              >
                <span className="flex items-center gap-2">
                  <Headphones size={18} />
                  <span>Support</span>
                </span>
                <span>{mobileSupportOpen ? "▲" : "▼"}</span>
              </button>

              {mobileSupportOpen && (
                <div className="mt-3 w-full bg-white text-black rounded-lg shadow-lg p-4 space-y-3">
                  {/* General & Sales */}
                  <div>
                    <p className="font-semibold mb-1 text-green-600">General & Sales</p>
                    <a href="mailto:contact@skygreenenergies.com" className="block text-blue-600">
                      contact@skygreenenergies.com
                    </a>
                  </div>

                  {/* Service & Warranty */}
                  <div>
                    <p className="font-semibold mb-1 text-green-600">Service & Warranty</p>
                    <a href="mailto:warranty@skygreen.com" className="block text-blue-600">
                      warranty@skygreen.com
                    </a>
                  </div>

                  {/* Customer Support */}
                  <div>
                    <p className="font-semibold mb-1 text-green-600">Customer Support (India)</p>
                    <a href="tel:+919891055535" className="block text-blue-600">
                      +91 98112 • 23252
                    </a>
                    <p className="text-sm text-gray-500">Mon – Sat, 10:00 – 18:00 (IST)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us button */}
            <div className="flex items-center mt-4">
              <Link
                href="/contact"
                className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-center font-semibold text-white transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
