"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reveal, setReveal] = useState(false);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= 3) {
      v.pause();
      setReveal(true);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const timer = setTimeout(() => {
      if (!reveal) {
        try {
          v.pause();
        } catch {}
        setReveal(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [reveal]);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero/HeroPage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0" />

      {/* Main Content */}
      <div
        className={`relative z-10 text-center px-4 flex-1 flex flex-col items-center justify-center ${
          reveal ? "animate-fadeInSlow" : "opacity-0"
        }`}
      >
        <h2
          className={`${orbitron.className} font-extrabold mb-4 leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-300 to-green-500 animate-gradient text-[clamp(2rem,5vw+1rem,4.5rem)]`}
        >
          SMART SOLAR
          <br className="hidden md:block" /> for a Sustainable Future.
        </h2>

        <p className="text-green-200 mb-6 text-[clamp(1rem,1.2vw+0.6rem,1.25rem)] max-w-[70ch]">
          BIS & TÜV Certified panels, built for India’s toughest climates.
        </p>

        <div className="flex items-center justify-center gap-[clamp(0.5rem,1.5vw,1rem)]">
          <Button
            className=" glowButton"
            style={{ padding: "25px 20px", background: "black" }}
          >
            <span className="z-3">GET A QUOTE</span>
            <span
              className="glowEffect"
              style={{ opacity: " 0.8", filter: "blur(35px)" }}
            ></span>
          </Button>
          <Button
            variant="outline"
            className="
    rounded-full border border-green-400/40
    bg-black/50 backdrop-blur-md
    text-green-300 font-semibold
    hover:bg-green-300 hover:text-black
    shadow-md transition-all duration-300
    text-[clamp(0.95rem,0.8vw+0.7rem,1.1rem)]
    px-6 py-6
  "
          >
            Explore Products
          </Button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 z-10 flex flex-col items-center gap-2">
        <svg
          className="w-[clamp(20px,2vw,28px)] h-[clamp(20px,2vw,28px)] text-green-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span className="text-green-300 text-sm">Step Into Tomorrow</span>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInSlow {
          0% {
            opacity: 0;
            transform: translateY(26px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1.1s ease-out forwards;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 5s ease-in-out infinite;
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.3),
            0 0 40px rgba(34, 197, 94, 0.15);
        }
      `}</style>
    </section>
  );
}
