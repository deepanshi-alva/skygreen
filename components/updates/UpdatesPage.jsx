"use client";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";

export default function UpdatesPage({ data }) {
  const [active, setActive] = useState("news");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const navItems = [
    { id: "news", label: "News" },
    { id: "events", label: "Events" },
    { id: "blogs", label: "Blogs" },
  ];

  const dateOptions = [
    { value: "all", label: "All" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "older", label: "Older" },
  ];

  // 🧠 References for sections
  const sectionRefs = {
    news: useRef(null),
    events: useRef(null),
    blogs: useRef(null),
  };

  // ✅ Intersection observer to detect visible section
  useEffect(() => {
    const options = { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Filter function
  const applyFilters = (items) => {
    if (!items) return [];

    return items.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const desc = item.description?.toLowerCase() || "";
      const tag = item.tag?.toLowerCase() || "";

      const searchMatch =
        title.includes(searchQuery.toLowerCase()) ||
        desc.includes(searchQuery.toLowerCase()) ||
        tag.includes(searchQuery.toLowerCase());

      let dateMatch = true;
      if (dateFilter !== "all" && item.date) {
        const itemDate = new Date(item.date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (dateFilter === "today") {
          dateMatch = itemDate.toDateString() === today.toDateString();
        } else if (dateFilter === "yesterday") {
          dateMatch = itemDate.toDateString() === yesterday.toDateString();
        } else if (dateFilter === "older") {
          dateMatch = itemDate < yesterday;
        }
      }

      return searchMatch && dateMatch;
    });
  };

  // ✅ Scroll accurately to section (with offset for fixed nav)
  const scrollToSection = (id) => {
    const section = sectionRefs[id]?.current;
    if (section) {
      const yOffset = -130; // adjust this to match your fixed nav height
      const y =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // ✅ Scroll to section when URL has hash (like #news or #events)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        // 👇 adjust this offset to match your fixed navbar height
        const yOffset = -130;
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // Run when component first mounts
    scrollToHash();

    // Also run when hash changes (without full reload)
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);


  return (
    <div className="w-full">
      {/* ✅ Section Navigation */}
      <div className="fixed top-[64px] md:top-[120px] w-full z-30 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-center gap-6 px-4 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${active === item.id
                  ? "bg-green-500/20 text-green-400 border border-green-400/40"
                  : "text-white/70 hover:text-green-300 hover:bg-white/5"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Add offset so content doesn’t hide under nav */}
      <div className="pt-40 md:pt-44 w-full">
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Search news, events, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <Select
              value={dateOptions.find((opt) => opt.value === dateFilter)}
              onChange={(selected) => setDateFilter(selected?.value || "all")}
              options={dateOptions}
              className="w-48"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  borderRadius: "0.5rem",
                  padding: "2px",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }),
                singleValue: (base) => ({ ...base, color: "white" }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "rgba(34,197,94,0.2)"
                    : "transparent",
                  color: state.isSelected ? "#22c55e" : "white",
                  cursor: "pointer",
                }),
              }}
            />
          </div>

          {/* News */}
          <section id="news" ref={sectionRefs.news}>
            <h2 className="text-3xl font-bold text-green-400 mb-6">News</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {applyFilters(data.news).map((n) => (
                <article
                  key={n.id}
                  className="rounded-xl overflow-hidden bg-gradient-to-b from-black/60 to-black/30 border border-white/10 shadow-md hover:shadow-green-500/20 hover:-translate-y-1 transition"
                >
                  {n.image && (
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-wide text-green-400">
                      {n.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-sm text-white/70 mt-2 line-clamp-3">
                      {n.excerpt}
                    </p>
                    {n.meta && (
                      <p className="text-xs text-white/50 mt-2">{n.meta}</p>
                    )}
                    {n.href && (
                      <a
                        href={n.href}
                        target="_blank"
                        className="mt-3 inline-block text-green-400 text-sm hover:underline"
                      >
                        Read More →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Events */}
          <section id="events" ref={sectionRefs.events}>
            <h2 className="text-3xl font-bold text-green-400 mb-6">
              Upcoming Events
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {applyFilters(data.events).map((e) => (
                <article
                  key={e.id}
                  className="rounded-xl overflow-hidden bg-gradient-to-b from-black/60 to-black/30 border border-white/10 shadow-md hover:shadow-green-500/20 hover:-translate-y-1 transition"
                >
                  {e.image && (
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-wide text-green-400">
                      {e.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 line-clamp-2">
                      {e.title}
                    </h3>
                    <p className="text-sm text-white/70 mt-2 line-clamp-3">
                      {e.excerpt}
                    </p>
                    {e.meta && (
                      <p className="text-xs text-white/50 mt-2">{e.meta}</p>
                    )}
                    {e.href && (
                      <a
                        href={e.href}
                        target="_blank"
                        className="mt-3 inline-block text-green-400 text-sm hover:underline"
                      >
                        Read More →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Blogs */}
          <section id="blogs" ref={sectionRefs.blogs}>
            <h2 className="text-3xl font-bold text-green-400 mb-6">Blogs</h2>
            {data.blogs.length === 0 ? (
              <p className="text-white/60">No blogs yet. Stay tuned!</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {applyFilters(data.blogs).map((b) => (
                  <article
                    key={b.id}
                    className="rounded-xl overflow-hidden bg-gradient-to-b from-black/60 to-black/30 border border-white/10 shadow-md hover:shadow-green-500/20 hover:-translate-y-1 transition"
                  >
                    {b.image && (
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-wide text-green-400">
                        {b.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-1 line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-sm text-white/70 mt-2 line-clamp-3">
                        {b.excerpt}
                      </p>
                      {b.meta && (
                        <p className="text-xs text-white/50 mt-2">{b.meta}</p>
                      )}
                      {b.href && (
                        <a
                          href={b.href}
                          target="_blank"
                          className="mt-3 inline-block text-green-400 text-sm hover:underline"
                        >
                          Read Blog →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
