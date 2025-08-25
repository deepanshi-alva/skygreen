import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";
import Performance from "@/components/product/performance";
import ProductSpecCards from "@/components/product/productSpec";
import BifacialPower from "@/components/product/powerBifacialGain"

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <ProductSpecCards/>
      <Performance/>
      <BifacialPower/>
      <DosDonts/>
    </>
  );
}