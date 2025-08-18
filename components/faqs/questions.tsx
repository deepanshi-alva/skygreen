"use client";

import React, { useState } from "react";
import { Download, ChevronRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { faqData } from "@/lib/faqData";

/* -------------------------------- Types --------------------------------- */
type FormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  capacity: string;
  message: string;
  agreeToProcessing: boolean;
};
type Interest = "installing" | "partnership" | "investing";

/* ----------------------------- Left Components ---------------------------- */

function DownloadCard() {
  return (
    <div className="space-y-8">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Download className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold">Download Presentation</h2>
        </div>

        {/* Company Profile Card */}
        <div className="relative bg-gray-900 rounded-lg p-1 overflow-hidden">
          <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg">
            {/* Green accent triangle */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-green-500" />

            {/* SKYGREEN Badge */}
            <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
              SKYGREEN
            </div>

            {/* Content */}
            <div className="relative z-10 mt-16">
              <h3 className="text-2xl font-bold text-white mb-2">
                COMPANY
                <br />
                PROFILE
              </h3>
              <p className="text-sm text-gray-300">
                It&apos;s time to save the world.
              </p>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-transparent to-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <p className="text-gray-300">
          <span className="text-white font-semibold">Indian brand</span> in the
          renewable energy industry, providing high-quality products and
          services to{" "}
          <span className="text-white font-semibold">your doorstep.</span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Right: FAQs Block --------------------------- */

function RightFaqs() {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqData.map((_, i) => i) // all open by default
  );
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const visibleFAQs = faqData;

  return (
    <div className="px-6 md:px-12 lg:px-16 bg-[url('/images/testimonials/download_converted.png')] bg-no-repeat bg-cover bg-center rounded-4xl">
      {/* Title */}
      <div className="flex flex-col mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Got a Question?
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold text-green-500">
          We have solutions
        </h3>
      </div>

      {/* FAQs */}
      <div className="space-y-6 w-full">
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
                <h4 className="text-lg md:text-2xl lg:text-3xl font-medium text-white">
                  {faq.question}
                </h4>
                <motion.span
                  className="text-green-500"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} />
                </motion.span>
              </div>

              {isOpen && (
                <motion.p
                  className="mt-2 text-base md:text-lg lg:text-xl text-zinc-300"
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
        {/* {faqData.length > 5 && (
          <div className="pt-4">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition duration-300"
            >
              {showAll ? "Show less" : "More solutions"}
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

/* ------------------------------- Main Shell ------------------------------- */

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 lg:pr-15 py-16 pb-28">
        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-[22%_75%] 
            gap-19 
            max-w-7xl 
            ml-28
          "
        >
          {/* Left: stick with your Download card */}
          <aside className="lg:sticky lg:top-8 self-start">
            <DownloadCard />
          </aside>

          {/* Right: FAQs (replacing the form) */}
          <main>
            <RightFaqs />
          </main>
        </div>
      </div>
    </div>
  );
}
