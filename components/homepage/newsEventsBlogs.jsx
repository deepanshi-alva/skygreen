// components/homepage/newsEventsBlogs.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * @typedef {Object} Item
 * @property {string|number} id
 * @property {string} title
 * @property {string=} excerpt
 * @property {string=} image
 * @property {string=} date
 * @property {string=} tag
 * @property {string=} href
 * @property {string=} meta
 */

/**
 * @typedef {Object} Data
 * @property {Item[]} news
 * @property {Item[]} events
 * @property {Item[]} blogs
 */

/**
 * @param {{ data: Data, initialTab?: 'news'|'events'|'blogs', autoplayMs?: number, className?: string }} props
 */
export default function NewsEventsBlogs({
  data,
  initialTab = "news",
  autoplayMs = 4500,
  className = "",
}) {
  const [active, setActive] = useState(initialTab);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const timerRef = useRef(null);

  const items = useMemo(() => {
    const raw = data?.[active] || [];
    const sorted = [...raw].sort((a, b) => {
      const da = a?.date ? new Date(a.date).getTime() : 0;
      const db = b?.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    return sorted;
  }, [data, active]);

  const safeIndex = items.length ? index % items.length : 0;
  const current = items[safeIndex];

  useEffect(() => {
    setIndex(0);
  }, [active]);

  useEffect(() => {
    if (!items.length) return;
    if (isHover) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      autoplayMs
    );
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [items.length, isHover, safeIndex, autoplayMs]);

  const goPrev = () =>
    items.length && setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => items.length && setIndex((i) => (i + 1) % items.length);

  const onTouchStart = (e) => setDragStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (dragStartX == null) return;
    const delta = e.changedTouches[0].clientX - dragStartX;
    setDragStartX(null);
    if (Math.abs(delta) < 40) return;
    delta > 0 ? goPrev() : goNext();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  const isLatest = (it, idx) => idx === 0 && !!(it && it.date);

  return (
    <section
      className={`w-full bg-black text-white pt-15 ${className}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="News, Events, and Blogs carousel"
    >
      <div className="mx-auto max-w-7xl px-2 md:px-4">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl text-green-400 md:text-5xl lg:text-6xl font-bold leading-tight">
            Latest Updates & Insights
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            Stay informed with the newest news, upcoming events, and in-depth blogs from the solar industry.
          </p>
        </div>
        {/* Shared height wrapper → BOTH columns use the same height */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-6 items-stretch h-[460px] md:h-[520px]">
          {/* Vertical rail (left) — full height, evenly distributed buttons */}
          <aside className="flex flex-row md:flex-col gap-3 md:gap-4 h-full">
            {["events", "news", "blogs"].map((key) => {
              const label = key[0].toUpperCase() + key.slice(1);
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 px-4 py-3 text-left flex-1
                    ${isActive ? "border-green-400/70 bg-green-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-base md:text-lg font-semibold ${isActive ? "text-green-400" : "text-white"}`}>
                      {label}
                    </span>
                    <span className="text-xs text-white/60">
                      {data?.[key]?.length ?? 0}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] md:text-xs text-white/60">
                    {key === "events" && "Conferences, expos, launches"}
                    {key === "news" && "Market & policy updates"}
                    {key === "blogs" && "Insights & deep-dives"}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    >
                      <div className="absolute -inset-1 rounded-2xl bg-green-400/10 blur-2xl" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Carousel — now inherits the same height from the wrapper */}
          <div
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden h-full"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Fixed arrows (don’t animate out) */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Empty state */}
            {!items.length && (
              <div className="p-10 md:p-16 text-center h-full flex items-center justify-center">
                <div>
                  <p className="text-xl text-white/70">No {active} to show yet.</p>
                  <p className="text-white/50 mt-2">Add items from your CMS or API.</p>
                </div>
              </div>
            )}

            {/* Slide */}
            {!!items.length && (
              <div className="relative h-full">
                <AnimatePresence initial={false} mode="wait">
                  <motion.a
                    key={current?.id ?? `idx-${safeIndex}`}
                    href={current?.href || "#"}
                    target={current?.href ? "_self" : undefined}
                    rel={current?.href ? "noopener" : undefined}
                    className={`absolute inset-0 ${current?.image
                      ? "grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                      : "flex"
                      }`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Image — only if present */}
                    {current?.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={current.image}
                          alt={current.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                          {isLatest(items[0], safeIndex) && (
                            <span className="rounded-full border border-green-400/50 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
                              Latest
                            </span>
                          )}
                          {current?.tag && (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                              {current.tag}
                            </span>
                          )}
                          {current?.date && (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70">
                              {formatDate(current.date)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Text — full width when no image */}
                    <div
                      className={`p-6  flex flex-col ${current?.image ? "justify-between md:p-10" : "justify-center w-full md:p-16"
                        }`}
                    >
                      {/* Badges row (shown here if no image) */}
                      {!current?.image && (
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          {isLatest(items[0], safeIndex) && (
                            <span className="rounded-full border border-green-400/50 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
                              Latest
                            </span>
                          )}
                          {current?.tag && (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                              {current.tag}
                            </span>
                          )}
                          {current?.date && (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70">
                              {formatDate(current.date)}
                            </span>
                          )}
                        </div>
                      )}

                      <div>
                        <h3
                          className={`font-bold leading-tight ${current?.image ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
                            }`}
                        >
                          {current?.title}
                        </h3>
                        {current?.meta && (
                          <p className="mt-2 text-sm text-white/60">{current.meta}</p>
                        )}
                        {current?.excerpt && (
                          <p
                            className={`mt-4 text-white/80 ${current?.image ? "line-clamp-4 md:line-clamp-5" : ""
                              }`}
                          >
                            {current.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.a>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
