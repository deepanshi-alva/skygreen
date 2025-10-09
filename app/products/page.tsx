import HeroSection from "@/components/product/heroSection";
import CoreAdvantages from "@/components/product/coreAdvantage";
import DosDonts from "@/components/product/dosDonts";
import ProductSpecCards from "@/components/product/productSpec";
import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

export default function ProductPage() {
  return (
    <>
      <HeroSection />
      <CoreAdvantages />
      <ProductSpecCards />
      <PerformanceAndBifacial />
      <DosDonts />
    </>
  );
}

// app/product/page.tsx
// import type { Metadata } from "next";
// import HeroSection from "@/components/product/heroSection";
// import CoreAdvantages from "@/components/product/coreAdvantage";
// import DosDonts from "@/components/product/dosDonts";
// import ProductSpecCards from "@/components/product/productSpec";
// import PerformanceAndBifacial from "@/components/product/performanceAndBifacial";

// /* ---------- SEO Metadata ---------- */
// export const metadata: Metadata = {
//   title:
//     "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified",
//   description:
//     "SKYGREEN’s 575W N-Type TOPCon bifacial solar module delivers world-class 22.2% efficiency, 1500V DC max system voltage, and superior reliability across Indian climates — BIS certified and performance tested up to 5400 Pa.",
//   keywords: [
//     "SKYGREEN 575W",
//     "N-Type TOPCon",
//     "bifacial solar panel",
//     "BIS certified solar module",
//     "high efficiency solar panel",
//     "TOPCon India",
//     "dual glass solar panel",
//     "1500V DC solar module",
//   ],
//   openGraph: {
//     type: "website",
//     url: "https://www.skygreenenergies.com/products",
//     title:
//       "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified",
//     description:
//       "Explore SKYGREEN's flagship 575W N-Type TOPCon bifacial solar panel — 22.2% efficiency, dual-glass design, and 5400 Pa load endurance for all Indian conditions.",
//     siteName: "SKYGREEN",
//     images: [
//       {
//         url: "https://www.skygreenenergies.com/og-575w.jpg", // replace with your product image URL
//         width: 1200,
//         height: 630,
//         alt: "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title:
//       "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel | High Efficiency | BIS Certified",
//     description:
//       "Discover SKYGREEN 575W N-Type TOPCon solar panel — engineered for durability, efficiency, and performance in every Indian climate.",
//     images: ["https://www.skygreenenergies.com/og-575w.jpg"],
//   },
//   alternates: {
//     canonical: "https://www.skygreenenergies.com/products",
//   },
// };

// /* ---------- Page ---------- */
// export default function ProductPage() {
//   return (
//     <>
//       <HeroSection />
//       <CoreAdvantages />
//       <ProductSpecCards />
//       <PerformanceAndBifacial />
//       <DosDonts />

//       {/* ✅ JSON-LD Schema for Google Rich Results */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org/",
//             "@type": "Product",
//             name: "SKYGREEN 575W N-Type TOPCon Bifacial Solar Panel",
//             image: ["https://www.skygreenenergies.com/og-575w.jpg"],
//             description:
//               "SKYGREEN's 575W N-Type TOPCon bifacial solar module offers 22.2% efficiency, dual-glass durability, and BIS certification for premium Indian installations.",
//             brand: {
//               "@type": "Brand",
//               name: "SKYGREEN",
//             },
//             sku: "GPT72M-575HC",
//             mpn: "GPT72M-575HC",
//             gtin: "8908001115750",
//             offers: {
//               "@type": "Offer",
//               url: "https://www.skygreenenergies.com/products",
//               priceCurrency: "INR",
//               price: "17000", // update if needed
//               availability: "https://schema.org/InStock",
//               itemCondition: "https://schema.org/NewCondition",
//               seller: {
//                 "@type": "Organization",
//                 name: "SKYGREEN",
//               },
//             },
//             additionalProperty: [
//               { "@type": "PropertyValue", name: "Rated Power", value: "575W" },
//               { "@type": "PropertyValue", name: "Efficiency", value: "22.2%" },
//               {
//                 "@type": "PropertyValue",
//                 name: "Max System Voltage",
//                 value: "1500V DC",
//               },
//               {
//                 "@type": "PropertyValue",
//                 name: "Dimensions",
//                 value: "2278x1134x30 mm",
//               },
//               { "@type": "PropertyValue", name: "Weight", value: "30 kg" },
//               { "@type": "PropertyValue", name: "Load Test", value: "5400 Pa" },
//               {
//                 "@type": "PropertyValue",
//                 name: "Standards",
//                 value: "IS 14286:2010 / IEC 61215 / IEC 61730",
//               },
//             ],
//           }),
//         }}
//       />
//     </>
//   );
// }
