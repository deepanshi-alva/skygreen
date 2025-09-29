"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function GAEventsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const url = pathname + (searchParams?.toString() || "");
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", "G-SYB1WYYLRK", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GAEvents() {
  return (
    <Suspense fallback={null}>
      <GAEventsInner />
    </Suspense>
  );
}
