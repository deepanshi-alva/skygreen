"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    // @ts-expect-error
    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
