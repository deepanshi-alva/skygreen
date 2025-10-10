// import Hero from "@/components/contact/hero" ;
// import Form from "@/components/contact/contactform"

// export default function ContactPage() {
//   return (
//     <>
//       <Hero />
//       <Form/>
//     </>
//   );
// }

// app/contact/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/contact/hero";
import Form from "@/components/contact/contactform";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Contact SKYGREEN ENERGIES | Talk to Our Solar Experts | Request a Callback",
  description:
    "Contact SKYGREEN ENERGIES for solar panel inquiries, dealership partnerships, or customer support. Call, message, or fill out our form to connect with India's premium solar experts today.",
  keywords: [
    "contact SKYGREEN ENERGIES",
    "solar customer service India",
    "solar inquiry",
    "solar dealer support",
    "contact solar company India",
    "SKYGREEN ENERGIES contact",
    "solar expert consultation",
    "solar panel customer care",
    "solar helpline India"
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com/contact",
    title:
      "Contact SKYGREEN ENERGIES | Talk to Our Solar Experts | Request a Callback",
    description:
      "Reach out to SKYGREEN ENERGIES for any solar product, partnership, or customer support inquiries. We'll help you find the perfect solar solution.",
    siteName: "SKYGREEN ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SKYGREEN ENERGIES - Solar Experts in India"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SKYGREEN ENERGIES | India's Premium Solar Brand",
    description:
      "Call or message SKYGREEN ENERGIES for solar panels, dealer programs, and customer support across India.",
    images: ["https://skygreenenergies.com/og-contact.jpg"]
  },
  alternates: {
    canonical: "https://skygreenenergies.com/contact"
  }
};


/* ---------- Page Component ---------- */
export default function ContactPage() {
  return (
    <>
      <Hero />
      <Form />

      {/* ✅ JSON-LD Structured Data for ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://skygreenenergies.com/contact#contact",
            name: "Contact SKYGREEN ENERGIES",
            url: "https://skygreenenergies.com/contact",
            description:
              "Get in touch with SKYGREEN ENERGIES for solar product inquiries, partnerships, or customer support across India.",
            publisher: {
              "@type": "Organization",
              "@id": "https://skygreenenergies.com/#organization",
              name: "SKYGREEN ENERGIES",
              url: "https://skygreenenergies.com",
              logo: {
                "@type": "ImageObject",
                url: "https://skygreenenergies.com/logo.png"
              },
              sameAs: [
                "https://www.instagram.com/skygreen_solar",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: "+91-9811223252",
                  email: "contact@skygreenenergies.com",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  telephone: "+91-9811223252",
                  email: "contact@skygreenenergies.com",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"]
                }
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: " D-247/31, Sector-63, Noida, Uttar Pradesh",
                addressLocality: "Greater Noida",
                addressRegion: "UP",
                postalCode: "201301",
                addressCountry: "IN"
              }
            }
          })
        }}
      />

    </>
  );
}
