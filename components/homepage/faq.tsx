"use client";

import { useState } from "react";
import { faqData } from "@/lib/faqData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Faqs() {
  const [openIndexes, setOpenIndexes] = useState(faqData.map((_, i) => i)); // all open by default
  const [showAll, setShowAll] = useState(false); // toggle for full FAQ visibility

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const visibleFAQs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <section className="w-full bg-black text-white px-28 py-12">
      <div className="flex flex-col mb-8 mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          Got a Question?
        </h2>
        <h3 className="text-4xl ml-2 mt-2 font-semibold text-green-500">
          We have solutions
        </h3>
      </div>

      <div className="mx-auto flex gap-20">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-5 rounded-xl shadow-md max-w-sm space-y-4">
            <div className="text-lg font-semibold flex items-center gap-2 text-green-500">
              📄 Download Presentation
            </div>
            <img
              src="/images/logo/logo-bg-remove.png"
              alt="Company Profile"
              className="rounded"
            />
            <p className="text-sm text-zinc-400">
              <strong>German brand</strong> in the renewable energy industry,
              providing high-quality products and services{" "}
              <strong>since 2003</strong>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 mt-4 w-full">
          {visibleFAQs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="border-b border-zinc-700 pb-4 cursor-pointer"
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="text-xl md:text-4xl font-medium text-white">
                    {faq.question}
                  </h4>
                  <motion.span
                    className="text-green-500"
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={28} />
                  </motion.span>
                </div>

                {isOpen && (
                  <motion.p
                    className="mt-2 text-xl text-zinc-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            );
          })}

          {/* Show More / Less Button */}
          {faqData.length > 5 && (
            <div className="pt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition duration-300"
              >
                {showAll ? "Show less" : "More solutions"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
