"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  // Scroll direction detection
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
    <div
      className="relative text-white w-full overflow-hidden justify-end px-36 py-20"
      ref={ref}
    >
      {/* Diagonal Green Layer */}
      <motion.div
        initial={{ x: "-100%", y: "-100%" }}
        animate={visible ? { x: "0%", y: "0%" } : { x: "-100%", y: "-100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          backgroundColor: "#00762d",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          zIndex: -2,
        }}
      />

      {/* Diagonal Dark Layer */}
      <motion.div
        initial={{ x: "100%", y: "100%" }}
        animate={visible ? { x: "0%", y: "0%" } : { x: "100%", y: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          backgroundColor: "#001707",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          zIndex: -3,
        }}
      />

      {/* Footer content remains the same below */}
      <div className="backdrop-blur-md bg-black/80 max-w-[90rem] px-15 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
          {/* Company Info */}
          <div>
            <Image
              src="/images/logo/logo-bg-remove.png"
              alt="SKYGREEN Logo"
              className="w-40 h-auto mb-4"
            />
            <p className="text-gray-300 mb-3 w-52">
              Indian brand in the renewable energy industry, providing
              high-efficiency solar products.
            </p>
            <p className="mb-1">📍 Kanpur, Uttar Pradesh, India</p>
            <p className="mb-1">📞 +91 90000 00000</p>
            <p className="mb-1">✉️ hello@skygreen.in</p>

            <div className="mt-4">
              <p className="text-green-400 font-semibold mb-1">We are social</p>
              <div className="flex space-x-6 mt-6">
                <Facebook className="h-5 w-5 hover:text-green-400 transition-colors duration-200" />
                <Linkedin className="h-5 w-5 hover:text-green-400 transition-colors duration-200" />
                <Youtube className="h-5 w-5 hover:text-green-400 transition-colors duration-200" />
                <Twitter className="h-5 w-5 hover:text-green-400 transition-colors duration-200" />
              </div>
            </div>
          </div>

          <div className="ml-16 flex gap-24 mt-6">
            {/* About Us */}
            <div>
              <h4 className="font-semibold text-green-400 mb-2">About Us</h4>
              <ul className="space-y-1 text-gray-300">
                <li>Company</li>
                <li>Dealership</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>News</li>
                <li>FAQs</li>
              </ul>
            </div>

            {/* Legal Info */}
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Legal Info</h4>
              <ul className="space-y-1 text-gray-300">
                <li>Datasheet</li>
                <li>Warranty</li>
                <li>Certificates</li>
                <li>Installation Manuals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-xs flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2025 SKYGREEN. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Legal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
