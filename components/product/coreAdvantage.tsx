"use client";

import Image from "next/image";
import React, { useState } from "react";

type Feature = { title: string; description: string; icon?: React.ReactNode };
type ImgCfg = { src: string; zoom?: number; objectPosition?: string };

export default function CoreAdvantages() {
  const images: ImgCfg[] = [
    { src: "/images/products/front-image.png" },
    { src: "/images/products/side-image.png", zoom: 1.35, objectPosition: "left center" },
    { src: "/images/products/zoomed-image.png" },
  ];

  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  const leftFeatures: Feature[] = [
    {
      title: "Reliable upgrade, leading warranty",
      description:
        "Optimized wafers, cells, and packaging deliver a linear power warranty with ~0.4% annual degradation.",
      icon: <ShieldIcon />,
    },
    {
      title: "Significant improvement in power generation performance",
      description:
        "Higher bifacial ratio and improved temperature coefficient can yield up to ~3% extra generation.",
      icon: <BoltIcon />,
    },
  ];

  const rightFeatures: Feature[] = [
    {
      title: "BOS cost savings",
      description:
        "≈4.5% power increase enables fewer racks, cables, land, and AC‑side equipment per watt.",
      icon: <CoinIcon />,
    },
    {
      title: "Operation and Maintenance cost savings",
      description:
        "Improved efficiency reduces cleaning, land rental, and maintenance overhead over the lifetime.",
      icon: <GearIcon />,
    },
  ];

  return (
    <section className="bg-black text-white pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-4xl font-semibold">Core Advantages</h2>

        {/* 3-column layout */}
        <div
          className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-14"
          style={{ ["--viewer-h" as string]: "clamp(420px, 60vh, 640px)" }}
        >
          {/* Left list (left-aligned, two rows, centered vertically) */}
          <div className="min-h-[var(--viewer-h)] grid grid-rows-2 content-center justify-items-start">
            {leftFeatures.map((f, i) => (
              <FeatureItem key={i} {...f} align="center" />
            ))}
          </div>

          {/* Center viewer */}
          <div className="relative mx-auto flex items-center justify-center">
            <div className="relative aspect-[2/3] h-[var(--viewer-h)] w-auto max-w-[460px] rounded-md overflow-hidden">
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
                  style={{ objectPosition: images[idx].objectPosition ?? "center" }}
                  priority
                />
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous angle"
              className="group absolute -left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:ring-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <span className="block h-5 w-5 rotate-180">
                <ArrowIcon />
              </span>
            </button>
            <button
              onClick={next}
              aria-label="Next angle"
              className="group absolute -right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:ring-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <span className="block h-5 w-5">
                <ArrowIcon />
              </span>
            </button>
          </div>

          {/* Right list (right-aligned, two rows, centered vertically) */}
          <div className="min-h-[var(--viewer-h)] grid grid-rows-2 content-center justify-items-end">
            {rightFeatures.map((f, i) => (
              <FeatureItem key={i} {...f} align="center" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  title,
  description,
  icon,
  align = "center",
}: Feature & { align?: "center" | "center" }) {
  const isRight = align === "center";
  return (
    <div className={isRight ? "text-center" : "text-center"}>
      <div
        className={
          "mb-4 flex items-center " + (isRight ? "justify-center" : "justify-center")
        }
      >
        <IconBadge>{icon}</IconBadge>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold leading-tight">
        {title}
      </h3>
      <p
        className={
          "mt-2 text-base leading-relaxed text-neutral-300" +
          (isRight ? "ml-auto" : "")
        }
      >
        {description}
      </p>
    </div>
  );
}

/* ---- UI primitives ---- */
function IconBadge({ children }: { children: React.ReactNode }) {
  // small circular badge with red accent like the reference
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center ">
      <span className="text-green-500">{children}</span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M8 5l8 7-8 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor">
      <path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" strokeWidth="1.6" />
      <path d="M9 12l2 2 4-4" strokeWidth="1.6" className="stroke-green-500" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeWidth="1.6" className="stroke-green-500" />
    </svg>
  );
}
function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path d="M8 12h8m-4-4v8" strokeWidth="1.6" className="stroke-green-500" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor">
      <path
        d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"
        strokeWidth="1.6"
        className="stroke-green-500"
      />
      <path
        d="M19.4 15a7.5 7.5 0 0 0 .2-1 7.5 7.5 0 0 0-.2-1l2.1-1.6a.5.5 0 0 0 .1-.7l-2-3.5a.5.5 0 0 0-.6-.2l-2.5 1a6.8 6.8 0 0 0-1.7-1L15 3.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5l-.4 2.6a6.8 6.8 0 0 0-1.7 1l-2.5-1a.5.5 0 0 0-.6.2l-2 3.5a.5.5 0 0 0 .1.7L4.6 13a7.5 7.5 0 0 0-.2 1c0 .3.1.7.2 1l-2.1 1.6a.5.5 0 0 0-.1.7l2 3.5c.1.2.4.3.6.2l2.5-1a6.8 6.8 0 0 0 1.7 1l.4 2.6a.5.5 0 0 0 .5.5h4c.3 0 .5-.2.5-.5l.4-2.6a6.8 6.8 0 0 0 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.5a.5.5 0 0 0-.1-.7L19.4 15z"
        strokeWidth="1.6"
      />
    </svg>
  );
}
