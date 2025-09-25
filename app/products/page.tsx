import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";
import Performance from "@/components/product/performance";
import ProductSpecCards from "@/components/product/productSpec";
import BifacialPower from "@/components/product/powerBifacialGain";
import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <ProductSpecCards />
      {/* <div className="flex flex-row px-78 bg-black">
        <Performance />
        <BifacialPower />
      </div> */}
      <PerformanceAndBifacial />
      <DosDonts />
    </>
  );
}
