import Image from 'next/image';
import { Button } from "@/components/ui/button";
import GlowingBackground from "./GlowingBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black  overflow-hidden px-4 md:px-20 text-white flex items-center justify-center" >
      <div className=' px-4 md:px-20' style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "rgba(0, 0, 0, 0)",
          // backdropFilter: "blur(5px)",
          // WebkitBackdropFilter: "blur(5px)", // Safari support
        }}></div>
      <GlowingBackground />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 w-full">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            SOLAR PANELS <br /> FOR YOUR HOME
          </h2>
          <p className="text-gray-300 mb-6">
            High-quality solar solutions for a sustainable future
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-md">
            GET A QUOTE
          </Button>
        </div>
        {/* Image */}
        <div className="flex-1 relative">
          {/* <Image
            src="/images/base_image.jpeg"
            alt="Solar Panel"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          /> */}
        </div>
      </div>
    </section>
  );
}
