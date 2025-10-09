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
  title: "Contact SKYGREEN | Talk to Our Solar Experts | Request a Callback",
  description:
    "Get in touch with SKYGREEN for solar panel inquiries, dealer partnerships, or customer support. Call, message, or fill out the contact form to reach our solar experts today.",
  keywords: [
    "contact SKYGREEN",
    "solar support India",
    "solar inquiry",
    "contact solar panel company",
    "SKYGREEN customer service",
    "solar dealer inquiry",
    "solar expert consultation",
  ],
  openGraph: {
    type: "website",
    url: "https://skygreen.in/contact",
    title: "Contact SKYGREEN | Talk to Our Solar Experts | Request a Callback",
    description:
      "Reach out to SKYGREEN for any product, partnership, or support inquiries. We're here to help you choose the best solar solution for your needs.",
    siteName: "SKYGREEN",
    images: [
      {
        url: "https://skygreen.in/og-contact.jpg", // ✅ add in /public
        width: 1200,
        height: 630,
        alt: "Contact SKYGREEN – Solar Experts in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SKYGREEN | India's Premium Solar Brand",
    description:
      "Call or message SKYGREEN for premium solar panels, dealer programs, and support.",
    images: ["https://skygreen.in/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://skygreen.in/contact",
  },
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
            name: "Contact SKYGREEN",
            url: "https://skygreen.in/contact",
            description:
              "Reach SKYGREEN’s team for solar inquiries, partnerships, or support assistance across India.",
            publisher: {
              "@type": "Organization",
              name: "SKYGREEN",
              url: "https://skygreen.in",
              logo: {
                "@type": "ImageObject",
                url: "https://skygreen.in/logo.png",
              },
              sameAs: [
                "https://www.instagram.com/skygreen_solar",
                "https://www.linkedin.com/company/skygreen",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-XXXXXXXXXX",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "sales@skygreen.in",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
