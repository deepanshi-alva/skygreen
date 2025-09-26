import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";
import ProductSpecCards from "@/components/product/productSpec";
import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <ProductSpecCards />
      <PerformanceAndBifacial />
      <DosDonts />
    </>
  );
}
