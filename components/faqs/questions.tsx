"use client";

import React, { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { faqData } from "@/lib/faqData";

/* ----------------------------- Left Components ---------------------------- */

function DownloadCard() {
  return (
    <div className="space-y-8">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Download className="w-5 h-5 text-green-500" />
          <h2 className="text-xl sm:text-2xl font-semibold">Download Presentation</h2>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                COMPANY
                <br />
                PROFILE
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
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
        <p className="text-gray-300 text-sm sm:text-base">
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
  const [query, setQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(15);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? faqData.filter((f) => f.question.toLowerCase().includes(normalizedQuery))
    : faqData;

  const visibleFAQs =
    normalizedQuery.length === 0 ? filtered.slice(0, itemsToShow) : filtered;

  const canShowMore =
    normalizedQuery.length === 0 && itemsToShow < filtered.length;

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  React.useEffect(() => {
    setOpenIndexes([]);
  }, [normalizedQuery, itemsToShow]);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10 lg:py-12 bg-[url('/images/testimonials/download_converted.png')] bg-no-repeat bg-cover bg-center rounded-2xl sm:rounded-3xl">
      {/* Title */}
      <div className="flex flex-col mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Got a Question?
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl mt-2 font-semibold text-green-500">
          We have solutions
        </h3>
      </div>

      {/* Search */}
      <div className="mb-6 md:mb-10">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length > 0) setItemsToShow(15);
            }}
            placeholder="Search questions (e.g., warranty, installation, subsidy)"
            className="w-full rounded-xl bg-black/40 border border-zinc-700 px-3 py-2 sm:px-4 sm:py-3 outline-none focus:border-green-500 transition text-sm sm:text-base"
            aria-label="Search FAQs"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setItemsToShow(15);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-zinc-300 hover:text-white"
              aria-label="Clear search"
              type="button"
            >
              Clear
            </button>
          )}
        </div>

        <p className="mt-3 text-xs sm:text-sm text-zinc-400">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
          {normalizedQuery ? ` for “${query}”` : ""}
        </p>
      </div>

      {/* FAQs */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {visibleFAQs.map((faq, i) => {
          const isOpen = openIndexes.includes(i);
          return (
            <div
              key={i}
              className="border-b border-zinc-700 pb-3 sm:pb-4 cursor-pointer"
            >
              <div
                className="flex justify-between items-center"
                onClick={() => toggleFAQ(i)}
              >
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white pr-4">
                  {faq.question}
                </h4>
                <motion.span
                  className="text-green-500 flex-shrink-0"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.span>
              </div>

              {isOpen && (
                <motion.p
                  className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300"
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

        {/* Show More */}
        {canShowMore && (
          <div className="pt-2">
            <button
              onClick={() => setItemsToShow((n) => n + 15)}
              className="px-4 sm:px-6 py-2 border border-white rounded-full text-xs sm:text-sm md:text-base text-white hover:bg-white hover:text-black transition duration-300"
              type="button"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Main Shell ------------------------------- */

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[20%_1fr]
            gap-10
            max-w-7xl
            mx-auto
          "
        >
          {/* Left */}
          <aside className="lg:sticky lg:top-8 self-start mb-10 lg:mb-0">
            <DownloadCard />
          </aside>

          {/* Right */}
          <main>
            <RightFaqs />
          </main>
        </div>
      </div>
    </div>
  );
}
