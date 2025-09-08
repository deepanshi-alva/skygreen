"use client";
import { useState } from "react";
import LeftInputPanel from "@/components/calculator/leftInputPanel";
import CenterOutput from "@/components/calculator/CenterOutput";
import RightAds from "@/components/calculator/RightAds";

export default function LeftRightWrapper() {
  const [results, setResults] = useState(null);

  return (
    <>
      {/* LEFT GRID */}
      <LeftInputPanel onResults={setResults} />

      {/* CENTER GRID */}
      <CenterOutput results={results} />

      {/* RIGHT GRID */}
      <RightAds results={results}/>
    </>
  );
}
