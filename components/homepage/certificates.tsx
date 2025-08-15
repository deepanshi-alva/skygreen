"use client";

import React from "react";
import Image from "next/image";

const certificates = [
  "/images/certificates/ce.png",
  "/images/certificates/cec.png",
  "/images/certificates/cqc.png",
  "/images/certificates/lapi.png",
  "/images/certificates/mcs.png",
  "/images/certificates/n.png",
  "/images/certificates/solar.png",
  "/images/certificates/tuv.png", // Add more images as needed
];

const CertificateCarousel = () => {
  return (
    <div
      className="flex items-center justify-center space-x-12 overflow-hidden w-full bg-black/300 py-3 hover:cursor-pointer hover:animate-none z-2"
      style={{
        boxShadow: "0 4px 90px rgba(34, 197, 94, 0.5)", // Custom green shadow
      }}
    >
      {/* Carousel Section */}
      <div className="carousel flex items-center justify-center animate-marquee space-x-20">
        {/* Duplicate certificates for seamless loop */}
        {[...certificates, ...certificates].map((image, index) => (
          <div key={index} className="flex-shrink-0 group">
            {/* group to enable hover effect */}
            <Image
              src={image}
              width={30}
              height={30}
              alt={`Certificate ${index + 1}`}
              className="w-30 h-auto transition-transform duration-300 ease-in-out group-hover:scale-110" // Transition to enlarge image
            />
          </div>
        ))}
      </div>

      {/* Styles for Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
          animation-play-state: running;
        }

        .animate-marquee:hover {
          animation-play-state: paused; /* Pause animation when hovering over carousel */
        }
      `}</style>
    </div>
  );
};

export default CertificateCarousel;
