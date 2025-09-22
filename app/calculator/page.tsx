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
        <div className="flex flex-col justify-center items-center min-h-screen w-full text-center px-6">
          {/* Icon */}
          <div className="flex flex-row items-center justify-center gap-2 mb-6">
            <div className="text-6xl">☀️</div>
            <div className="text-6xl mt-12 -ml-4">₹</div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4 text-green-400">
            Welcome to India’s Smartest Solar Savings Calculator
          </h2>

          {/* Subtext */}
          <p className="text-base text-gray-300 mb-6 max-w-2xl">
            In just 2 minutes, see how much you can save with solar.
            <br />
            Get instant results: system size, savings, payback and lifetime benefits.
          </p>

          {/* Disclaimer */}
          <p className="text-sm text-gray-400 mb-8">
            Disclaimer: Results are indicative. Actual savings may vary by site & DISCOM rules.
          </p>

          {/* Start Button */}
          <button
            onClick={() => setStarted(true)}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-10 rounded-lg text-lg transition"
          >
            Start My Calculation
          </button>
        </div>
      ) : (
        // --- Actual Calculator (Step 2) ---
        <div className="grid grid-cols-12 gap-4 mt-24 p-4 text-green-400">
          <LeftInputPanel onResults={setResults} />
          
                {/* CENTER GRID */}
                <CenterOutput results={results} />
          
                {/* RIGHT GRID */}
                <RightAds results={results}/>
        </div>
      )}
    </div>
  );
}
