"use client";
import { useState } from "react";
import LeftInputPanel from "@/components/calculator/leftInputPanel";
import CenterOutput from "@/components/calculator/CenterOutput";

export default function LeftRightWrapper() {
  const [results, setResults] = useState(null);

  return (
    <>
      {/* LEFT GRID */}
      <LeftInputPanel onResults={setResults} />

      {/* CENTER GRID */}
      <CenterOutput results={results} />
    </>
  );
}
