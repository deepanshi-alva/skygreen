// components/homepage/newsEventsBlogs.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * @typedef {Object} Item
 * @property {string|number} id
 * @property {string} title
 * @property {string=} excerpt
 * @property {string=} image
 * @property {string=} date
 * @property {string=} start_date
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

  /** ---------- Data filtering + sorting ---------- */
  const items = useMemo(() => {
    const raw = data?.[active] || [];
    const now = new Date();
    const upcomingLimit = new Date();
    upcomingLimit.setDate(now.getDate() + 10);

    // ✅ Event logic: only show future (not expired)
    if (active === "events") {
      const upcoming = [];
      const future = [];

      raw.forEach((e) => {
        if (!e.start_date) return; // skip invalid
        const eventDate = new Date(e.start_date);

        if (eventDate < now) {
          // ❌ skip expired
          return;
        } else if (eventDate <= upcomingLimit) {
          upcoming.push(e); // within 10 days
        } else {
          future.push(e); // after 10 days
        }
      });

      // sort by nearest first
      upcoming.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      future.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

      return [...upcoming, ...future];
    }

    // ✅ Default sorting for news/blogs
    return [...raw].sort((a, b) => {
      const da = a?.date ? new Date(a.date).getTime() : 0;
      const db = b?.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  }, [data, active]);

  const safeIndex = items.length
    ? ((index % items.length) + items.length) % items.length
    : 0;
  const current = items[safeIndex];

  /** ---------- Autoplay ---------- */
  useEffect(() => {
    setIndex(0);
  }, [active]);

  useEffect(() => {
    if (!items.length || isHover) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      autoplayMs
    );
    return () => clearTimeout(timerRef.current);
  }, [items.length, isHover, safeIndex, autoplayMs]);

  /** ---------- Controls ---------- */
  const goPrev = () =>
    items.length && setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () =>
    items.length && setIndex((i) => (i + 1) % items.length);

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

  /** ---------- Render ---------- */
  return (
    <section
      className={`w-full bg-black text-white pt-15 ${className}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="News, Events, and Blogs carousel"
    >
      <div className="mx-auto max-w-7xl px-2 md:px-4">
        {/* ---------- Header ---------- */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold leading-tight">
            Latest <span className="text-[#acfe53]">Updates & Insights</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            Stay informed with the newest news, upcoming events, and in-depth
            blogs from the solar industry.
          </p>
        </div>

        {/* ---------- Layout ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-6 items-stretch md:h-[520px] h-auto">
          {/* Tabs */}
          <aside className="flex flex-row md:flex-col gap-3 md:gap-4 h-30 md:h-full order-last md:order-first">
            {["events", "news", "blogs"].map((key) => {
              const label = key[0].toUpperCase() + key.slice(1);
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 ease-in-out px-4 py-3 text-left flex-1 ${isActive
                      ? "border-green-400/70 bg-green-500/8"
                      : "border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,100,81,.5),_rgba(0,128,0,0))] hover:bg-[radial-gradient(circle_at_top_left,_rgba(0,120,81,.2),_rgba(0,128,0,0.05))]"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-base md:text-lg font-semibold ${isActive ? "text-green-400" : "text-white"
                        }`}
                    >
                      {label}
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
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 25,
                      }}
                    >
                      <div className="absolute -inset-1 rounded-2xl bg-green-400/10 blur-2xl" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </aside>

          {/* ---------- Carousel ---------- */}
          <div
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden md:h-full h-auto"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Navigation */}
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

            {/* No items */}
            {!items.length && (
              <div className="p-10 md:p-16 text-center h-full flex items-center justify-center">
                <p className="text-xl text-white/70">
                  No {active} to show yet.
                </p>
              </div>
            )}

            {/* Slide */}
            {!!items.length && (
              <div className="relative h-full">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={current?.id ?? `idx-${safeIndex}`}
                    className={`${current?.image
                        ? "grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                        : "flex"
                      } relative md:absolute inset-0`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Image */}
                    {current?.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={current.image}
                          alt={current.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* ✅ Upcoming / Happening Today */}
                        {active === "events" &&
                          current?.start_date &&
                          (() => {
                            const eventDate = new Date(current.start_date);
                            const now = new Date();
                            const diffDays = Math.ceil(
                              (eventDate - now) / (1000 * 60 * 60 * 24)
                            );

                            if (diffDays === 0) {
                              return (
                                <div className="absolute top-4 left-4 rounded-full border border-yellow-400/50 bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300 shadow-md z-20">
                                  Happening Today
                                </div>
                              );
                            } else if (diffDays > 0 && diffDays <= 10) {
                              return (
                                <div className="absolute top-4 left-4 rounded-full border border-green-400/50 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300 shadow-md z-20">
                                  Upcoming — {diffDays} days left
                                </div>
                              );
                            }
                            return null;
                          })()}

                        {/* Bottom badges */}
                        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                          {isLatest(items[0], safeIndex) && (
                            <span className="rounded-full border border-green-400/50 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
                              Latest
                            </span>
                          )}
                          {current?.tag && (
                            <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white/80">
                              {current.tag}
                            </span>
                          )}
                          {current?.date && (
                            <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white/70">
                              {formatDate(current.date)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Text */}
                    <div
                      className={`p-6 flex flex-col text-left ${current?.image
                          ? "justify-between md:p-10"
                          : "justify-center w-full md:p-16"
                        }`}
                    >
                      <h3
                        className={`font-bold leading-tight text-left ${current?.image
                            ? "text-2xl md:text-3xl"
                            : "text-3xl md:text-5xl"
                          }`}
                      >
                        {current?.title}
                      </h3>
                      {current?.meta && (
                        <p className="mt-2 text-sm text-white/60 leading-relaxed">
                          {current.meta}
                        </p>
                      )}
                      {current?.excerpt && (
                        <p
                          className="mt-4 text-white/80 leading-relaxed text-justify line-clamp-4"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 5,
                            textOverflow: "ellipsis",
                          }}
                        >
                          {current.excerpt}
                        </p>
                      )}
                      {/* Action Buttons */}
                      {(current?.href || current?.document) && (
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {current?.href && (
                            <Link
                              href={`/updates#${active}`}
                              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
                            >
                              Read more
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          )}

                          {/* ✅ Document button appears only if media exists */}
                          {current?.document && (
                            <a
                              href={current.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-300 hover:bg-green-500/20 transition"
                            >
                              View Document
                              <ChevronRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}

                    </div>
                  </motion.div>
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
