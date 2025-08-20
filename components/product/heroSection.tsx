// "use client";

// import React from "react";
import { Zap, BarChart3, ShieldCheck, RefreshCcw } from "lucide-react";

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
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow">
              <span className="text-green-500">SKYGREEN</span> MODULES
            </h2>
          </div>

          {/* floating download button near lower-left (kept) */}
          <div className="hidden md:block absolute bottom-24 left-4 md:left-6">
            <button className="group inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-white backdrop-blur transition hover:bg-white/10 mb-8">
              <span className="grid h-5 w-5 place-items-center rounded border border-white/30 text-xs">
                ↧
              </span>
              <span className="font-medium">Download Datasheet</span>
            </button>
          </div>

          {/* RIGHT: big headline */}
          <div className="ml-auto text-right">
            <p className="text-neutral-200/90 text-xl md:text-2xl">
              High-Efficiency Bifacial N-Type TOPCon
            </p>
            <h1 className="mt-3 text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Bifacial N-Type TOPCon
            </h1>
            <p className="text-green-600 text-4xl mt-3 font-bold">Class-A</p>
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <section className="z-20 bg-black">
        <div className="mx-auto max-w-7xl px-6 pt-8 md:pt-10">
          <div
            className="relative top-[-15vh] bg-neutral-900 grid grid-cols-2 gap-4 rounded-xl border border-neutral-700 p-4 shadow-sm md:grid-cols-4 md:gap-6 md:p-6"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            {/* 1: Module Power */}
            <Spec
              number="575"
              unit="<Wp>"
              label="Module Power"
              Icon={Zap}
              iconLabel="Power"
            />
            {/* 2: Efficiency */}
            <Spec
              number="22.30"
              unit="<%>"
              label="Module Efficiency"
              Icon={BarChart3}
              iconLabel="Efficiency"
            />
            {/* 3: Product Warranty */}
            <Spec
              number="12"
              unit="<Year>"
              label="Product Warranty"
              Icon={ShieldCheck}
              iconLabel="Product Warranty"
            />
            {/* 4: Performance Warranty */}
            <Spec
              number="30"
              unit="<Year>"
              label="Performance Warranty"
              Icon={RefreshCcw}
              iconLabel="Performance Warranty"
            />
          </div>
        </div>
      </section>

      <p className="text-center text-2xl text-green-500 -mt-32 mb-28">Engineered for India’s toughest climates. Certified worldwide.</p>
    </>
  );
}

function Spec({
  number,
  unit,
  label,
  Icon,
  iconLabel,
}: {
  number: string;
  unit: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconLabel?: string;
}) {
  return (
    <div className="flex items-center md:items-center gap-3 md:gap-4">
      {/* Icon */}
      <div
        className="grid h-10 w-10 place-items-center"
        aria-hidden="true"
      >
        <Icon className="h-8 w-8 text-green-500" aria-label={iconLabel} />
      </div>

      {/* Numbers + label */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-extrabold text-green-500">
            {number}
          </span>
          <span className="text-neutral-400 text-sm md:text-base">{unit}</span>
        </div>
        <span className="mt-0.5 text-white/90 text-sm md:text-base">
          {label}
        </span>
      </div>
    </div>
  );
}
