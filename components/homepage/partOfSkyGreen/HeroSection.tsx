import React from 'react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg">
      <Image
        src="/images/refer.png"
        width={1000}
        height={1000}
        alt="Friends camping outdoors with portable power station"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          Refer a friend
        </h2>
        <p className="text-xl text-gray-100 font-medium text-justify">
          At SKYGREEN, we don’t just sell solar panels — we build a community of partners, installers, and customers who believe in a brighter and cleaner future. When you join the Skygreen Family, you’re not just a buyer or seller — you’re a partner in India’s clean energy journey.
        </p>
      </div>
    </div>
  );
}