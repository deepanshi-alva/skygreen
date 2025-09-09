"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

// const testimonials = [
//   {
//     image: "/images/testimonials/testimonial1.png",
//     company: "The Patel Family",
//     quote:
//       "Switching to solar with GreenSpark was the best decision we’ve made for our home. Our electricity bills have dropped by over 70%, and the installation process was smooth and hassle-free. The team answered all our questions and handled everything from start to finish.",
//     author: "Anjali Patel",
//     position: "Homeowner",
//     caseStudyLink: "#",
//   },
//   // Add more testimonials as needed
//   {
//     image: "/images/testimonials/testimonial2.jpg",
//     company: "Lotus Organic Farms",
//     quote:
//       "GreenSpark’s solar solutions have helped our business cut energy costs and align with our sustainability goals. We were impressed with their professionalism and how quickly the system was up and running. Highly recommend for any business looking to go green!",
//     author: "Rajesh Mehra",
//     position: "Managing Director",
//     caseStudyLink: "#",
//   },
//   {
//     image: "/images/testimonials/testimonial3.png",
//     company: "Orbit Tech Industries",
//     quote:
//       "Our factory’s power needs are substantial, but GreenSpark’s custom solar setup delivers consistent performance, even on high-demand days. Their ongoing support and monitoring tools give us complete peace of mind. It’s a smart investment that’s paying off every month.",
//     author: "Meera Narayanan",
//     position: "Operations Manager",
//     caseStudyLink: "#",
//   },
// ];

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
    {...props}   // spread all props (className, style, etc.)
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.182a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.562 2.586a1 1 0 00-.364 1.118l1.357 4.182c.3.921-.755 1.688-1.54 1.118l-3.562-2.586a1 1 0 00-1.176 0l-3.562 2.586c-.785.57-1.84-.197-1.54-1.118l1.357-4.182a1 1 0 00-.364-1.118L2.11 9.61c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.182z" />
  </svg>
);

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1 ml-3">
      {Array.from({ length: 5 }).map((_, i) => {
        const starNumber = i + 1;
        const fillPercentage = Math.min(
          Math.max(rating - (starNumber - 1), 0),
          1
        ) * 100;

        return (
          <div key={i} className="relative w-5 h-5">
            {/* Empty gray star */}
            <FilledStar className="w-5 h-5 text-gray-500" />

            {/* Filled yellow star with clip */}
            <FilledStar
              className="w-5 h-5 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default function TestimonialSlider() {
  // const [index, setIndex] = useState(0);

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
        console.log("this is the testimonials data", data);
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
    
  // const prev = () =>
  //   setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  // const next = () =>
  //   setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="flex flex-col items-center min-h-screen bg-black w-full pt-30">
      <div className="mb-15 text-center">
        <h2
          className="shadow-xl/40 px-10 shadow-green-500/30 shadow-custom-inner text-5xl mb-8 md:text-6xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg border-b-2 border-red-500 pb-7"
          style={{
            borderBottom: "2px solid",
            borderImage:
              "linear-gradient(to right, #000000ff, #3ef838, #000000ff) 1",
          }}
        >
          Hear From Our <span className="text-[#acfe53]">Happy Solar Clients</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light">
          Discover how GreenSpark has transformed lives and businesses with
          clean, reliable solar energy solutions.
        </p>
      </div>
      {/* BG band with image + gradient (not full section) */}
      <div className="w-full flex items-center justify-center px-6 md:px-6 mt-10">
        <div
          className="relative w-full max-w-[78rem] rounded-2xl overflow-hidden px-10 pt-16 pb-20"
          style={{
            backgroundImage:
              "url('/images/testimonials/download_converted.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            // Use 'contain' so the image does NOT fill the entire band
            backgroundSize: "cover",
            // Dark base behind the image for contrast
            backgroundColor: "#0b0b0b",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          {/* Green gradient overlay limited to this band */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-green-600/20 via-green-500/8 to-transparent" />

          {/* Content above overlay */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Left: Stacked Images */}
            <div className="relative w-80 h-80 flex-shrink-0 flex items-end">
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
                        className="w-72 h-72 object-cover rounded-3xl shadow-2xl border-2 border-[#222] z-20 relative"
                        style={{
                          boxShadow: "0 12px 36px #0009, 0 0 0 4px #222 inset",
                        }}
                      />
                    </AnimatePresence>
                  );
                }
                if (i === (index + 1) % testimonials.length) {
                  return (
                    <Image
                      width={64}
                      height={64}
                      key={i}
                      src={imageUrl}
                      alt=""
                      className="w-64 h-64 object-cover rounded-3xl absolute left-6 top-8 opacity-50 -rotate-3 z-10 border-2 border-[#222] scale-95"
                      style={{ filter: "blur(1px)" }}
                    />
                  );
                }
                if (
                  i ===
                  (index - 1 + testimonials.length) % testimonials.length
                ) {
                  return (
                    <Image
                      width={64}
                      height={64}
                      key={i}
                      src={imageUrl}
                      alt=""
                      className="w-64 h-64 object-cover rounded-3xl absolute -left-6 top-8 opacity-50 rotate-3 z-10 border-2 border-[#222] scale-95"
                      style={{ filter: "blur(1px)" }}
                    />
                  );
                }
                return null;
              })}

              {/* Arrow controls */}
              <div className="absolute left-1/2 -bottom-16 flex gap-4 -translate-x-1/2">
                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-12 h-12 bg-transparent border border-[#ccc] rounded-lg flex items-center justify-center hover:bg-[#222] transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-7 h-7 text-white" />
                </button>
                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-12 h-12 bg-transparent border border-[#ccc] rounded-lg flex items-center justify-center hover:bg-[#222] transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-7 h-7 text-white" />
                </button>
              </div>
            </div>

            {/* Right: Testimonial Details */}
            <div className="flex-1 text-left max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-3xl font-bold mb-4 text-white tracking-wider">
                    {t.company_name}
                  </div>
                  <blockquote className="text-xl text-white mb-6 font-normal leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <div className="mb-3">
                    <div className="mb-3 flex items-center">
                      <div className="font-bold text-white">{t.author}</div>
                      {renderStars(t.rating)}<span className="text-white ml-1">({t.rating})</span>
                    </div>
                    <div className="text-[#b7b7b7] text-base">
                      {t.position}
                    </div>
                  </div>
                  <a
                    href={t.case_study_link}
                    className="text-lime-300 font-semibold hover:underline text-base inline-flex items-center gap-2 mt-3"
                  >
                    Read Case Study <span className="ml-1">→</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
