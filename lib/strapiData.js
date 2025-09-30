// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchNewsEventsBlogs() {
  const res = await fetch(`${STRAPI_URL}/api/events?populate=image`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // if you use auth
    },
    next: { revalidate: 60 }, // ISR / caching
  });

  if (!res.ok) throw new Error("Failed to fetch from Strapi");

  const { data } = await res.json();

  // Map Strapi format → component format
  const formatted = data.map((item) => {
    const attrs = item.attributes;
    return {
      id: item.id,
      title: attrs.title,
      excerpt: attrs.description,
      image: attrs.image?.data
        ? STRAPI_URL + attrs.image.data.attributes.url
        : null,
      tag: attrs.tag,
      href: attrs.link_of_article,
      meta: attrs.meta,
      date: attrs.createdAt, // or attrs.updatedAt or add a custom field
      type: attrs.type?.toLowerCase(), // "news" | "blogs" | "events"
    };
  });

  // Group by type for your component
  return {
    news: formatted.filter((x) => x.type === "news"),
    blogs: formatted.filter((x) => x.type === "blog"),
    events: formatted.filter((x) => x.type === "event"),
  };
}
