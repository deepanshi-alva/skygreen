"use client";

import React from "react";

export default function HeroSection() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[72vh] md:h-[78vh] lg:h-[86vh] ">
        {/* bg video */}
        <video
          src="/images/products/HeaderFlower.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
          {/* LEFT: heading */}
          <div className="text-left">
            <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow">
              OUR <span className="text-green-500">PRODUCT</span>
            </h2>
          </div>

          {/* floating download button near lower-left (kept) */}
          <div className="hidden md:block absolute bottom-24 left-4 md:left-6">
            <button className="group inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-white backdrop-blur transition hover:bg-white/10 mb-8">
              <span className="font-medium">Download</span>
              <span className="grid h-5 w-5 place-items-center rounded border border-white/30 text-xs">
                ↧
              </span>
            </button>
          </div>

          {/* RIGHT: big headline */}
          <div className="ml-auto text-right">
            <p className="text-neutral-200/90 text-xl md:text-2xl">
              Efficiency at its best
            </p>
            <h1 className="mt-3 text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Bifacial N-Type TOPCon
            </h1>
            <p className="text-green-600 text-4xl mt-3 font-bold">Class-A</p>
          </div>
        </div>
      </section>

      {/* SPECS STRIP (white band like in ref) */}
      <section className="z-20 bg-black">
        <div className="mx-auto max-w-7xl px-6 pt-8 md:pt-10">
          <div
            className="relative top-[-15vh] bg-neutral-900 grid grid-cols-2 gap-4 rounded-xl border border-neutral-700 p-4 shadow-sm md:grid-cols-4 md:gap-6 md:p-6"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            {/* 1 */}
            <Spec number="575" unit="<W>" label="Module Power" />
            {/* 2 */}
            <Spec number="22.50" unit="<%>" label="Module Efficiency" />
            {/* 3 */}
            <Spec number="12" unit="<Year>" label="Product Warranty" />
            {/* 4 */}
            <Spec number="30" unit="<Year>" label="Power Warranty" />
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({
  number,
  unit,
  label,
}: {
  number: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start md:items-center">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-extrabold text-green-500">
          {number}
        </span>
        <span className="text-neutral-500 text-sm md:text-base">{unit}</span>
      </div>
      <span className="mt-1 text-white text-sm md:text-base">{label}</span>
    </div>
  );
}
