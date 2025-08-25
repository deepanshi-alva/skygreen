"use client";

import React from "react";
import Image from "next/image";

const certificates = [
  "/images/certificates/30-yr-warranty.png",
  "/images/certificates/ass.png",
  "/images/certificates/bis.png",
  "/images/certificates/ce.png",
  "/images/certificates/delivery.png",
  "/images/certificates/eco.png",
  "/images/certificates/iec.png",
  "/images/certificates/ip68.png",
  "/images/certificates/iso.png",
  "/images/certificates/trusted.png",
  "/images/certificates/tuv.png",
];

const CertificateCarousel: React.FC = () => {
  return (
    // root: isolation so sibling elements can't clip the shadow
    <section className="relative z-10 isolation-isolate w-full">
      {/* outer shadow wrapper */}
      <div
        className="mx-auto w-full rounded-none"
        style={{ boxShadow: "0 4px 90px rgba(34, 197, 94, 0.5)" }}
      >
        {/* container: responsive layout (column on small, row on md+) */}
        <div className="flex flex-col md:flex-row items-center bg-black/30 py-2 px-3 md:px-8">
          {/* LEFT: heading / intro */}
          <div className="w-full md:w-56 flex-shrink-0 mb-4 md:mb-0 md:mr-8">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
                Our Certificates
              </h3>
              <p className="text-sm text-gray-300">
                Trusted, tested and certified — ensuring performance, safety and long-term reliability.
              </p>
            </div>
          </div>

          {/* RIGHT: marquee carousel (uses marquee-inner for inset shadow) */}
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
            <div className="carousel w-full marquee-inner">
              <div className="flex items-center animate-marquee space-x-20">
                {[...certificates, ...certificates].map((image, index) => (
                  <div key={index} className="flex-shrink-0 group">
                    <Image
                      src={image}
                      width={120}
                      height={120}
                      alt={`Certificate ${index + 1}`}
                      className="w-30 h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* local scoped styles for marquee + inset shadow */}
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
          will-change: transform;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* ensure long row doesn't wrap unexpectedly */
        .carousel > .animate-marquee {
          display: flex;
          align-items: center;
          width: max-content;
        }

        /* marquee-inner: inset shadow overlay (pointer-events: none keeps logos interactive) */
        .marquee-inner {
          position: relative;
          padding: 8px 0;
          overflow: hidden;
        }
        .marquee-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow:
            inset 0 32px 48px rgba(0, 0, 0, 0.85),
            inset 0 -24px 36px rgba(0, 0, 0, 0.75);
        }

        /* small hover lift for group */
        .group:hover img {
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
};

export default CertificateCarousel;
