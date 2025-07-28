"use client"
import { useState } from "react";
import { faqData } from "@/lib/faqData";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Faqs() {
  const [openIndexes, setOpenIndexes] = useState(
    faqData.map((_, index) => index) // all open by default
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // close
        : [...prev, index] // open
    );
  };

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

        {/* Right Column - Expandable FAQs */}
        <div className="space-y-6 mt-4 w-full">
          {faqData.map((faq, index) => {
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
                  <span className="text-green-500 text-xl md:text-3xl">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>

                {isOpen && (
                  <p className="mt-2 text-xl text-zinc-300">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
