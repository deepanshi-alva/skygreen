// import Hero from "@/components/join/hero" ;
// import Form from "@/components/join/contactform"

// export default function ContactPage() {
//   return (
//     <>
//       <Hero />
//       <Form/>
//     </>
//   );
// }

// app/join/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/join/hero";
import Form from "@/components/join/contactform";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title:
    "Join the SKYGREEN Family | Become a Solar Partner, Dealer or Distributor",
  description:
    "Partner with SKYGREEN ENERGIES and become part of India’s fastest-growing premium solar network. Join as a dealer, distributor, or installation partner — access top-tier 575W N-Type TOPCon panels, marketing support, and rewards.",
  keywords: [
    "join SKYGREEN ENERGIES",
    "solar dealer India",
    "solar distributor program",
    "solar partnership India",
    "become SKYGREEN partner",
    "solar business opportunity India",
    "join solar company",
    "solar dealership registration",
    "solar franchise opportunity India"
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com/join",
    title:
      "Join the SKYGREEN Family | Dealer & Distributor Partnership Program",
    description:
      "Grow your solar business with SKYGREEN ENERGIES. Apply online to become an authorized dealer, distributor, or installation partner today.",
    siteName: "SKYGREEN ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-join.jpg",
        width: 1200,
        height: 630,
        alt: "Join SKYGREEN ENERGIES – Dealer & Distributor Network"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Join the SKYGREEN Family | Dealer & Distributor Partnership Program – SKYGREEN ENERGIES",
    description:
      "Partner with SKYGREEN ENERGIES to bring premium N-Type TOPCon solar panels to your region. Join India's fastest-growing solar network today.",
    images: ["https://skygreenenergies.com/og-join.jpg"]
  },
  alternates: {
    canonical: "https://skygreenenergies.com/join"
  }
};


/* ---------- Page Component ---------- */
export default function ContactPage() {
  return (
    <>
      <Hero />
      <Form />

      {/* ✅ Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Join the SKYGREEN Family – Dealer & Distributor Program",
            url: "https://skygreenenergies.com/join",
            description:
              "Apply online to become an authorized SKYGREEN ENERGIES dealer, distributor, or installation partner. Access top-tier 575W N-Type TOPCon panels, marketing materials, and nationwide support.",
            publisher: {
              "@type": "Organization",
              name: "SKYGREEN ENERGIES",
              url: "https://skygreenenergies.com",
              logo: {
                "@type": "ImageObject",
                url: "https://skygreenenergies.com/logo.png"
              },
              sameAs: [
                "https://www.instagram.com/skygreen_solar",
                "https://www.linkedin.com/company/skygreen"
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  telephone: "+91-9811223252",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"]
                }
              ]
            },
            mainEntity: {
              "@type": "Offer",
              name: "SKYGREEN Partnership Program",
              url: "https://skygreenenergies.com/join",
              description:
                "SKYGREEN ENERGIES offers partnership opportunities for solar dealers, distributors, and installers across India. Get premium N-Type TOPCon panels, branding support, and nationwide logistics.",
              eligibleRegion: {
                "@type": "Country",
                name: "India"
              },
              priceCurrency: "INR",
              price: "0",
              availability: "https://schema.org/InStock",
              category: "BusinessOpportunity"
            }
          })
        }}
      />
    </>
  );
}
