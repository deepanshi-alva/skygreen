"use client";
import { useState } from "react";
import LeftInputPanel from "@/components/calculator/leftInputPanel";
import CenterOutput from "@/components/calculator/CenterOutput";
import RightAds from "@/components/calculator/RightAds";

export default function SolarDashboardPage() {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(null);

  return (
    <div className="w-full bg-black text-green-400">
      {!started ? (
        // --- Fullscreen Welcome Screen ---
        <div
          className="flex flex-col justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8 
                        pt-24 sm:pt-28 lg:pt-32"
        >
          {" "}
          {/* ✅ Added padding-top to clear navbar */}
          <div
            className="w-full max-w-5xl rounded-2xl p-6 sm:p-10 lg:p-12 bg-black/70 
              border border-green-500/40 shadow-[0_0_25px_rgba(34,197,94,0.4)] 
              flex flex-col justify-center items-center text-center"
          >
            {/* Icon Row */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl">☀️</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl mt-4">₹</div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-400 mb-4">
              India&apos;s Smartest Solar Savings Calculator
            </h2>

            {/* Subtext */}
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-3xl">
              In less than 1 second, get your personalized solar report.
            </p>

            {/* Key Features */}
            <p className="text-green-400 text-xs sm:text-sm md:text-base font-semibold mb-6">
              System size • Subsidy • Payback • Lifetime Savings
            </p>

            {/* Feature List */}
            <ul className="space-y-2 text-xs sm:text-sm md:text-base text-gray-200 mb-8">
              <li>✔ Free ✔ Accurate ✔ State-wise Rules Applied</li>
            </ul>

            {/* CTA Button */}
            <div className="flex justify-center mb-6 w-full">
              <button
                onClick={() => setStarted(true)}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black 
                  font-bold py-3 px-6 sm:px-8 md:px-10 rounded-lg 
                  text-base sm:text-lg md:text-xl transition transform hover:scale-105"
              >
                Calculate My Savings
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-4 leading-snug max-w-2xl">
              Disclaimer: Results are indicative. Actual savings may vary by
              site & DISCOM rules.
            </p>

            {/* Powered by */}
            <button className="text-sm sm:text-base md:text-lg lg:text-xl text-green-400 font-semibold border border-green-500/40 px-4 py-2 rounded-lg">
              Powered by SKYGREEN
            </button>
          </div>
        </div>
      ) : (
        // --- Actual Calculator (Step 2) ---
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-20 sm:mt-28 lg:mt-32 px-4 sm:px-6 lg:px-10">
          <div className="lg:col-span-3 order-1 w-full mt-[11.5rem]">
            <LeftInputPanel onResults={setResults} />
          </div>
          <div className="lg:col-span-7 order-2 w-full">
            <CenterOutput results={results} />
          </div>
          <div className="lg:col-span-2 order-3 w-full mt-[10rem]">
            <RightAds results={results} />
          </div>
        </div>
      )}
    </div>
  );
}
