"use client";

import { Zap, BarChart3, ShieldCheck, RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
        {/* bg video */}
        <video
          src="/images/products/HeaderFlower.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col md:flex-row items-center justify-between px-4 md:px-6">
          {/* LEFT: heading */}
          <div className="flex flex-col items-center md:items-start mt-[8rem] sm:mt-[12rem] md:mt-0 mb-0 md:mb-20">
            <Image
              src="/images/logo/logo-bg-remove.png"
              alt="Logo"
              width={260}
              height={100}
              priority
              className="w-[160px] sm:w-[220px] md:w-[280px] lg:w-[340px] h-auto"
            />
            <span className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-[2.4rem] font-bold mt-2 sm:mt-3">
              MODULES
            </span>
          </div>

          {/* floating download button → responsive position */}
          <div className="fixed bottom-6 left-4 md:absolute md:bottom-16 md:left-6 z-50">
            <a
              href="/images/pdfs/datasheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glowButton relative z-10 font-medium 
              text-[clamp(0.7rem,1.5vw,1rem)]  /* scales text between 11px and 16px */
              px-[clamp(0.5rem,2vw,1rem)]      /* scales padding-x */
              py-[clamp(0.3rem,1.5vw,0.75rem)] /* scales padding-y */
              rounded-full"
            >
              ↧ Download Datasheet
              <span className="glowEffect"></span>
            </a>
          </div>


          {/* RIGHT: big headline */}
          <div className="text-center md:text-right md:ml-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-12 md:mb-0">
            <p className="text-neutral-200/90 text-sm sm:text-lg md:text-xl lg:text-2xl">
              High-Efficiency Bifacial N-Type TOPCon
            </p>
            <h1 className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-xl lg:text-2xl font-extrabold tracking-tight text-white">
              144 Half-Cut Cells | 16BB Multi-Busbar
            </h1>
            <p className="text-green-600 text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-2 sm:mt-3 font-bold">
              Class-A
            </p>
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <section className="z-20 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-8 md:pt-12">
          <div
            className="relative -top-12 sm:-top-16 md:-top-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 rounded-xl border border-white/20 
                       bg-white/10 backdrop-blur-md shadow-lg p-3 sm:p-4 md:p-6"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
          >
            <Spec number="575" unit="Wp" label="Module Power" Icon={Zap} />
            <Spec
              number="22.26"
              unit="%"
              label="Module Efficiency"
              Icon={BarChart3}
            />
            <Spec
              number="15"
              unit="Years"
              label="Product Warranty"
              Icon={ShieldCheck}
            />
            <Spec
              number="30"
              unit="Years"
              label="Performance Warranty"
              Icon={RefreshCcw}
            />
          </div>
        </div>
      </section>

      <p className="text-center text-sm sm:text-base md:text-xl lg:text-2xl text-green-500 -mt-6 sm:-mt-10 md:-mt-16 mb-6 sm:mb-10 md:mb-16">
        Engineered for India&apos;s toughest climates. Certified worldwide.
      </p>
    </>
  );
}

function Spec({
  number,
  unit,
  label,
  Icon,
}: {
  number: string;
  unit: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* Icon */}
      <div className="grid h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 place-items-center">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-500" />
      </div>

      {/* Numbers + label */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-500">
            {number}
          </span>
          <span className="text-neutral-400 text-xs sm:text-sm md:text-base">
            {unit}
          </span>
        </div>
        <span className="mt-0.5 text-white/90 text-xs sm:text-sm md:text-base">
          {label}
        </span>
      </div>
    </div>
  );
}
