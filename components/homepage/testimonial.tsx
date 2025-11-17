"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  attributes: {
    company_name: string;
    quote: string;
    author: string;
    position: string;
    case_study_link: string;
    rating: number;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
};

const FilledStar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.182a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.562 2.586a1 1 0 00-.364 1.118l1.357 4.182c.3.921-.755 1.688-1.54 1.118l-3.562-2.586a1 1 0 00-1.176 0l-3.562 2.586c-.785.57-1.84-.197-1.54-1.118l1.357-4.182a1 1 0 00-.364-1.118L2.11 9.61c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.182z" />
  </svg>
);

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1 ml-2 sm:ml-3">
      {Array.from({ length: 5 }).map((_, i) => {
        const starNumber = i + 1;
        const fillPercentage = Math.min(
          Math.max(rating - (starNumber - 1), 0),
          1
        ) * 100;

        return (
          <div key={i} className="relative w-4 h-4 sm:w-5 sm:h-5">
            <FilledStar className="w-full h-full text-gray-500" />
            <FilledStar
              className="w-full h-full text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/testimonials?populate=image`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setTestimonials(data.data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;
  const t = testimonials[index].attributes;
  const rawUrl = t.image?.data?.attributes?.url || "";
  const imageUrl = rawUrl.startsWith("http")
    ? rawUrl
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;

  return (
    <section className="flex flex-col items-center bg-black w-full py-12 sm:py-16 lg:py-20">
      {/* Heading */}
      <div className="mb-8 sm:mb-12 text-center px-4">
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg border-b-2 pb-3 sm:pb-5 md:pb-7"
          style={{
            borderBottom: "2px solid",
            borderImage:
              "linear-gradient(to right, #000000ff, #3ef838, #000000ff) 1",
          }}
        >
          Hear From Our{" "}
          <span className="text-[#acfe53]">Happy Solar Clients</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl mx-auto font-light">
          Discover how GreenSpark has transformed lives and businesses with
          clean, reliable solar energy solutions.
        </p>
      </div>

      {/* Slider Band */}
      <div className="w-full flex items-center justify-center px-3 sm:px-6 mt-6 sm:mt-10">
        <div
          className="relative w-full max-w-[78rem] rounded-2xl overflow-hidden px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20"
          style={{
            backgroundImage:
              "url('/images/testimonials/download_converted.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundColor: "#0b0b0b",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-green-600/20 via-green-500/8 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Left: Image stack */}
            <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 flex-shrink-0 flex items-end mb-10">
              {testimonials.map((t, i) => {
                if (i === index) {
                  return (
                    <AnimatePresence key={i} mode="wait">
                      <motion.img
                        key={i}
                        src={imageUrl}
                        alt="user image"
                        initial={{ opacity: 0, scale: 0.98, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98, x: -40 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#222] z-20 relative"
                      />
                    </AnimatePresence>
                  );
                }
                return null;
              })}

              {/* Arrows */}
              <div className="absolute left-1/2 -bottom-12 sm:-bottom-16 flex gap-3 sm:gap-4 -translate-x-1/2">
                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-transparent border border-[#ccc] rounded-lg flex items-center justify-center hover:bg-[#222] transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </button>
                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-transparent border border-[#ccc] rounded-lg flex items-center justify-center hover:bg-[#222] transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </button>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex-1 text-center md:text-left max-w-lg sm:max-w-xl px-2 sm:px-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white tracking-wide">
                    {t.company_name}
                  </div>
                  <blockquote className="text-base sm:text-lg md:text-xl text-white mb-6 font-normal leading-relaxed text-justify">
                    “{t.quote}”
                  </blockquote>
                  <div className="mb-3">
                    <div className="mb-3 flex flex-col sm:flex-row items-center justify-center md:justify-start">
                      <div className="font-bold text-white">{t.author}</div>
                      {renderStars(t.rating)}
                      <span className="text-white ml-1 text-sm sm:text-base">
                        ({t.rating})
                      </span>
                    </div>
                    <div className="text-[#b7b7b7] text-sm sm:text-base">
                      {t.position}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
