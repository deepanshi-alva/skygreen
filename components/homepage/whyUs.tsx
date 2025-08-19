"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Bolt, CheckCircle, Leaf } from "lucide-react";

const paragraphArray = [
  "Empowering", "a", "brighter", "tomorrow,",
  "we", "deliver", "smart", "and", "affordable", "solar", "solutions", "tailored", "to", "your", "needs.",
  "Our", "cutting-edge", "technology", "ensures", "lasting", "performance", "and", "maximizes", "your", "energy", "savings.",
  "Experience", "hassle-free", "installation,", "reliable", "service,", "and", "join", "us", "in", "creating", "a", "cleaner,", "more", "sustainable", "planet.",
  "Reduce", "your", "carbon", "footprint", "and", "unlock", "the", "power", "of", "the", "sun.",
  "Trusted", "across", "India,", "SKYGREEN", "panels", "are", "built", "for", "all", "terrains", "and", "weather.",
  "Make", "the", "smart", "choice", "for", "a", "greener", "future.",
];


const features = [
  {
    icon: <Bolt className="h-10 w-10 text-green-400 mb-3" />,
    title: "Efficiency",
    description: "Our solar panels offer high efficiency and performance",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-green-400 mb-3" />,
    title: "Reliability",
    description: "We provide durable and dependable solar energy solutions",
  },
  {
    icon: <Leaf className="h-10 w-10 text-green-400 mb-3" />,
    title: "Sustainability",
    description: "Power your home with clean, renewable energy",
  },
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });

  const revealPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [reveal, setReveal] = useState(0);
  useMotionValueEvent(revealPercentage, "change", (v) => setReveal(v));
  const words = paragraphArray;

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-6 md:p-12 bg-[black] text-white"
      style={{
        boxSizing: "border-box",
        backgroundImage: "url('/images/whyUs/solarSystem.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="w-full max-w-7xl px-2 sm:px-6 md:px-12 pb-8 items-center"
        style={{
          borderImage:
            "linear-gradient(140deg, #3ef838ff, #202020ff, #202020ff, #202020ff, #202020ff, #3ef838ff) 1",
          borderStyle: "solid",
          borderWidth: "2px",
          background: "rgba(0, 0, 0, 0.42)",
        }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center pb-5 my-8 text-green-400">
          Why Choose Us?
        </h2>

        {/* Text reveal */}
        <div
          ref={containerRef}
          className="
    max-w-6xl mx-auto
    leading-snug sm:leading-relaxed
    text-base sm:text-xl md:text-2xl
    text-center flex flex-wrap justify-center break-words
  "
        >
          {words.map((word, index) => {
            const wordStart = (index / words.length) * 100;
            const color = reveal > wordStart ? "#ffffffff" : "#646464ff";
            return (
              <span
                key={index}
                style={{ color }}
                className="inline-block mr-1 sm:mr-2 mb-1 sm:mb-2 max-w-full"
              >
                {word}
              </span>
            );
          })}
        </div>


        {/* Feature cards */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 py-8 max-w-6xl w-full">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#111] rounded-2xl flex flex-col items-center text-center p-4 sm:p-6 md:p-8 border border-green-800 hover:border-green-400 transition-all duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md min-w-[220px] mx-auto hover:shadow-[0_0_20px_3px_rgba(34,197,94,0.4)]"
              >
                <div className="flex flex-row items-center gap-3 mb-2 justify-center">
                  {feature.icon}
                  <h3 className="text-white text-xl sm:text-2xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
