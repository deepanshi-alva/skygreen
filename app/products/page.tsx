// import HeroSection from "@/components/product/heroSection";
// import CoreAdvantages from "@/components/product/coreAdvantage";
// import DosDonts from "@/components/product/dosDonts";
// import ProductSpecCards from "@/components/product/productSpec";
// import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

// export default function ProductPage() {
//   return (
//     <>
//       <HeroSection />
//       <CoreAdvantages />
//       <ProductSpecCards />
//       <PerformanceAndBifacial />
//       <DosDonts />
//     </>
//   );
// }

// app/product/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";
import ProductSpecCards from "@/components/product/productSpec";
import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title:
    "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified India",
  description:
    "Explore SKYGREEN’s 575W N-Type TOPCon bifacial solar panel — 22.2% efficiency, 1500V DC system voltage, dual-glass design, and BIS certification. Engineered for superior performance and reliability across Indian climates.",
  keywords: [
    "SKYGREEN 575W",
    "N-Type TOPCon solar panel",
    "bifacial solar panel India",
    "BIS certified solar module",
    "high efficiency solar panel",
    "TOPCon solar module India",
    "dual glass solar panel",
    "1500V DC solar module",
    "imported solar panels India",
    "premium solar panels for EPC",
    "best solar panel brand India"
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com/products",
    title:
      "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified India",
    description:
      "Premium imported 575W N-Type TOPCon bifacial solar panel from SKYGREEN ENERGIES — 22.2% efficiency, dual-glass durability, and 5400 Pa load strength built for India.",
    siteName: "SKYGREEN ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-575w.jpg",
        width: 1200,
        height: 630,
        alt: "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified India",
    description:
      "Discover SKYGREEN 575W N-Type TOPCon solar panel — high efficiency, BIS certified, and engineered for Indian rooftops & industries.",
    images: ["https://skygreenenergies.com/og-575w.jpg"]
  },
  alternates: {
    canonical: "https://skygreenenergies.com/products"
  }
};


/* ---------- Page ---------- */
export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <ProductSpecCards />
      <PerformanceAndBifacial />
      <DosDonts />

      {/* ✅ JSON-LD Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "SKYGREEN GPT72M-575HC – 575W N-Type TOPCon Bifacial Solar Panel",
            image: ["https://skygreenenergies.com/og-575w.jpg"],
            description:
              "SKYGREEN's 575W N-Type TOPCon bifacial solar module offers 22.2 % efficiency, dual-glass durability, 1500 V DC rating, and BIS certification — ideal for residential, commercial, and industrial installations across India.",
            sku: "GPT72M-575HC",
            mpn: "GPT72M-575HC",
            gtin: "8908001115750",
            brand: {
              "@type": "Organization",
              name: "SKYGREEN ENERGIES",
              url: "https://skygreenenergies.com",
              logo: "https://skygreenenergies.com/logo.png"
            },
            manufacturer: {
              "@type": "Organization",
              name: "SKYGREEN ENERGIES",
              url: "https://skygreenenergies.com"
            },
            countryOfOrigin: "CN",
            category: "Solar Energy Equipment",
            additionalProperty: [
              { "@type": "PropertyValue", name: "Rated Power", value: "575 W" },
              { "@type": "PropertyValue", name: "Efficiency", value: "22.2 %" },
              { "@type": "PropertyValue", name: "Max System Voltage", value: "1500 V DC" },
              { "@type": "PropertyValue", name: "Dimensions", value: "2278 × 1134 × 30 mm" },
              { "@type": "PropertyValue", name: "Weight", value: "30 kg" },
              { "@type": "PropertyValue", name: "Load Test", value: "5400 Pa" },
              {
                "@type": "PropertyValue",
                name: "Standards",
                value: "IS 14286:2010 / IEC 61215 / IEC 61730 – BIS R-41239518"
              }
            ],
            offers: {
              "@type": "Offer",
              url: "https://skygreenenergies.com/products",
              priceCurrency: "INR",
              price: "17000",
              priceValidUntil: "2026-12-31",
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              seller: {
                "@type": "Organization",
                name: "SKYGREEN ENERGIES",
                url: "https://skygreenenergies.com"
              }
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "12"
            }
          })
        }}
      />

    </>
  );
}
