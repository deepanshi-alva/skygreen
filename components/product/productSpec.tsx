"use client";

import { Thermometer, Cog, Ruler } from "lucide-react";

type Row = { label: string; value: string };

function FancyCard({
  title,
  icon,
  rows,
}: {
  title: string;
  icon: React.ReactNode;
  rows: Row[];
}) {
  return (
    <div className="group relative">
      {/* gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/25 via-emerald-500/0 to-emerald-500/25 opacity-70 blur-[2px]" />
      <div className="relative h-full rounded-3xl bg-zinc-950/70 border border-green-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-green-500">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-400/30">
            {icon}
          </span>
          <h3 className="text-base md:text-lg font-semibold text-white">
            {title}
          </h3>
        </div>

        {/* Body */}
        <div className="p-2">
          <ul className="divide-y divide-white/5">
            {rows.map((r, i) => (
              <li
                key={i}
                className={`
    grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-2 px-4 py-3
    rounded-2xl sm:rounded-none transition-all duration-300
    hover:bg-[#161616] hover:backdrop-blur-md
    hover:rounded-xl hover:scale-[1.10]
    hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]
    ${i % 2 === 0 ? "bg-white/[0.02] sm:bg-transparent" : ""}
  `}
              >
                <span className="text-sm text-zinc-400 transition-all duration-300 group-hover:text-white">
                  {r.label}
                </span>
                <span className="text-sm sm:text-right font-medium text-zinc-100 transition-all duration-300 group-hover:text-white">
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** ---- Your data ---- */
const MAX_RATINGS: Row[] = [
  { label: "Max system voltage", value: "1500 V (DC)" },
  { label: "Max fuse rating", value: "30 A" },
  { label: "Fire rating", value: "Class C" },
  { label: "Application class", value: "Class A" },
  { label: "Mechanical load", value: "5400 Pa (front), 2400 Pa (rear)" },
];

const TEMPERATURE: Row[] = [
  { label: "Pmax coefficient (γ)", value: "−0.30% / °C" },
  { label: "Voc coefficient (β)", value: "−0.26% / °C" },
  { label: "Isc coefficient (α)", value: "+0.046% / °C" },
  { label: "Operating temperature", value: "−40°C ~ +85°C" },
  { label: "NOCT", value: "45 ± 2 °C" },
];

const MECHANICAL: Row[] = [
  { label: "Dimensions", value: "2278 × 1134 × 30 mm" },
  { label: "Weight", value: "30 kg" },
  { label: "Cell type", value: "144 Half‑Cut N‑Type TOPCon" },
  { label: "Cell format", value: "182 mm (M10)" },
  { label: "Busbar technology", value: "16BB Multi‑Busbar" },
  { label: "Glass", value: "2 x 2.0 mm dual-glass, AR-coated" },
  { label: "Frame", value: "Anodized aluminum alloy" },
  { label: "Junction box", value: "IP68, 3 bypass diodes" },
  { label: "Connector", value: "MC4 compatible" },
  { label: "Cable", value: "4 mm², 300 mm" },
  { label: "Mounting hole distance", value: "400 mm" },
];

export default function ProductSpecsPretty() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          <FancyCard
            title="Maximum Ratings"
            icon={<Cog className="h-4 w-4 text-emerald-400" />}
            rows={MAX_RATINGS}
          />
          <FancyCard
            title="Temperature Characteristics"
            icon={<Thermometer className="h-4 w-4 text-emerald-400" />}
            rows={TEMPERATURE}
          />
          <FancyCard
            title="Mechanical Specifications"
            icon={<Ruler className="h-4 w-4 text-emerald-400" />}
            rows={MECHANICAL}
          />
        </div>

        <p className="mt-6 text-xs flex justify-center text-zinc-500">
          Specifications are subject to change without notice. For the latest
          technical details, please contact a SKYGREEN sales representative.
        </p>
      </div>
    </section>
  );
}
