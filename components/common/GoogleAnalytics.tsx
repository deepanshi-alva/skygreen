"use client";

import Script from "next/script";

const MAIN_ID = "G-SYB1WYYLRK";  // Main property
const CALC_ID = "G-VKRX7CDDP8";  // Calculator property

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load GA script once */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MAIN_ID}`}
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${CALC_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Always send data to main property
          gtag('config', '${MAIN_ID}', { page_path: window.location.pathname });

          // Send to calculator property only if on calculator page or domain
          if (
            window.location.hostname.includes("solarcalculator.info") ||
            window.location.pathname.startsWith("/calculator")
          ) {
            gtag('config', '${CALC_ID}', { page_path: window.location.pathname });
          }
        `}
      </Script>
    </>
  );
}
