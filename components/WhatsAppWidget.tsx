"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  phone?: string; // E.164 without + (e.g. "919876543210")
  message?: string;
  showOn?: string[]; // list of path prefixes where widget should appear
  bottom?: number;
  right?: number;
};

export default function WhatsAppWidget({
  phone = process.env.NEXT_PUBLIC_WAPP_PHONE || "919811223252",
  message = "Hi SKYGREEN, I’m interested in your solar panels. Please help me with details.",
  showOn,
  bottom = 20,
  right = 20,
}: Props) {
  const pathname = usePathname() ?? "";

  // Mobile detection and href/state are computed only on the client
  const [isMobile, setIsMobile] = useState(false);
  const [waHref, setWaHref] = useState<string>("#");

  // Compute whether widget is enabled for current pathname
  const enabled = useMemo(() => {
    if (!showOn || showOn.length === 0) return true;
    return showOn.some((p) => pathname.startsWith(p));
  }, [pathname, showOn]);

  // determine mobile UA on mount (client-side only)
  useEffect(() => {
    try {
      const ua =
        typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          ua
        )
      );
    } catch {
      setIsMobile(false);
    }
  }, []);

  // build the whatsapp href after mount (so document/window are available)
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      // still keep a safe fallback
      setWaHref("#");
      return;
    }

    const pageTitle = document.title || "SKYGREEN";
    const pageUrl = window.location.href || "";
    const payload = `${message}\n\nPage: ${pageTitle}\nURL: ${pageUrl}`.trim();
    const encoded = encodeURIComponent(payload);

    // sanitize phone: remove leading plus if provided
    const sanitizedPhone = phone?.replace(/^\+/, "") ?? "";

    const href = isMobile
      ? `whatsapp://send?phone=${sanitizedPhone}&text=${encoded}`
      : `https://wa.me/${sanitizedPhone}?text=${encoded}`;

    setWaHref(href);
  }, [phone, message, isMobile, pathname]);

  if (!enabled) return null;

  return (
    <div
      className="fixed z-[70] pointer-events-none"
      style={{
        bottom: `max(${bottom}px, env(safe-area-inset-bottom))`,
        right: `max(${right}px, env(safe-area-inset-right))`,
      }}
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          pointer-events-auto
          grid place-items-center
          h-14 w-14 md:h-12 md:w-12
          rounded-full bg-[#25D366]
          ring-1 ring-white/15
          shadow-[0_8px_20px_rgba(0,0,0,0.45)]
          transition-transform duration-200
          hover:scale-110 focus-visible:scale-110
          outline-none
        "
      >
        <FaWhatsapp className="block text-white" size={28} aria-hidden />
      </a>
    </div>
  );
}
