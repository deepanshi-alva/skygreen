"use client";
import React, { useState } from "react";
import Image from "next/image";

type ClimateKey = "rainy" | "snowy" | "desert" | "hailing" | "windy";
type SpecItem = { title: string; description: string };

const CLIMATES: Record<
  ClimateKey,
  {
    label: string;
    sublabel: string;
    icon: string; // <-- changed from emoji to icon path
    colors: [string, string];
    overview: string;
    video: string;
    specs: SpecItem[];
  }
> = {
  rainy: {
    label: "Rainy",
    sublabel:"Monsoon Ready",
    icon: "/images/climate/rain.png",
    colors: ["#3b82f6", "#22d3ee"],
    overview:
      "Performance remains stable in heavy rain & monsoon humidity.",
    video: "images/climate/rain.mp4",
    specs: [
      { title: "Hydrophobic glass", description: "Water beads, light transmission stays high." },
      { title: "Sealed frame", description: "Prevents moisture ingress." },
      { title: "IP68 build", description: "Flood-safe, long-term reliability." },
      { title: "Bypass diodes", description: "Stable output in shaded drizzle." },
      { title: "100% RH ready", description: "Condensation and humidity resistant." },
    ],
  },
  snowy: {
    label: "Snowy",
    sublabel:"Cold Climate Performance",
    icon: "/images/climate/cold.png",
    colors: ["#bfdbfe", "#60a5fa"],
    overview:
      "Reliable output in sub-zero, snowy regions.",
    video: "images/climate/snow.mp4",
    specs: [
      { title: "5400 Pa load", description: "Handles heavy snow pressure." },
      { title: "Drain channels", description: "Meltwater exits quickly." },
      { title: "Low temp coefficient (-0.34%/°C)", description: "Higher efficiency in cold." },
      { title: "Black backsheet", description: "Retains heat, helps snow melt." },
      { title: "-40 °C cycle tested", description: "Freeze-thaw durable." },
    ],
  },
  desert: {
    label: "Desert",
    sublabel:"Heat & Dust Resistant",
    icon: "/images/climate/hot.png",
    colors: ["#fbbf24", "#f59e0b"],
    overview:
      "Engineered for hot, dusty, high-radiation sites.",
    video: "images/climate/desert.mp4",
    specs: [
      { title: "UV-resistant materials", description: "Slower aging under intense sun." },
      { title: "-40°C to +85°C range ", description: "Wide temperature endurance." },
      { title: "Abrasion-resistant glass", description: "Withstands dust and sandstorms." },
      { title: "IEC dust ingress test passed", description: "Desert-certified protection." },
      { title: "Dry-clean compatible", description: "Supports robotic & manual cleaning." },
    ],
  },
  hailing: {
    label: "Hailing",
    sublabel:"Impact Resistant",
    icon: "/images/climate/hail.png",
    colors: ["#94a3b8", "#0ea5e9"],
    overview:
      "Durable against hailstorms & extreme gusts.",
    video: "/images/climate/hailstrom.mp4",
    specs: [
      { title: "25 mm @ 23 m/s hail certified", description: "Proven IEC hail test." },
      { title: "3.2-3.5 mm tempered glass ", description: "Absorbs high impacts." },
      { title: "Reinforced frame with corner keys", description: "Distributes shock." },
      { title: "2400 Pa wind load", description: "Gust-resistant structure." },
      { title: "12/30-year warranty cover", description: "Long-term reliability guaranteed." },
    ],
  },
  windy: {
    label: "Windy",
    sublabel:"Storm Secured",
    icon: "/images/climate/windy.png", // you can use the white wind SVG you made
    colors: ["#1f2937", "#7dd3fc"],
    overview:
      "Secure in coastal, cyclone & high-wind regions.",
    video: "/images/climate/wind.mp4",
    specs: [
      { title: "2400Pa wind rating", description: "Withstands strong winds." },
      { title: "20-25% clamps zones", description: "Reduces structural stress." },
      { title: "M6 SS fasteners", description: "Corrosion-proof mounting." },
      { title: "Integrated grounding", description: "Stable, safe bonding." },
      { title: "IEC 61215/61730 certified", description: "Tested to global standards." },
    ],
  },
};

