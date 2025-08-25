"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Headphones } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext"; // ✅ import auth context
import React from "react";
import { ArrowRight } from "lucide-react";

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
    `hover:text-green-500 transform hover:scale-110 transition-transform duration-300 ${
      pathname === path ? "text-green-500 font-semibold" : ""
    }`;

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-shadow"
        }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center space-x-2 mb-3 pb-4 pt-1 px-4
             rounded-full border border-white/20 
             bg-black/40 backdrop-blur-md shadow-md"
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
        <div
          className="hidden md:flex space-x-12 font-medium py-4 px-4 
             rounded-full border border-white/20 
             bg-black/60 backdrop-blur-md shadow-md"
        >
          <Link href={"/"} className={linkClasses("/")}>
            Home
          </Link>
          <Link href={"/products"} className={linkClasses("/products")}>
            Products
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
              className={`font-semibold flex items-center mr-8 transition-transform duration-300 ${
                supportOpen
                  ? "text-green-500 scale-110"
                  : "hover:text-green-400 hover:scale-110"
              } py-4  px-4
             rounded-full border border-white/20 
             bg-black/60 backdrop-blur-md shadow-md`}
            >
              <Headphones size={24} />
            </button>

            {/* Support Popup */}
            {supportOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 text-white rounded-xl shadow-xl p-5 z-50 border border-gray-700">
                <p className="font-semibold text-green-400 mb-2">Pre-Sale</p>
                <a
                  href="mailto:sale@skygreen.com"
                  className="block text-gray-300 hover:text-green-400"
                >
                  sale@skygreen.com
                </a>

                <hr className="my-4 border-gray-700" />

                <p className="font-semibold text-green-400 mb-2">After-Sale</p>
                <a
                  href="mailto:service@skygreen.com"
                  className="block text-gray-300 hover:text-green-400"
                >
                  service@skygreen.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Responds within 24 hours
                </p>

                <hr className="my-4 border-gray-700" />

                <p className="font-semibold text-green-400 mb-2">
                  Customer Support
                </p>
                <a
                  href="tel:+19085700909"
                  className="block text-gray-300 hover:text-green-400"
                >
                  +1 908-570-0909
                </a>
                <p className="text-sm text-gray-500">
                  Mon – Sat, 10:00–18:00 (PDT)
                </p>
              </div>
            )}
          </div>

          {/* ✅ Auth Section */}
          {/* {!user ? (
            <Link
              href={"/login"}
              className="bg-green-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-green-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <button className="px-4 py-2 bg-gray-100 text-black rounded">
                {user.username} <ChevronDown className="inline w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded hidden group-hover:block">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                {user?.role?.name === "Admin" && (
                  <Link
                    href="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Manage Users
                  </Link>
                )}

                {user?.role?.name === "Caller" && (
                  <Link
                    href="/caller/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Assigned Users
                  </Link>
                )}

                {user?.role?.name === "Customer" && (
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )} */}

          {/* Contact Us */}
          <button
            type="button"
            onClick={() => router.push("/contact")}
            className="relative group rounded-full px-6 py-3 
             bg-green-800/20 border border-green-400/40 
             backdrop-blur-md text-white font-semibold 
             shadow-[0_0_15px_rgba(34,197,94,0.7)]
             hover:shadow-[0_0_25px_rgba(34,197,94,0.9)]
             transition-all duration-300 cursor-pointer
             flex items-center space-x-2"
          >
            {/* Button content */}
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
        <div className="md:hidden bg-black text-white px-4 pb-4 space-y-2">
          <Link href={"/"} className={linkClasses("/")}>
            Home
          </Link>
          <Link href={"/products"} className={linkClasses("/products")}>
            Products
          </Link>
          <Link href={"/faqs"} className={linkClasses("/faqs")}>
            FAQ&apos;s
          </Link>
          <Link href={"/join"} className={linkClasses("/join")}>
            Join Us
          </Link>

          {/* ✅ Mobile Auth */}
          {/* {!user ? (
            <Link
              href={"/login"}
              className="block bg-green-600 px-4 py-2 rounded text-center mt-3"
            >
              Login
            </Link>
          ) : (
            <div className="mt-3 bg-white text-black rounded-lg shadow-lg">
              <p className="px-4 py-2 font-semibold border-b">
                Hello, {user.username}
              </p>

              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>

              {user?.role?.name === "Admin" && (
                <Link
                  href="/admin/users"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Manage Users
                </Link>
              )}

              {user?.role?.name === "Caller" && (
                <Link
                  href="/caller/users"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Assigned Users
                </Link>
              )}

              {user?.role?.name === "Customer" && (
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>
              )}

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              >
                Logout
              </button>
            </div>
          )} */}

          {/* Mobile Support Dropdown */}
          <div className="mt-3">
            <button
              className={`font-semibold flex items-center mr-8 transition-transform duration-300 ${
                supportOpen
                  ? "text-green-500 scale-110"
                  : "hover:text-green-400 hover:scale-110"
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
                <p className="text-sm text-gray-500 mt-1">
                  Respond in 24 hours
                </p>

                <hr className="my-3" />
                <p className="font-semibold">Customer Support</p>
                <a href="tel:+19085700909" className="text-blue-600 block">
                  +1 908-570-0909
                </a>
                <p className="text-sm text-gray-500">
                  Monday to Saturday 10:00-18:00 (PDT)
                </p>
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
  );
}
