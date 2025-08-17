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
  "/images/certificates/tuv.png",
];

const CertificateCarousel = () => {
  return (
    // 1) Raise stacking and isolate so siblings can't cover the shadow
    <section className="relative z-10 isolation-isolate w-full">
      {/* 2) Shadow on the OUTER wrapper (overflow remains visible here) */}
      <div
        className="mx-auto w-full rounded-none"
        style={{ boxShadow: "0 4px 90px rgba(34, 197, 94, 0.5)" }}
      >
        {/* 3) Keep overflow-hidden ONLY on the inner scroller */}
        <div className="flex items-center justify-center w-full bg-black/30 py-3">
          <div className="carousel flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center animate-marquee space-x-20">
              {[...certificates, ...certificates].map((image, index) => (
                <div key={index} className="flex-shrink-0 group">
                  <Image
                    src={image}
                    width={30}
                    height={30}
                    alt={`Certificate ${index + 1}`}
                    className="w-30 h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CertificateCarousel;
