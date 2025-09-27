import React from "react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative w-full h-full min-h-[520px] md:min-h-[700px] lg:min-h-[792px] rounded-2xl overflow-hidden shadow-lg">
      {/* Use Image in fill mode so object-cover works reliably */}
      <Image
        src="/images/refer.png"
        alt="Friends camping outdoors with portable power station"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-center ">
          Think Solar? Refer Skygreen.
        </h2>
        <p className="text-base md:text-lg text-gray-100 font-medium text-justify max-w-3xl">
          Your friends, family and colleagues deserve more than advice — they
          deserve light, savings and a greener tomorrow. Referring them to the
          Skygreen Family isn&apos;t just about rewards, it&apos;s about
          bringing your circle into a movement that matters. Together, we shine.
          🌱
        </p>
      </div>
    </div>
  );
}
