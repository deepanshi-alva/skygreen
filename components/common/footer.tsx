"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isInView && scrollDirection === "down") {
      setVisible(true);
    } else if (!isInView || scrollDirection === "up") {
      setVisible(false);
    }
  }, [isInView, scrollDirection]);

  return (
    <footer
      ref={ref}
      className="relative text-white w-full overflow-hidden bg-[url('/images/footer.PNG')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[86rem] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-sm">
          {/* Brand Info */}
          <div className="text-center lg:text-left">
            {/* <Image
              src="/images/logo/logo-bg-remove.png"
              alt="SKYGREEN Logo"
              width={200}
              height={60}
              className="mx-auto lg:mx-0 mb-3"
            /> */}
            <Link href="/" className="flex flex-col items-center lg:items-start mb-4">
              <div className="w-full max-w-[200px] sm:max-w-[260px] text-center lg:text-left">
                <Image
                  src="/images/logo/logo-bg-remove.png"
                  alt="Logo"
                  width={260}
                  height={80}
                  priority
                  className="w-full h-auto"
                />
                <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wide mt-1">
                  हमारा सूरज, हमारी बिजली !!
                </p>
              </div>
            </Link>

            <p className="text-gray-300 mb-4 leading-relaxed max-w-[18rem] mx-auto lg:mx-0">
              Indian brand in renewable energy, providing high-efficiency solar
              products.
            </p>

            <div className="space-y-2 text-gray-300 text-sm">
              <p>📍 D-247/31, Sector-63, Noida, 201301</p>
              <p>📞 +91-9811223252</p>
              <p>✉️ contact@skygreenenergies.com</p>
              <p>🌐 www.skygreenenergies.com</p>
            </div>

            {/* Social */}
            <div className="mt-5">
              <p className="text-green-400 font-semibold mb-2">We are social</p>
              <div className="flex justify-center lg:justify-start space-x-6">
                <Link
                  href="https://www.instagram.com/skygreen_energies/?hl=en"
                  target="_blank"
                  className="hover:scale-110 hover:text-green-400 transition-transform duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center lg:text-left">
            {/* About Us */}
            <div>
              <h4 className="font-semibold text-green-400 mb-3">About Us</h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  ["Home", "/"],
                  ["Products", "/products"],
                  ["Solar Calculator", "/calculator"],
                  ["FAQs", "/faqs"],
                  ["Contact Us", "/contact"],
                ].map(([name, link]) => (
                  <li key={name}>
                    <Link
                      href={link}
                      className="hover:text-green-400 transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Info */}
            <div>
              <h4 className="font-semibold text-green-400 mb-3">Legal Info</h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  ["Datasheet", "/images/pdfs/datasheet.pdf"],
                  ["Warranty", "/images/pdfs/warranty.pdf"],
                  ["Privacy Policy", "/images/pdfs/privacy-policy.pdf"],
                  ["Terms of Use", "/images/pdfs/terms-of-service.pdf"],
                  ["Disclaimer", "/images/pdfs/disclaimer.pdf"],
                ].map(([name, link]) => (
                  <li key={name}>
                    <Link
                      href={link}
                      target="_blank"
                      className="hover:text-green-400 transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coming Soon */}
            <div>
              <h4 className="font-semibold text-green-400 mb-3">Explore</h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  ["News", "/updates#news"],
                  ["Blogs", "/updates#blogs"],
                  ["Events", "/updates#events"],
                ].map(([name, link]) => (
                  <li key={name}>
                    <Link
                      href={link}
                      className="hover:text-green-400 transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google Map */}
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-lg font-semibold text-green-400 mb-4">
              Visit Us (Get Directions)
            </h1>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-green-700/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.301632802311!2d77.37256127549691!3d28.629332884454094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56fefbd6e3b%3A0x5c5e38df4d13d9f0!2sD-247%2F31%2C%20Sector%2063%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1705159976354!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-sm font-bold flex flex-col md:flex-row justify-center items-center text-gray-400">
          <p>
            © 2025 SKYGREEN ENERGIES (a brand operated by BriteOption
            Securities LLP). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
