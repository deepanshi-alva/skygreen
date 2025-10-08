// // app/updates/page.tsx
// import { fetchNewsEventsBlogs } from "@/lib/strapiData";
// import UpdatesPage from "@/components/updates/UpdatesPage";

// export default async function Updates() {
//   const data = await fetchNewsEventsBlogs(); // fetch from Strapi
//   console.log("this is the data", data)
//   return <UpdatesPage data={data} />;
// }

// app/updates/page.tsx
import type { Metadata } from "next";
import { fetchNewsEventsBlogs } from "@/lib/strapiData";
import UpdatesPage from "@/components/updates/UpdatesPage";

/* ---------- Static SEO Metadata ---------- */
export const metadata: Metadata = {
  title:
    "Solar Industry News, Events & Blogs | India & Global Updates | SKYGREEN",
  description:
    "Stay updated with the latest solar industry news, government policies, events, and technology trends. Read expert blogs and insights powered by SKYGREEN.",
  keywords: [
    "solar news",
    "solar energy updates",
    "renewable energy blogs",
    "solar events India",
    "solar policy news",
    "solar technology",
    "SKYGREEN solar blog",
  ],
  openGraph: {
    type: "website",
    url: "https://skygreen.in/updates",
    title:
      "Solar Industry News, Events & Blogs | India & Global Updates | SKYGREEN",
    description:
      "Get the latest solar news, events, and expert blogs from SKYGREEN — covering India, global market insights, government notifications, and solar technology trends.",
    siteName: "SKYGREEN",
    images: [
      {
        url: "https://skygreen.in/og-updates.jpg", // ✅ replace with your own OG image
        width: 1200,
        height: 630,
        alt: "SKYGREEN Solar News and Updates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Solar News, Events & Blogs | Latest India & Global Updates – SKYGREEN",
    description:
      "Follow SKYGREEN for the latest solar energy news, events, and in-depth blogs about India’s renewable future.",
    images: ["https://skygreen.in/og-updates.jpg"],
  },
  alternates: {
    canonical: "https://skygreen.in/updates",
  },
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
            name: "SKYGREEN Solar News, Events & Blogs",
            url: "https://skygreen.in/updates",
            description:
              "Explore SKYGREEN’s curated collection of solar news, events, and blogs featuring Indian and global renewable energy updates.",
            publisher: {
              "@type": "Organization",
              name: "SKYGREEN",
              logo: {
                "@type": "ImageObject",
                url: "https://skygreen.in/logo.png",
              },
            },
            hasPart:
              data?.news?.map((item: any) => ({
                "@type": "NewsArticle",
                headline: item.title,
                datePublished: item.date,
                url: `https://skygreen.in/updates/${item.slug || ""}`,
                description: item.description?.slice(0, 160),
                image: item.image?.url
                  ? item.image.url
                  : "https://skygreen.in/og-updates.jpg",
                author: {
                  "@type": "Organization",
                  name: "SKYGREEN",
                },
              })) || [],
          }),
        }}
      />
    </>
  );
}
