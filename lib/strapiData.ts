// lib/strapiData.ts
export type Item = {
  id: string | number;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  tag?: string;
  href?: string;
  meta?: string;
};

export type Data = {
  news: Item[];
  events: Item[];
  blogs: Item[];
};

// Helper to build image URL from Strapi response
function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (media?.url) return media.url.startsWith("http")
    ? media.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
  return undefined;
}

export async function fetchNewsEventsBlogs(): Promise<Data> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?populate=image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch Strapi data");
    const json = await res.json();

    // Normalize into Data format
    const news: Item[] = [];
    const events: Item[] = [];
    const blogs: Item[] = [];

    json.data.forEach((entry: any) => {
      const attrs = entry.attributes;
      const item: Item = {
        id: entry.id,
        title: attrs.title,
        excerpt: attrs.description,
        image: getMediaUrl(attrs.image?.data?.attributes),
        tag: attrs.tag,
        href: attrs.link_of_article,
        meta: attrs.meta,
        date: attrs.createdAt, // Strapi auto field
      };

      if (attrs.type === "News") news.push(item);
      else if (attrs.type === "Event") events.push(item);
      else if (attrs.type === "Blog") blogs.push(item);
    });

    return { news, events, blogs };
  } catch (err) {
    console.error(err);
    return { news: [], events: [], blogs: [] };
  }
}
