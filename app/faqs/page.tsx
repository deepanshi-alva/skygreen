import Hero from "@/components/faqs/hero" ;
import Form from "@/components/faqs/questions"

export default function ContactPage() {
  return (
    <>
      <Hero />
      <Form/>
    </>
  );
}

// app/faqs/page.tsx
// import type { Metadata } from "next";
// import Hero from "@/components/faqs/hero";
// import Form from "@/components/faqs/questions";

// /* ---------- SEO Metadata ---------- */
// export const metadata: Metadata = {
//   title:
//     "Solar FAQs | Common Questions About Solar Panels, Installation & Warranty | SKYGREEN",
//   description:
//     "Find clear answers to frequently asked questions about SKYGREEN solar panels, installation, warranty, subsidy, and performance. Learn everything you need to know before going solar.",
//   keywords: [
//     "solar FAQ",
//     "solar panel questions",
//     "solar installation India",
//     "solar warranty",
//     "solar subsidy FAQ",
//     "SKYGREEN support",
//     "solar maintenance tips",
//   ],
//   openGraph: {
//     type: "website",
//     url: "https://skygreen.in/faqs",
//     title:
//       "Solar FAQs | Common Questions About Solar Panels, Installation & Warranty | SKYGREEN",
//     description:
//       "Get detailed answers to common solar queries — from installation to performance, warranty, and government subsidy. Trusted by installers and homeowners across India.",
//     siteName: "SKYGREEN",
//     images: [
//       {
//         url: "https://skygreen.in/og-faqs.jpg", // ✅ put your OG banner in /public
//         width: 1200,
//         height: 630,
//         alt: "SKYGREEN Solar FAQs – Common Solar Questions",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title:
//       "Solar FAQs | Everything You Need to Know About Going Solar – SKYGREEN",
//     description:
//       "Explore answers to all your solar questions — installation, maintenance, subsidy, and performance. Learn from SKYGREEN’s experts.",
//     images: ["https://skygreen.in/og-faqs.jpg"],
//   },
//   alternates: {
//     canonical: "https://skygreen.in/faqs",
//   },
// };

// /* ---------- Page Component ---------- */
// export default function FaqPage() {
//   return (
//     <>
//       <Hero />
//       <Form />

//       {/* ✅ Structured Data (FAQPage) for Google Rich Results */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "FAQPage",
//             mainEntity: [
//               {
//                 "@type": "Question",
//                 name: "What is the efficiency of SKYGREEN solar panels?",
//                 acceptedAnswer: {
//                   "@type": "Answer",
//                   text: "SKYGREEN’s 575W N-Type TOPCon bifacial panels deliver around 22.2% efficiency with dual-glass durability for Indian climates.",
//                 },
//               },
//               {
//                 "@type": "Question",
//                 name: "Are SKYGREEN panels BIS certified?",
//                 acceptedAnswer: {
//                   "@type": "Answer",
//                   text: "Yes, our 575W panels are BIS registered under IS 14286:2010 / IEC 61215 & IEC 61730 standards with registration number R-41239518.",
//                 },
//               },
//               {
//                 "@type": "Question",
//                 name: "Do SKYGREEN panels qualify for government subsidy?",
//                 acceptedAnswer: {
//                   "@type": "Answer",
//                   text: "SKYGREEN panels are premium imported modules and are currently not part of the MNRE DCR subsidy list. However, they can be installed in open-access and non-DCR projects.",
//                 },
//               },
//               {
//                 "@type": "Question",
//                 name: "How do I clean and maintain my SKYGREEN solar panels?",
//                 acceptedAnswer: {
//                   "@type": "Answer",
//                   text: "Clean panels every 10–15 days with soft water and a microfiber cloth, avoid harsh chemicals, and schedule periodic professional checks for best performance.",
//                 },
//               },
//               {
//                 "@type": "Question",
//                 name: "How can I become a SKYGREEN distributor or partner?",
//                 acceptedAnswer: {
//                   "@type": "Answer",
//                   text: "Visit https://skygreen.in/join to apply for the SKYGREEN partnership program and become an authorized dealer or distributor in your region.",
//                 },
//               },
//             ],
//           }),
//         }}
//       />
//     </>
//   );
// }
