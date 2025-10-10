// import Hero from "@/components/faqs/hero" ;
// import Form from "@/components/faqs/questions"

// export default function ContactPage() {
//   return (
//     <>
//       <Hero />
//       <Form/>
//     </>
//   );
// }

// app/faqs/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/faqs/hero";
import Form from "@/components/faqs/questions";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Solar FAQs India | Installation, Warranty & Subsidy Questions | SKYGREEN ENERGIES",
  description:
    "Find expert answers to common solar questions in India — from installation and BIS warranty to subsidy, maintenance, and performance. Trusted guide by SKYGREEN ENERGIES.",
  keywords: [
    "solar FAQ India",
    "solar questions and answers",
    "solar installation guide",
    "solar warranty India",
    "solar subsidy questions",
    "solar maintenance tips",
    "BIS certified solar panels",
    "SKYGREEN ENERGIES support",
    "solar panel help",
    "solar performance issues",
    "solar panels for home India",
    "solar installation problems and solutions"
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com/faqs",
    title:
      "Solar FAQs India | Installation, Warranty & Subsidy Explained | SKYGREEN ENERGIES",
    description:
      "Explore detailed answers to India’s most common solar questions — installation, subsidy, warranty, and performance. Learn from SKYGREEN ENERGIES experts.",
    siteName: "SKYGREEN ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-faqs.jpg",
        width: 1200,
        height: 630,
        alt: "SKYGREEN ENERGIES Solar FAQs – Installation, Warranty & Subsidy Questions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Solar FAQs India | Installation, Warranty & Subsidy Guide – SKYGREEN ENERGIES",
    description:
      "Get clear, trusted answers to all your solar panel questions — installation, BIS warranty, subsidy and maintenance — with SKYGREEN ENERGIES.",
    images: ["https://skygreenenergies.com/og-faqs.jpg"]
  },
  alternates: {
    canonical: "https://skygreenenergies.com/faqs"
  }
};

/* ---------- Page Component ---------- */
export default function FaqPage() {
  return (
    <>
      <Hero />
      <Form />

      {/* ✅ Structured Data (FAQPage) for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the benefits of installing SKYGREEN solar panels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SKYGREEN solar panels deliver up to 22.2% efficiency using N-Type TOPCon bifacial technology, providing maximum savings, long-term reliability, and BIS-certified safety for Indian climates."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any government subsidy for solar installation in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, residential users can claim central and state subsidies under MNRE’s 'PM Surya Ghar Muft Bijli Yojana'. SKYGREEN assists customers with the application and documentation process."
                }
              },
              {
                "@type": "Question",
                "name": "What warranty does SKYGREEN offer on its solar panels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All SKYGREEN panels come with a 12-year product warranty and 25-year linear performance warranty, in compliance with BIS and IEC standards."
                }
              },
              {
                "@type": "Question",
                "name": "How often should solar panels be cleaned or maintained?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Panels should be cleaned once every 2–3 weeks using a soft brush or clean water. SKYGREEN recommends biannual inspections for optimal performance."
                }
              }
            ]
          })
        }}
      />

    </>
  );
}
