"use client";

import React from "react";

type Item = { title: string; note?: string };

const DOS: Item[] = [
  { title: "Clean panels regularly", note: "Use a soft cloth or sponge and clean water to remove dust, bird droppings, or leaves." },
  { title: "Schedule professional inspections", note: "Get your panels checked at least once a year for wiring, mounting, and performance." },
  { title: "Monitor your system's output", note: "Track daily generation through your inverter app or monitoring system." },
  { title: "Trim nearby trees", note: "Prevent shading from branches that can reduce energy output." },
  { title: "Check for physical damage after storms", note: "Look for cracks, loose wires, or broken mounts." },
  { title: "Follow manufacturer's warranty conditions", note: "Keep service records and comply with recommended maintenance." },
  { title: "Ensure good ventilation", note: "Keep the back of panels free from obstructions for cooling and efficiency." },
  { title: "Report issues early", note: "Inform your installer immediately if you notice sudden drops in output." },
];

const DONTS: Item[] = [
  { title: "Don't use harsh chemicals", note: "Avoid detergents, bleach, or abrasive cleaning tools that can damage glass." },
  { title: "Don't step or place heavy objects on panels", note: "Even slight pressure can cause micro-cracks." },
  { title: "Don't spray high-pressure water", note: "It can damage seals and cause water ingress." },
  { title: "Don't tamper with wiring or inverters", note: "Only certified technicians should handle electrical components." },
  { title: "Don't go near the solar panel system unnecessarily", note: "High voltage may be hazardous to life. Keep a safe distance and allow only trained professionals near the setup." },
  { title: "Don't ignore shading issues", note: "Even small shadows can drastically lower system performance." },
  { title: "Don't cover panels for long periods", note: "Keep them exposed to sunlight for optimal generation." },
  { title: "Don't delay cleaning", note: "Dust buildup over months can permanently reduce efficiency." },
  { title: "Don't store flammable materials nearby", note: "Maintain a safe clearance around electrical components." },
];

export default function SolarPanelDosAndDonts() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">Do’s & Don’ts for Solar Panel Owners</h2>
          <p className="mt-3 text-neutral-300">
            Simple care tips to keep your SKYGREEN solar panels performing at their best for years.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card tone="good" title="Do’s" items={DOS} />
          <Card tone="bad" title="Don’ts" items={DONTS} />
        </div>
      </div>
    </section>
  );
}

/* ========== Card Component ========== */
function Card({
  tone,
  title,
  items,
}: {
  tone: "good" | "bad";
  title: string;
  items: Item[];
}) {
  const accent =
    tone === "good"
      ? "from-green-500/30 via-green-500/10 to-transparent"
      : "from-rose-500/30 via-rose-500/10 to-transparent";
  const border =
    tone === "good" ? "border-green-500/30" : "border-rose-500/30";

  return (
    <div className={`relative rounded-2xl border ${border} bg-white/5 backdrop-blur-sm`}>
      {/* gradient edge */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b ${accent}`}
        aria-hidden
      />
      <div className="relative p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          {/* <Badge tone={tone} /> */}
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>

        <ul className="space-y-4">
          {items.map((it, i) => (
            <ListItem key={i} tone={tone} title={it.title} note={it.note} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ========== List Item ========== */
function ListItem({
  tone,
  title,
  note,
}: {
  tone: "good" | "bad";
  title: string;
  note?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 " +
          (tone === "good"
            ? "bg-green-500/15 text-green-400 ring-green-500/40"
            : "bg-rose-500/15 text-rose-400 ring-rose-500/40")
        }
        aria-hidden
      >
        {tone === "good" ? <CheckIcon /> : <XIcon />}
      </span>
      <div>
        <p className="leading-snug">{title}</p>
        {note && <p className="mt-1 text-sm text-neutral-300">{note}</p>}
      </div>
    </li>
  );
}

/* ========== Icons ========== */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
