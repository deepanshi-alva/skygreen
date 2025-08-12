"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type Feature = { title: string; description: string; icon?: React.ReactNode };
type ImgCfg = { src: string; zoom?: number; objectPosition?: string };

export default function CoreAdvantages() {
  const images: ImgCfg[] = [
    { src: "/images/products/front-image.png" },
    {
      src: "/images/products/side-image.png",
      zoom: 1.35,
      objectPosition: "left center",
    }, // <- zoom in
    { src: "/images/products/zoomed-image.png" },
  ];

  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const leftFeatures: Feature[] = [
    {
      title: "Reliable upgrade, leading warranty",
      description:
        "Optimized wafers, cells, and packaging deliver a linear power warranty with ~0.4% annual degradation.",
      icon: <ShieldIcon />,
    },
    {
      title: "Better power generation",
      description:
        "Higher bifacial ratio and improved temperature coefficient yield up to ~3% extra generation.",
      icon: <BoltIcon />,
    },
  ];

  const rightFeatures: Feature[] = [
    {
      title: "BOS cost savings",
      description:
        "≈4.5% power increase enables fewer racks, cables, land, and AC-side equipment per watt.",
      icon: <CoinIcon />,
    },
    {
      title: "Lower O&M costs",
      description:
        "Higher efficiency reduces cleaning, land rental, and maintenance overhead over lifetime.",
      icon: <WrenchIcon />,
    },
  ];

  return (
    <section className="bg-black text-white pb-20">
      <div className="mx-auto max-w-7xl px-6 ">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold">
          Core Advantages
        </h2>

        {/* 3-column layout */}
        <div
          className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-12"
          style={{ ["--viewer-h" as any]: "clamp(380px, 60vh, 640px)" }} // shared column height
        >
          {/* Left list */}
          <div
            className="
              min-h-[var(--viewer-h)]
              md:grid md:grid-rows-2 md:content-center md:gap-24
              space-y-12 md:space-y-0
            "
          >
            {leftFeatures.map((f, i) => (
              <FeatureItem key={i} {...f} />
            ))}
          </div>

          {/* Center viewer */}
          <div className="relative mx-auto flex items-center justify-center">
            <div className="relative aspect-[2/3] h-[var(--viewer-h)] w-auto max-w-[420px] rounded-md overflow-hidden">
              {/* wrapper to apply zoom */}
              <div
                className="absolute inset-0 transition-transform duration-300 will-change-transform"
                style={{
                  transform: `scale(${images[idx].zoom ?? 1})`,
                  transformOrigin: "center",
                }}
              >
                <Image
                  src={images[idx].src}
                  alt="Solar panel angle"
                  fill
                  className="object-contain"
                  style={{
                    objectPosition: images[idx].objectPosition ?? "center",
                  }}
                  priority
                />
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous angle"
              className="group absolute -left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="block h-5 w-5 rotate-180">
                <ArrowIcon />
              </span>
            </button>

            <button
              onClick={next}
              aria-label="Next angle"
              className="group absolute -right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="block h-5 w-5">
                <ArrowIcon />
              </span>
            </button>
          </div>

          {/* Right list */}
          <div
            className="
              min-h-[var(--viewer-h)]
              md:grid md:grid-rows-2 md:content-center md:gap-24
              space-y-12 md:space-y-0
            "
          >
            {rightFeatures.map((f, i) => (
              <FeatureItem key={i} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ title, description, icon }: Feature) {
  return (
    <div className="text-center md:text-left">
      <div className="mb-3 flex items-center justify-center md:justify-start text-white">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-300">{description}</p>
    </div>
  );
}

/* --- Minimal inline icons tuned for dark UI --- */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M8 5l8 7-8 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
function BoltIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
      >
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
function CoinIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        <path d="M8 12h8m-4-4v8" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
function WrenchIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M21 3l-6 6m3-6a4 4 0 01-5 5l-7 7a2.5 2.5 0 11-3.5-3.5l7-7a4 4 0 015-5z"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}
