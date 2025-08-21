"use client";
import React from "react";
import { HeroSection } from "./HeroSection";
import { ReferralProgram } from "./ReferralProgram";

function App() {
  return (
    <div
      className=" bg-black py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url(/images/bg_green.png)", // Replace with your image path
        backgroundSize: "cover", // Ensure the image covers the entire container
        backgroundPosition: "center", // Center the image within the container
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <div className="text-center mb-18">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Become a Part of the </span>
            <span className="text-[#3ef838]">SKYGREEN </span>
            <span className="text-white">Family</span>
          </h1>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column - Hero image */}
          <div className="order-2 lg:order-1">
            <HeroSection />
          </div>

          {/* Right column - Referral program info */}
          <div
            className="order-1 lg:order-2 bg-gray-900 rounded-2xl shadow-lg border border-gray-800 sm:px-8 lg:px-8 lg:py-4" style={{
              backgroundImage:
                "url(/images/testimonials/download_converted.png)", // Replace with your image path
              backgroundSize: "cover", // Ensure the image covers the entire container
              backgroundPosition: "center", // Center the image within the container
            }}>
            <ReferralProgram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
