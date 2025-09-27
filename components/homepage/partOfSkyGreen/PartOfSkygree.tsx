"use client";
import React from "react";
import { HeroSection } from "./HeroSection";
import { ReferralProgram } from "./ReferralProgram";

function App() {
  return (
    <div
      className="bg-black py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url(/images/bg_green.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Become a Part of the </span>
            <span className="text-[#acfe53]">SKYGREEN </span>
            <span className="text-white">Family</span>
          </h1>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column - Hero image (appears first on mobile and left on desktop) */}
          <div>
            <HeroSection />
          </div>

          {/* Right column - Referral program info (appears second on mobile and right on desktop) */}
          <div className="rounded-2xl shadow-lg">
            <ReferralProgram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
