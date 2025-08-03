import dynamic from "next/dynamic";
import HeroSection from "@/components/product/heroSection";

const ParticlesBackground = dynamic(
  () => import("@/components/product/particlesSection")
);

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <ParticlesBackground />
    </>
  );
}
