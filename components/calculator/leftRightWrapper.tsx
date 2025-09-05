"use client";
import { useState } from "react";
import LeftInputPanel, {CalculatorResult} from "@/components/calculator/leftInputPanel";
import CenterOutput from "@/components/calculator/CenterOutput";

export default function LeftRightWrapper() {
    const [results, setResults] = useState<CalculatorResult | null>(null);
  return (
    <>
      {/* LEFT GRID */}
      <LeftInputPanel onResults={setResults}/>

      {/* CENTER GRID */}
      <CenterOutput results={results}/>
    </>
  );
}
