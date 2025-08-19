"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  phone?: string;        // E.164 without + (e.g. "919876543210")
  message?: string;
  showOn?: string[];
  bottom?: number;
  right?: number;
};

export default function WhatsAppWidget({
  phone = process.env.NEXT_PUBLIC_WAPP_PHONE || "919999999999",
  message = "Hi SKYGREEN, I’m interested in your solar panels. Please help me with details.",
  showOn,
  bottom = 20,
  right = 20,
}: Props) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const enabled = useMemo(() => {
    if (!showOn || showOn.length === 0) return true;
    return showOn.some((p) => pathname.startsWith(p));
  }, [pathname, showOn]);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua));
  }, []);

  if (!enabled) return null;

  const pageTitle = typeof document !== "undefined" ? document.title : "SKYGREEN";
  const pageUrl   = typeof window !== "undefined" ? window.location.href : "";
  const encoded   = encodeURIComponent(`${message}\n\nPage: ${pageTitle}\nURL: ${pageUrl}`.trim());

  const waHref = isMobile
    ? `whatsapp://send?phone=${phone}&text=${encoded}`
    : `https://wa.me/${phone}?text=${encoded}`;

  return (
    <div
      className="fixed z-[70] pointer-events-none"
      style={{
        bottom: `max(${bottom}px, env(safe-area-inset-bottom))`,
        right:  `max(${right}px, env(safe-area-inset-right))`,
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
        {/* Make the icon a block element to avoid baseline misalignment */}
        <FaWhatsapp className="block text-white" size={32} />
        {/* If you want slightly bigger on desktop: */}
        {/* <FaWhatsapp className="block text-white md:hidden" size={28} />
            <FaWhatsapp className="hidden md:block text-white" size={32} /> */}
      </a>
    </div>
  );
}
