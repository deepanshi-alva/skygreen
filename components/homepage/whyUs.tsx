"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const paragraph = `
  We are a trusted partner in the renewable energy industry, committed to delivering innovative and efficient solar solutions. 
  Our products are designed to meet the highest standards of quality and performance. 
  Join the green revolution with us and power your future sustainably.
`;

export default function WhyUs() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reveal percentage from 0 to 100
  const revealPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const words = paragraph.trim().split(" ");

  return (
    <section className="py-20 px-6 md:px-16 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-400">Why Choose Us</h2>

      <div ref={containerRef} className="max-w-4xl mx-auto leading-relaxed text-lg">
        {words.map((word, index) => {
          const wordStart = (index / words.length) * 100;
          return (
            <motion.span
              key={index}
              style={{
                color: useTransform(revealPercentage, (p) => (p > wordStart ? "#22c55e" : "#ffffff")),
              }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
}
