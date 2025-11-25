// // app/updates/page.tsx
// import { fetchNewsEventsBlogs } from "@/lib/strapiData";
// import UpdatesPage from "@/components/updates/UpdatesPage";

// export default async function Updates() {
//   const data = await fetchNewsEventsBlogs(); // fetch from Strapi
//   // console.log("this is the data", data)
//   return <UpdatesPage data={data} />;
// }

// app/updates/page.tsx
import type { Metadata } from "next";
import { fetchNewsEventsBlogs } from "@/lib/strapiData";
import UpdatesPage from "@/components/updates/UpdatesPage";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Solar News, Blogs & Events | Latest India & Global Updates | SKYGREEN ENERGIES",
  description:
    "Get the latest solar news, government policies, and technology trends from SKYGREEN ENERGIES. Stay informed with India & global renewable energy updates, blogs, and events.",
  keywords: [
    "solar news",
    "solar news india",
    "solar energy news",
    "renewable energy news",
    "solar policy updates",
    "solar government schemes",
    "solar tenders india",
    "solar events india",
    "solar technology updates",
    "solar blogs india",
    "latest solar updates",
    "india renewable energy news",
    "global solar news",
    "skygreen solar news",
    "skygreen energies blogs",
    "Haryana Accelerates Clean Energy with New Biomass Plant & Strong Solar Momentum"
  ],
  openGraph: {
    type: "website",
    url: "https://skygreenenergies.com/updates",
    title: "Solar News, Blogs & Events | India & Global Solar Updates – SKYGREEN ENERGIES",
    description:
      "Stay updated with SKYGREEN ENERGIES — the latest solar news, events, and blogs from India and worldwide. Covering solar policy, technology, and renewable energy growth.",
    siteName: "SKYGREEN ENERGIES",
    images: [
      {
        url: "https://skygreenenergies.com/og-updates.jpg",
        width: 1200,
        height: 630,
        alt: "SKYGREEN ENERGIES – Solar News and Updates"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar News, Blogs & Events | India & Global Updates – SKYGREEN ENERGIES",
    description:
      "Follow SKYGREEN ENERGIES for the latest solar energy news, policy updates, and technology blogs from India and around the world.",
    images: ["https://skygreenenergies.com/og-updates.jpg"]
  },
  alternates: {
    canonical: "https://skygreenenergies.com/updates"
  }
};


/* ---------- Page Component ---------- */
export default async function Updates() {
  const data = await fetchNewsEventsBlogs();

  return (
    <>
      <UpdatesPage data={data} />

      {/* ✅ Structured Data (JSON-LD) for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "SKYGREEN ENERGIES - Solar News, Events & Blogs",
            url: "https://skygreenenergies.com/updates",
            description:
              "Explore SKYGREEN ENERGIES curated collection of solar news, blogs, and events — covering renewable energy, policy updates, and technology insights from India and across the globe.",
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
              ]
            },
            hasPart:
              data?.news?.map((item: any) => ({
                "@type": "NewsArticle",
                headline: item.title,
                datePublished: item.date || new Date().toISOString(),
                dateModified: item.updatedAt || item.date || new Date().toISOString(),
                url: `https://skygreenenergies.com/updates/${item.slug || ""}`,
                description:
                  item.description?.slice(0, 160) ||
                  "Latest solar energy news, technology insights, and renewable trends from SKYGREEN ENERGIES.",
                image: item.image?.url
                  ? item.image.url
                  : "https://skygreenenergies.com/og-updates.jpg",
                author: {
                  "@type": "Organization",
                  name: "SKYGREEN ENERGIES"
                },
                publisher: {
                  "@type": "Organization",
                  name: "SKYGREEN ENERGIES",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://skygreenenergies.com/logo.png"
                  }
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://skygreenenergies.com/updates/${item.slug || ""}`
                }
              })) || []
          })
        }}
      />
    </>
  );
}
