"use client";

import React, { useState } from "react";
import { Download, ChevronRight } from "lucide-react";
import HeadOfficeInfo from "./headOffice";

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

            {/* AEROSOLAR Badge */}
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
          services to <span className="text-white font-semibold">your doorstep.</span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Right Components ---------------------------- */

function InterestChips({
  value,
  onChange,
}: {
  value: Interest;
  onChange: (v: Interest) => void;
}) {
  const options: Interest[] = ["installing", "partnership", "investing"];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg">
        <span>I&apos;m interested in</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-6 py-2 rounded-full border-2 transition-all duration-200 ${
              value === opt
                ? "border-green-500 bg-green-500/10 text-green-400"
                : "border-gray-600 text-gray-300 hover:border-gray-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [selectedInterest, setSelectedInterest] =
    useState<Interest>("installing");
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    capacity: "",
    message: "",
    agreeToProcessing: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, interest: selectedInterest });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl lg:text-5xl font-bold mb-2">
        We&apos;re Ready to <span className="text-green-500">Consult You</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InterestChips
          value={selectedInterest}
          onChange={setSelectedInterest}
        />

        {/* Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="I work for"
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">My name is</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="first and last"
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Contact me at
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your e-mail"
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              My phone number
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">+91</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="phone number"
                className="flex-1 bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="I'm from"
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Capacity</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder=""
                className="flex-1 bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
              />
              <span className="text-gray-300">kW</span>
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">I have a</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="comment or question, etc."
              rows={4}
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeToProcessing"
            checked={formData.agreeToProcessing}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 bg-transparent border-2 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
          />
          <label className="text-sm text-gray-400 leading-relaxed">
            I agree to the processing of personal data
          </label>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="group flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full transition-all duration-200 hover:scale-105"
          >
            Send Request
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </form>
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
            mx-auto
          "
        >
          {/* Left: 20% width */}
          <aside className="lg:sticky lg:top-8 self-start">
            <DownloadCard />
          </aside>

          {/* Right: 75% width */}
          <main
            
          >
            <div className="p-16 bg-[url('/images/testimonials/download_converted.png')] bg-no-repeat bg-cover bg-center rounded-4xl">
            <ContactForm />
            </div>
            <HeadOfficeInfo />
          </main>
          
        </div>
      </div>
    </div>
  );
}
