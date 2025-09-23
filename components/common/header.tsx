"use client";

import { useState, useEffect } from "react";
import { Menu, X, Headphones, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext"; // ✅ import auth context
import React from "react";
import AuthDropdown from "./authDropdown";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const pathname = usePathname();

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
                हमारा सूरज हमारी बिजली
              </p>
            </div>
          </Link>


          {/* Desktop Menu (moving green border applied) */}
          <div className="hidden md:flex mt-2 space-x-12 font-medium py-4 px-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-md shadow-md moving-border">
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
              onMouseEnter={() => setSupportOpen(true)}
              onMouseLeave={() => setSupportOpen(false)}
            >
              <button
                className={`font-semibold flex mt-2 items-center mr-8 transition-transform duration-300 ${supportOpen ? "text-green-500 scale-110" : "hover:text-green-400 hover:scale-110"
                  } py-4 px-4 rounded-full border border-white/20 bg-black/60 backdrop-blur-md shadow-md`}
              >
                <Headphones size={24} />
              </button>

              {/* Support Popup */}
              {supportOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 text-white rounded-xl shadow-xl p-5 z-50 border border-gray-700">
                  <p className="font-semibold text-green-400 mb-2">Pre-Sale</p>
                  <a href="mailto:sale@skygreen.com" className="block text-gray-300 hover:text-green-400">
                    sale@skygreen.com
                  </a>

                  <hr className="my-4 border-gray-700" />

                  <p className="font-semibold text-green-400 mb-2">After-Sale</p>
                  <a href="mailto:service@skygreen.com" className="block text-gray-300 hover:text-green-400">
                    service@skygreen.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Responds within 24 hours</p>

                  <hr className="my-4 border-gray-700" />

                  <p className="font-semibold text-green-400 mb-2">Customer Support</p>
                  <a href="tel:+19085700909" className="block text-gray-300 hover:text-green-400">
                    +1 908-570-0909
                  </a>
                  <p className="text-sm text-gray-500">Mon – Sat, 10:00–18:00 (PDT)</p>
                </div>
              )}
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
              <span className="transition-transform duration-300 group-hover:translate-x-1">Contact Us</span>
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
          <div className="md:hidden bg-black text-white px-4 pb-4 space-y-2">
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

            {/* Mobile Support Dropdown */}
            <div className="mt-3">
              <button
                className={`font-semibold flex items-center mr-8 transition-transform duration-300 ${supportOpen ? "text-green-500 scale-110" : "hover:text-green-400 hover:scale-110"
                  }`}
                onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
              >
                <Headphones size={18} />
              </button>

              {mobileSupportOpen && (
                <div className="mt-2 w-full bg-white text-black rounded-lg shadow-lg p-4">
                  <p className="font-semibold mb-1">Pre-Sale</p>
                  <a href="mailto:sale@skygreen.com" className="text-blue-600">
                    sale@skygreen.com
                  </a>

                  <p className="font-semibold mt-3 mb-1">After-Sale</p>
                  <a href="mailto:service@skygreen.com" className="text-blue-600">
                    service@skygreen.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Respond in 24 hours</p>

                  <hr className="my-3" />
                  <p className="font-semibold">Customer Support</p>
                  <a href="tel:+19085700909" className="text-blue-600 block">
                    +1 908-570-0909
                  </a>
                  <p className="text-sm text-gray-500">Monday to Saturday 10:00-18:00 (PDT)</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Link
                href={"/contact"}
                className="bg-red-600 px-4 py-2 rounded-full text-white font-semibold hover:bg-red-700 transition w-full text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Scoped styled-jsx for the moving green border (no global CSS) */}
      <style jsx>{`
        .moving-border {
          position: relative;
          border-radius: 9999px;
          overflow: hidden;
        }

        /* animated gradient ring */
        .moving-border::before {
          content: "";
          position: absolute;
          inset: 0;
          margin: -8px; /* ring thickness */
          border-radius: inherit;
          background: conic-gradient(
            from 120deg,
            rgba(0, 0, 0, 0) 20deg,
            rgba(0, 0, 0, 0) 40deg,
            rgba(36, 185, 16, 0.95) 130deg,
            rgba(36, 185, 16, 0.95) 140deg,
            rgba(36, 185, 16, 0.95) 170deg,
            rgba(0, 0, 0, 0) 180deg,
            rgba(0, 0, 0, 0)
          );
          filter: blur(6px); /* glow */
          z-index: 0;
          pointer-events: none;
          animation: spin 3.8s linear infinite;
          transform-origin: 50% 50%;
        }

        /* center mask so inner area remains usable */
        .moving-border::after {
          content: "";
          position: absolute;
          inset: 3px; /* same as margin above */
          border-radius: calc(9999px - 3px);
          background: rgba(0, 0, 0, 1); /* match your nav bg; tweak if needed */
          z-index: 1;
          pointer-events: none;
          
        }

        /* ensure children (links) appear above the mask */
        .moving-border :global(*) {
          position: relative;
          z-index: 2;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
