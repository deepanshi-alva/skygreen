import Hero from "@/components/join/hero" ;
import Form from "@/components/join/contactform"

export default function ContactPage() {
  return (
    <>
      <Hero />
      <Form/>
    </>
  );
}

// app/join/page.tsx
// import type { Metadata } from "next";
// import Hero from "@/components/join/hero";
// import Form from "@/components/join/contactform";

// /* ---------- SEO Metadata ---------- */
// export const metadata: Metadata = {
//   title:
//     "Join the SKYGREEN Family | Become a Solar Partner, Dealer or Distributor",
//   description:
//     "Partner with SKYGREEN and become part of India’s fastest-growing premium solar network. Join as a dealer, distributor, or installation partner — access top-tier 575W N-Type TOPCon panels, support, and rewards.",
//   keywords: [
//     "join SKYGREEN",
//     "solar dealer India",
//     "solar distributor program",
//     "solar partnership",
//     "solar business opportunity",
//     "become SKYGREEN partner",
//     "join solar company",
//   ],
//   openGraph: {
//     type: "website",
//     url: "https://skygreen.in/join",
//     title:
//       "Join the SKYGREEN Family | Dealer & Distributor Partnership Program",
//     description:
//       "Grow your solar business with SKYGREEN. Apply online to become an authorized partner or distributor today.",
//     siteName: "SKYGREEN",
//     images: [
//       {
//         url: "https://skygreen.in/og-join.jpg", // ✅ place your OG image in /public
//         width: 1200,
//         height: 630,
//         alt: "Join SKYGREEN – Dealer & Distributor Network",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title:
//       "Join the SKYGREEN Family | Dealer & Distributor Partnership Program",
//     description:
//       "Partner with SKYGREEN to bring world-class N-Type TOPCon solar panels to your region.",
//     images: ["https://skygreen.in/og-join.jpg"],
//   },
//   alternates: {
//     canonical: "https://skygreen.in/join",
//   },
// };

// /* ---------- Page Component ---------- */
// export default function ContactPage() {
//   return (
//     <>
//       <Hero />
//       <Form />

//       {/* ✅ Structured Data (JSON-LD) */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ContactPage",
//             name: "Join the SKYGREEN Family",
//             url: "https://skygreen.in/join",
//             description:
//               "Apply online to become an official SKYGREEN partner, dealer, or distributor in India.",
//             publisher: {
//               "@type": "Organization",
//               name: "SKYGREEN",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://skygreen.in/logo.png",
//               },
//               sameAs: [
//                 "https://www.instagram.com/skygreen_solar",
//                 "https://www.linkedin.com/company/skygreen",
//               ],
//               contactPoint: {
//                 "@type": "ContactPoint",
//                 contactType: "sales",
//                 telephone: "+91-XXXXXXXXXX",
//                 areaServed: "IN",
//                 availableLanguage: ["English", "Hindi"],
//               },
//             },
//           }),
//         }}
//       />
//     </>
//   );
// }
