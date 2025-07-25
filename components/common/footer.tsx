// components/Footer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) setVisible(true);
  }, [isInView]);

  return (
    // <div className="relative text-white h-full px-30 py-12 overflow-hidden" ref={ref}>
    <div className="relative text-white min-h-screen w-full overflow-hidden  justify-end px-30 py-20" ref={ref}>
      {/* Diagonally split background using two animated divs */}
      <motion.div
        initial={{ x: "-100%", y: "-100%" }}
        animate={visible ? { x: "0%", y: "0%" } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          backgroundColor: "#00762d",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          zIndex: -2,
        }}
      />
      <motion.div
        initial={{ x: "100%", y: "100%" }}
        animate={visible ? { x: "0%", y: "0%" } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          backgroundColor: "#001707",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          zIndex: -3,
        }}
      />

      {/* Glass Footer Content */}
      <div className="backdrop-blur-md bg-black/80 px-15 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Company Info */}
          <div>
            <img src="/images/logo/logo-bg-remove.png" alt="SKYGREEN Logo" className="h-24 w-100 " />
            <p className="text-gray-300 mb-3">
              Indian brand in the renewable energy industry, providing high-efficiency solar products.
            </p>
            <p className="mb-1">📍 Kanpur, Uttar Pradesh, India</p>
            <p className="mb-1">📞 +91 90000 00000</p>
            <p className="mb-1">✉️ hello@skygreen.in</p>

            <div className="mt-4">
              <p className="text-green-400 font-semibold mb-1">We are social</p>
              <div className="flex space-x-3">
                <img src="/icons/facebook.svg" alt="Facebook" className="h-5" />
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-5" />
                <img src="/icons/youtube.svg" alt="YouTube" className="h-5" />
                <img src="/icons/x.svg" alt="X" className="h-5" />
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Products</h4>
            <ul className="space-y-1 text-gray-300">
              <li>575W TOPCon</li>
              <li>545W Monofacial</li>
              <li>Solar Inverters</li>
              <li>Mounting Systems</li>
              <li>Batteries</li>
              <li>Accessories</li>
            </ul>
          </div>

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

        {/* Bottom Line */}
        <div className="border-t border-gray-600 mt-10 pt-4 text-xs flex flex-col md:flex-row justify-between items-center text-gray-400">
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
