import dynamic from "next/dynamic";
import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <DosDonts/>
    </>
  );
}
