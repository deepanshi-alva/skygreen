'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative">
      <div
        className="relative h-[60vh] md:h-[70vh] lg:h-[78vh] overflow-hidden border-b-[2px]"
        style={{
          // gradient bottom border (black → green → black)
          borderImage: 'linear-gradient(to right, #000000, #00ff6a, #000000) 1',
          borderImageSlice: 1,

          // extra brightness in the middle bottom, fading to the sides
          background: 'radial-gradient(50% 30px at 50% 100%, rgba(0, 255, 106, 0.6) 0%, rgba(0, 255, 106, 0.15) 60%, rgba(0, 255, 106, 0) 100%)',

          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* background image */}
        <img
          src="/images/contact/hero.png"
          alt="Contact Hero"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            // fades bottom area so the green glow shows through
            maskImage:
              'radial-gradient(120% 85% at 50% 10%, black 55%, transparent 100%)',
          }}
        />

        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 pb-8 md:pb-16">
          <h1 className="font-extrabold leading-none tracking-tight text-white text-[44px] md:text-[72px] lg:text-[100px]">
            Contact Us
          </h1>
          <p className="mt-1 text-green-500 font-extrabold leading-none tracking-tight text-[28px] md:text-[40px] lg:text-[56px]">
            Information
          </p>
        </div>
      </div>
    </section>
  );
}
