// components/homepage/newsEventsBlogs.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * @typedef {Object} Item
 * @property {string|number} id
 * @property {string} title
 * @property {string=} excerpt
 * @property {string=} image
 * @property {string=} date    // ISO preferred
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
 * Props (JS Doc for IntelliSense)
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

  // Pick dataset for current tab and sort by date desc (most recent first)
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

  // Reset slide when switching tabs
  useEffect(() => {
    setIndex(0);
  }, [active]);

  // Autoplay
  useEffect(() => {
    if (!items.length) return;
    if (isHover) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIndex((i) => (i + 1) % items.length), autoplayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [items.length, isHover, safeIndex, autoplayMs]);

  const goPrev = () => items.length && setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => items.length && setIndex((i) => (i + 1) % items.length);

  // Touch/drag (simple)
  const onTouchStart = (e) => setDragStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (dragStartX == null) return;
    const delta = e.changedTouches[0].clientX - dragStartX;
    setDragStartX(null);
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  const isLatest = (it, idx) => idx === 0 && !!(it && it.date);

  return (
    <section
      className={`w-full bg-black text-white py-10 md:py-14 ${className}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="News, Events, and Blogs carousel"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6">
        {/* Side buttons */}
        <aside className="flex md:flex-col gap-3 md:gap-4 sticky top-16 self-start">
          {["events", "news", "blogs"].map((key) => {
            const label = key[0].toUpperCase() + key.slice(1);
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 px-5 py-3 text-left
                  ${isActive ? "border-green-400/70 bg-green-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-semibold ${isActive ? "text-green-400" : "text-white"}`}>
                    {label}
                  </span>
                  <span className="text-xs text-white/60">
                    {data?.[key]?.length ?? 0}
                  </span>
                </div>
                <div className="mt-1 text-xs text-white/60">
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

        {/* Carousel */}
        <div
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Empty state */}
          {!items.length && (
            <div className="p-10 md:p-16 text-center">
              <p className="text-xl text-white/70">No {active} to show yet.</p>
              <p className="text-white/50 mt-2">Add items from your CMS or API.</p>
            </div>
          )}

          {/* Slide */}
          {!!items.length && (
            <div className="relative h-[420px] md:h-[500px]">
              <AnimatePresence initial={false} mode="wait">
                <motion.a
                  key={current?.id ?? `idx-${safeIndex}`}
                  href={current?.href || "#"}
                  target={current?.href ? "_self" : undefined}
                  rel={current?.href ? "noopener" : undefined}
                  className="absolute inset-0 grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Image / visual */}
                  <div className="relative overflow-hidden">
                    {current?.image ? (
                      <img
                        src={current.image}
                        alt={current.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-green-600/20 to-green-300/10" />
                    )}

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Date + Tag chip stack (bottom left on image) */}
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

                  {/* Text */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                        {current?.title}
                      </h3>
                      {current?.meta && (
                        <p className="mt-2 text-sm text-white/60">{current.meta}</p>
                      )}
                      {current?.excerpt && (
                        <p className="mt-4 text-white/80 line-clamp-4 md:line-clamp-5">
                          {current.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex gap-2">
                        {items.slice(0, 5).map((it, i) => (
                          <button
                            key={it.id}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setIndex(i);
                            }}
                            className={`h-1.5 w-6 rounded-full transition-all ${
                              i === safeIndex ? "bg-green-400" : "bg-white/30 hover:bg-white/60"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            goPrev();
                          }}
                          className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 hover:bg-white/10"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            goNext();
                          }}
                          className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 hover:bg-white/10"
                          aria-label="Next"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.a>
              </AnimatePresence>
            </div>
          )}
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
