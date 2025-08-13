"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const LANGS = [
  { code: "EN", label: "English",  flag: "🇬🇧" },
  { code: "DE", label: "Deutsch",  flag: "🇩🇪" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "CN", label: "中文",      flag: "🇨🇳" },
  { code: "PL", label: "Polski",   flag: "🇵🇱" },
  { code: "TR", label: "Türkçe",   flag: "🇹🇷" },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGS[0]); // default EN
  const ref = useRef(null);

  useEffect(() => {
    const onClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    // later: hook i18n changeLanguage(lang.code)
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.code}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 mt-2 w-40 rounded-xl bg-black/95 border border-white/10 shadow-xl backdrop-blur-sm z-50 overflow-hidden"
        >
          {/* thin vertical divider on right (like your screenshot) */}
          <div className="pointer-events-none absolute right-2 top-2 bottom-2 w-px bg-white/30" />
          <ul className="py-1">
            {LANGS.map((lang) => {
              const isActive = lang.code === selected.code;
              return (
                <li key={lang.code}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition
                      hover:bg-white/10 focus:bg-white/10
                      ${isActive ? "text-white" : "text-neutral-200"}`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="tracking-wide">{lang.code}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
