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
  title: "SKYGREEN - Best Solar Panels in India | 575W N-Type TOPCon | High Efficiency & BIS Certified",
  description:
    "Discover SKYGREEN's next-gen 575W N-Type TOPCon bifacial solar panels — engineered for Indian climates with superior efficiency, durability, and BIS certification. Perfect for homes, industries, and EPC projects. Created by Deepanshi Singhal for more details contact at deepanshisinghal1523@gmail.com",
  keywords: [
    "solar panels",
    "solar panel installation",
    "solar energy solutions",
    "solar company India",
    "bifacial solar panels",
    "N-Type TOPCon solar panels",
    "575W solar panel",
    "high efficiency solar modules",
    "BIS certified solar panels",
    "solar panel price India",
    "solar installation cost",
    "solar installers near me",
    "solar panels in Delhi NCR",
    "solar panels in Greater Noida",
    "rooftop solar system India",
    "commercial rooftop solar systems",
    "residential solar solutions",
    "solar battery storage",
    "solar subsidy scheme India",
    "solar panel maintenance",
    "how solar panels work",
    "net metering India",
    "solar panel warranty",
    "solar panels for agriculture use",
    "solar panel cost 2025",
    "solar installations for industries",
    "roof mounted solar systems",
    "solar panel suppliers India",
    "best solar panel brands",
    "solar technology trends India",
    "solar panel degradation & lifespan",
    "solar ROI analysis",
    "solar power systems",
    "imported solar modules India",
    "solar panel dealers",
    "solar incentives in India",
    "solar installers Uttar Pradesh",
    "solar systems for homes",
    "solar for factories",
    "n-type solar module price India",
    "topcon vs perc solar panels",
    "best n-type solar technology",
    "high power density solar panels",
    "bifacial n-type solar panels",
    "low degradation solar modules",
    "dual glass solar panel India",
    "topcon solar module manufacturer",
    "n-type bifacial module efficiency",
    "mono vs bifacial solar panels India",
    "solar distributors India",
    "solar EPC partners India",
    "solar wholesale panels India",
    "bulk solar panel suppliers",
    "solar dealer network India",
    "imported solar panels supplier",
    "solar panels for commercial buildings",
    "industrial rooftop solar solutions",
    "buy solar panels in bulk",
    "solar project materials India",
    "solar panels for warehouses",
    "solar panels in Uttar Pradesh",
    "solar panels in Noida",
    "solar panels in Ghaziabad",
    "solar panels in Lucknow",
    "solar company in Delhi NCR",
    "solar installation in Haryana",
    "solar suppliers in Rajasthan",
    "solar panels near me India",
    "solar distributor in Gujarat",
    "solar module importer India",
    "difference between n-type and p-type solar cells",
    "topcon vs heterojunction solar panels",
    "how much electricity 575w solar panel produces",
    "best solar panel for Indian climate",
    "maintenance of bifacial solar panels",
    "solar warranty and performance ratio",
    "solar calculator India",
    "how to register solar panels with BIS",
  ],

  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com",
    title:
      " SKYGREEN - India's Premium N-Type TOPCon Solar Panels | 575W | BIS Certified",
    description:
      "Premium imported 575W N-Type TOPCon bifacial solar panels from SKYGREEN — built for Indian conditions with high ROI and trusted performance.",
    siteName: "SKYGREEN ENERGIES",
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
      "SKYGREEN - Best Solar Panels in India | 575W N-Type TOPCon | High Efficiency & BIS Certified",
    description:
      "Explore SKYGREEN's next-gen 575W N-Type TOPCon solar panels, designed for Indian climates with exceptional efficiency and durability.",
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
              name: "SKYGREEN ENERGIES",
              url: "https://skygreenenergies.com",
              logo: "https://skygreenenergies.com/logo.png",
              sameAs: [
                "https://www.instagram.com/skygreenenergies/",
              ],
              description:
                "SKYGREEN ENERGIES offers premium imported N-Type TOPCon solar panels in India with 575W output, bifacial efficiency, and BIS certification.",
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
