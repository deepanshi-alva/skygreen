"use client";
import React, { useEffect, useRef, useState } from "react";
import Glowing from "./GlowingBackground";

export default function AcronymSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [startText, setStartText] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  const acronym = [
    { letter: "S", word: "Solar", desc: "High-efficiency 575W TOPCon panels" },
    { letter: "K", word: "Kind", desc: "24/7 support via WhatsApp" },
    { letter: "Y", word: "Your", desc: "Your power, your savings" },
    { letter: "G", word: "Grounded", desc: "Built on trust and purpose" },
    { letter: "R", word: "Resilient", desc: "Works in shade and tough weather" },
    { letter: "E", word: "Excellent", desc: "22.3% efficiency, zero LID" },
    { letter: "E", word: "Economical", desc: "Only ₹12,000/panel + subsidies" },
    { letter: "N", word: "Nurturing", desc: "25–30 year warranties" },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setBgVisible(true);
    const t = setTimeout(() => setStartText(true), 500);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!startText) return;
    let i = 0;
    const timer = setInterval(() => {
      setVisibleIndex(i++);
      if (i >= acronym.length) clearInterval(timer);
    }, 160);
    return () => clearInterval(timer);
  }, [startText, acronym.length]);

  return (
    <section
  ref={sectionRef}
  className="flex flex-col md:flex-row w-full h-screen max-h-screen bg-black overflow-hidden"
>
      {/* LEFT */}
      <div className="relative w-full md:w-2/5 h-full flex items-start justify-start p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
        <div
          className={`
            absolute inset-0 bg-[url('/images/whyskygreen/skyGreenBG.png')] bg-cover bg-center
            after:absolute after:inset-0 after:bg-emerald-500/60 after:mix-blend-multiply
            transition-transform duration-700 ease-out will-change-transform
            ${bgVisible ? "translate-x-0" : "-translate-x-full"}
          `}
        />
        <div className="absolute inset-0 backdrop-blur-md pointer-events-none" />
        <div
          className={`
            relative transition-all duration-600 ease-out
            ${startText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
          `}
        >
          <h1 className="text-white leading-tight text-left
                         text-[clamp(2rem,5vw,4.5rem)] font-extrabold">
            SKYGREEN <br />
            <span className="block font-semibold text-[clamp(1.25rem,2.8vw,2.25rem)]">
              Trusted Solar Excellence
            </span>
          </h1>
          <p className="mt-3 text-white/90 leading-relaxed max-w-[45ch]
                        text-[clamp(0.95rem,2.2vw,1.125rem)]">
            Harness the power of the sun with high-efficiency panels built for
            India’s toughest conditions — reliable, affordable, and sustainable.
          </p>
        </div>
      </div>

     <div className="relative w-full md:w-3/5 h-full min-h-0 bg-black
                p-4 sm:p-5 md:p-15 lg:p-28
                flex flex-col justify-between overflow-hidden">
  {inView && <Glowing className="absolute inset-0 -z-10 pointer-events-none" />}

  <div
    className={`
      relative z-10 flex flex-col justify-between
      ${startText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
      transition-all duration-600 ease-out
      flex-1
    `}
  >
    {acronym.map((item, idx) => (
      <div
        key={idx}
        className={`
          group relative transform transition-all duration-500
          ${visibleIndex >= idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
        `}
        style={{ transitionDelay: `${idx * 0.05}s` }}
      >
        <div
          className="
            flex flex-wrap items-center gap-x-3 sm:gap-x-4
            py-[clamp(0.3rem,1vh,0.8rem)]
          "
        >
          {/* Letter */}
          <span
            className="shrink-0 text-green-400 font-extrabold leading-none
                       text-[clamp(1.8rem,5vw,4rem)]"
          >
            {item.letter}
          </span>

          {/* Word */}
          <span
            className="text-white font-bold leading-tight
                       text-[clamp(1rem,3vw,2rem)]"
          >
            → {item.word}
          </span>

          {/* Description */}
          <p
            className="
              flex-1 min-w-0 break-words leading-snug text-gray-400
              text-[clamp(0.9rem,2.5vw,1.3rem)]
              transition-transform transition-colors duration-300 origin-left
              group-hover:scale-110 group-hover:text-white
            "
          >
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