export default function ClimateSelector() {
  const [selected, setSelected] = useState<ClimateKey>("rainy");

  return (
    <section className="relative min-h-screen bg-black overflow-hidden pt-15 pb-15" >
      {/* Heading */}
      <div className="text-center py-5 md:py-4 px-6 md:px-10 mb-5 ">
        <h1
          className="relative py-4 md:py-6 px-4 md:px-6 text-4xl md:text-6xl font-bold text-white inline-block"
          style={{
            borderBottom: "2px solid",
            borderImage:
              "linear-gradient(to right, #000000ff, #3ef838, #000000ff) 1",
          }}
        >
          The next level{" "}
          <span className="text-[#acfe53]">High-quality solar modules</span>
        </h1>
      </div>

      {/* Main section with animated background only here */}
      <div className="relative py-12 mx-auto max-w-7xl">
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative grid h-full w-full grid-cols-1 lg:grid-cols-3">
          {/* Left column */}
          <div className="relative mr-10 ml-4 text-white flex flex-col justify-center">
            {/* Icon + climate label as H1 */}
            <h1 className="inline-flex items-center gap-2 py-1 text-6xl md:text-7xl font-bold leading-none">
              <Image
                src={CLIMATES[selected].icon}
                alt="" // decorative; screen readers will read the text next to it
                width={24}
                height={24}
                className="h-15 w-15 object-contain"
                aria-hidden="true"
                priority={false}
              />
              <span className="tracking-wide">{CLIMATES[selected].label}</span>
            </h1>

            <h3 className="mt-4 text-2xl md:text-3xl text-[#acfe53] font-bold">
              {CLIMATES[selected].sublabel}
            </h3>

            <p
              key={selected + "-overview"}
              className="mt-4 text-base md:text-lg leading-relaxed animate-textIn max-w-prose"
            >
              {CLIMATES[selected].overview}
            </p>
          </div>

          {/* Center video */}
          <div className="relative flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-3xl aspect-[1] rounded-xl overflow-hidden shadow-lg">
              <video
                key={selected + "-video"}
                className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
                autoPlay
                muted
                loop
                playsInline
                src={CLIMATES[selected].video}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div
                key={selected + "-panel"}
                className="absolute left-[18%] bottom-[-18%] animate-rise"
                style={{
                  width: "clamp(180px, 18vw, 360px)",
                  height: "clamp(260px, 54vh, 480px)",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/climate/panel.png"
                    alt="Solar Panel"
                    fill
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    style={{ objectFit: "contain" }}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="specs-box">
            <div
              className="mt-5 mr-4 md:mt-6 text-white rounded-none shadow-lg"
              style={{
                borderImage:
                  "linear-gradient(140deg, #3ef838ff, #002f00ac, #002f00ac, #002f00ac, #002f00ac, #3ef838ff) 1",
                borderStyle: "solid",
                borderWidth: "2px",
                background: "rgba(0, 0, 0, 0.42)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="mt-5 md:mt-3 ml-5 text-[#acfe53] text-2xl md:text-3xl font-semibold">
                Solar Panel Specs
              </h3>

              <ul
                key={selected + "-specs"}
                className="p-4 md:py-3 md:p-6 space-y-3 list-none"
              >
                {CLIMATES[selected].specs.map((spec, i) => (
                  <li
                    key={i}
                    className="pl-8 specItem"
                    style={{
                      backgroundImage: "url('/images/climate/points.png')",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "16px 16px",
                      backgroundPosition: "0 0.45em",
                      animationDelay: `${i * 120}ms`,
                    }}
                  >
                    <div className="text-base md:text-lg font-medium leading-snug">
                      {spec.title}
                    </div>
                    <div className="text-sm md:text-base text-gray-300 leading-tight mt-0.5">
                      {spec.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons below video */}
        <div className="pointer-events-none absolute bottom-6 inset-x-0 flex justify-center">
          <div className="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-3 rounded-3xl bg-black/30 p-2 backdrop-blur">
            {(Object.keys(CLIMATES) as ClimateKey[]).map((key) => {
              const active = key === selected;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(key)}
                  className={`group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-transform ${
                    active
                      ? "bg-white text-gray-900 shadow-md scale-[1.03]"
                      : "bg-white/15 text-white hover:bg-white/25 hover:scale-[1.02]"
                  }`}
                  title={CLIMATES[key].label}
                >
                  <Image
                    src={CLIMATES[key].icon}
                    alt={`${CLIMATES[key].label} icon`}
                    width={18}
                    height={18}
                    className={`h-[18px] w-[18px] object-contain transition-filter duration-200 ${
                      active ? "brightness-0" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {CLIMATES[key].label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 800ms ease forwards;
        }

        @keyframes textIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-textIn {
          animation: textIn 350ms ease;
        }

        @keyframes listIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .specItem {
          opacity: 0;
          animation: listIn 400ms ease forwards;
        }

        @keyframes riseIn {
          from {
            transform: translateY(48px) scale(0.98);
            opacity: 0;
            filter: blur(5px);
          }
          60% {
            opacity: 1;
            filter: blur(0);
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-rise {
          animation: riseIn 2000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.6s;
          animation-fill-mode: backwards;
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  );
}
