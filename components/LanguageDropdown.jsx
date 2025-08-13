"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

const LANGS = [
    { code: "EN", label: "English", cc: "gb" }, // EN -> UK flag (as in your screenshot)
    { code: "DE", label: "Deutsch", cc: "de" },
    { code: "FR", label: "Français", cc: "fr" },
    { code: "CN", label: "中文", cc: "cn" },
    { code: "PL", label: "Polski", cc: "pl" },
    { code: "TR", label: "Türkçe", cc: "tr" },
    { code: "PT", label: "Português", cc: "pt" },
    { code: "ES", label: "Español", cc: "es" },
    { code: "IT", label: "Italiano", cc: "it" },
    { code: "JA", label: "日本語", cc: "jp" },
    { code: "AR", label: "العربية", cc: "sa" },
];

function Flag({ cc, size = 16 }) {
    return (
        <span className="inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <CircleFlag countryCode={cc} height={size} />
        </span>
    );
}

export default function LanguageDropdown() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(LANGS[0]);
    const ref = useRef(null);

    useEffect(() => {
        const onClickAway = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
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
        // later: trigger i18n changeLanguage(lang.code)
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
                <Flag cc={selected.cc} />
                <span className="font-medium">{selected.code}</span>
                <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute right-0 mt-2 w-22 rounded-xl bg-black/95 border border-white/10 shadow-xl backdrop-blur-sm z-50 overflow-hidden"
                >
                    {/* <div className="pointer-events-none absolute right-2 top-2 bottom-2 w-px bg-white/30" /> */}
                    <ul className="py-1 max-h-[200px] overflow-y-auto overscroll-contain pr-1">
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
                                        <Flag cc={lang.cc} />
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
