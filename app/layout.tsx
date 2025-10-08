import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import GoogleAnalyticsEvents from "@/components/common/GAEvents";
import { Providers } from "./provider"; // 👈 new
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Sky Green",
//   description:
//     "Created by Deepanshi Singhal for more details contact at deepanshisinghal1523@gmail.com",
// };

export const metadata: Metadata = {
  title: "SKYGREEN - Premium N-Type TOPCon Solar Panels | 575W | BIS Certified",
  description:
    "SKYGREEN brings high-efficiency 575W N-Type TOPCon bifacial solar panels for India — durable, BIS-certified, and engineered for all Indian climates. Boost your solar ROI with world-class performance. Created by Deepanshi Singhal for more details contact at deepanshisinghal1523@gmail.com",
  keywords: [
    "solar panels India",
    "N-Type TOPCon",
    "bifacial solar module",
    "SKYGREEN 575W",
    "BIS certified solar panels",
    "high efficiency panels",
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com",
    title:
      "SKYGREEN - Premium N-Type TOPCon Solar Panels | 575W | BIS Certified",
    description:
      "High-performance 575W N-Type TOPCon bifacial solar panels for India. Superior reliability, durability, and ROI — trusted by EPCs and distributors.",
    siteName: "SKYGREE ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-image.jpg", // ✅ replace with your actual hero image URL
        width: 1200,
        height: 630,
        alt: "SKYGREEN 575W N-Type TOPCon Solar Panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SKYGREEN – Premium N-Type TOPCon Solar Panels | 575W | BIS Certified",
    description:
      "Explore SKYGREEN’s next-gen 575W N-Type TOPCon solar panels, designed for Indian climates with exceptional efficiency and durability.",
    images: ["https://skygreenenergies.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://skygreenenergies.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href="https://skygreenenergies.com" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <Header />
          {children}
          <GoogleAnalytics />
          <GoogleAnalyticsEvents />
          <CookieConsent />
          <Footer />
          <WhatsAppWidget
            message="Hi SKYGREEN Team, I want details about the new 575W N-Type TOPCon Panels availability."
            bottom={24}
            right={24}
          />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SKYGREEN",
              url: "https://skygreenenergies.com",
              logo: "https://skygreenenergies.com/logo.png",
              sameAs: [
                "https://www.instagram.com/skygreen_solar",
                "https://www.linkedin.com/company/skygreen",
              ],
              description:
                "SKYGREEN offers premium imported N-Type TOPCon solar panels in India with 575W output, bifacial efficiency, and BIS certification.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9811223252",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
