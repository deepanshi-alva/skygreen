"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
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
        } catch { }
        setReveal(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [reveal]);

  // Scroll to the next element after this hero section (accounts for fixed nav)
  const scrollToNext = () => {
    const sec = sectionRef.current;
    if (!sec) {
      // fallback: simple page-down
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      return;
    }

    const next = sec.nextElementSibling as HTMLElement | null;
    if (!next) {
      // no next element — fallback to scrolling down one viewport
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      return;
    }

    // account for fixed header/nav if present
    const nav = document.querySelector("nav");
    const navHeight =
      nav instanceof HTMLElement ? nav.getBoundingClientRect().height : 0;

    const nextTop = next.getBoundingClientRect().top + window.scrollY;
    const targetScroll = Math.max(0, nextTop - navHeight - 8); // -8px small gap

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleIndicatorKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToNext();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white"
    >
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
      {/* Main Content */}
      <div
        className={`relative z-10 text-center px-4 flex-1 flex flex-col items-center justify-center ${reveal ? "animate-fadeInSlow" : "opacity-0"
          }`}
      >
        {/* ✅ Logo above the title */}
        <div className="mb-12 flex flex-col items-center">
          <img
            src="/images/logo/logo-bg-remove.png"
            alt="Skygreen Logo"
            className="mx-auto w-[clamp(260px,45vw,560px)] h-auto"
          />
          {/* ✅ Tagline below logo */}
          <p className="mt-3 text-white text-[clamp(0.9rem,1.8vw,2.3rem)] font-medium tracking-wide">
            हमारा सूरज, हमारी बिजली !!
          </p>
        </div>


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
          <Link href="/calculator">
            <Button className="glowButton" style={{ padding: "25px 20px", background: "black" }}>
              <span className="z-3">GET A QUOTE</span>
              <span className="glowEffect" style={{ opacity: "0.8", filter: "blur(35px)" }}></span>
            </Button>
          </Link>

          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full border border-green-400/30 bg-black/50 backdrop-blur-5xl
        text-green-100 font-semibold hover:bg-black/52 hover:text-white
        transform transition-all duration-300 hover:-translate-y-0.5
        hover:shadow-[0_22px_60px_rgba(34,197,94,0.38),0_8px_30px_rgba(34,197,94,0.18)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60
        text-[clamp(0.95rem,0.8vw+0.7rem,1.1rem)] px-6 py-6"
            >
              Explore Products
            </Button>
          </Link>
        </div>
      </div>


      {/* Scroll Down Indicator (clickable & keyboard accessible) */}
      <div className="absolute bottom-6 z-10 flex flex-col items-center gap-2">
        <div
          role="button"
          tabIndex={0}
          aria-label="Scroll to next section"
          onClick={scrollToNext}
          onKeyDown={handleIndicatorKey}
          className="flex flex-col items-center gap-2 cursor-pointer select-none"
        >
          <svg
            className="w-[clamp(20px,2vw,28px)] h-[clamp(20px,2vw,28px)] text-green-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="text-green-300 text-sm">Step Into Tomorrow</span>
        </div>
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
