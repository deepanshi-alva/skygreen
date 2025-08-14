"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Bolt, CheckCircle, Leaf } from "lucide-react";

const paragraphArray = [
  "Empowering",
  "a",
  "brighter",
  "tomorrow,",
  //   <Sun key="sun" className="inline mx-4 text-yellow-400 w-8 h-8" />,
  "we",
  "deliver",
  "smart",
  "and",
  "affordable",
  "solar",
  "solutions",
  "tailored",
  "to",
  "your",
  "needs.",
  //   <DollarSign key="dollar" className="inline mx-4 text-green-400 w-8 h-8" />,
  "Our",
  "cutting-edge",
  "technology",
  "ensures",
  "lasting",
  "performance",
  "and",
  "maximizes",
  "your",
  "energy",
  "savings.",
  //   <Hammer key="hammer" className="inline mx-4 text-blue-400 w-8 h-8" />,
  "Experience",
  "hassle-free",
  "installation,",
  "reliable",
  "service,",
  "and",
  "join",
  "us",
  "in",
  "creating",
  "a",
  "cleaner,",
  "more",
  "sustainable",
  "planet.",
  //   <Leaf key="leaf" className="inline mx-4 text-green-500 w-8 h-8" />,
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

  // Reveal percentage from 0 to 100
  const revealPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const words = paragraphArray;

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center p-2 md:p-12 bg-[black] text-white"
      style={{
        boxSizing: "border-box",
        backgroundImage: "url('/images/whyUs/solarSystem.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="px-12 pb-8 items-center"
        style={{
          borderImage:
            "linear-gradient(140deg, #3ef838ff, #202020ff, #202020ff, #202020ff, #202020ff, #3ef838ff) 1",
          borderStyle: "solid",
          borderWidth: "2px",
          background: "rgba(0, 0, 0, 0.42)",
        }}
      >
        <h2 className="text-6xl font-bold text-center pb-5 my-8 text-green-400">
          Why Choose Us ?
        </h2>
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto leading-relaxed text-3xl text-center flex flex-wrap justify-center"
        >
          {words.map((word, index) => {
            const wordStart = (index / words.length) * 100;
            return (
              <motion.span
                key={index}
                style={{
                  color: useTransform(revealPercentage, (p) =>
                    p > wordStart ? "#ffffffff" : "#646464ff"
                  ),
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 max-w-6xl">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`bg-[#111] rounded-2xl flex flex-col items-center justify-top text-center p-8 border border-green-800 hover:border-green-400 transition-all duration-300 w-full hover:shadow-[0_0_20px_3px_rgba(34,197,94,0.4)]`}
              >
                <div className="flex flex-row items-center gap-3 mb-2 flex justify-center">
                  {feature.icon}
                  <h3 className="text-white text-2xl font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
