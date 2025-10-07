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
    const pageSize = 100; // you can tweak this
    let page = 1;
    let totalPages = 1;

    const allItems: any[] = [];

    while (page <= totalPages) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch Strapi data");

      const json = await res.json();

      allItems.push(...json.data);
      totalPages = json.meta.pagination.pageCount;
      page++;
    }

    const news: Item[] = [];
    const events: Item[] = [];
    const blogs: Item[] = [];

    allItems.forEach((entry: any) => {
      const attrs = entry.attributes;
      const item: Item = {
        id: entry.id,
        title: attrs.title,
        excerpt: attrs.description,
        image: getMediaUrl(attrs.image?.data?.attributes),
        tag: attrs.tag,
        href: attrs.link_of_article,
        meta: attrs.meta,
        date: attrs.start_date || attrs.createdAt,
      };

      if (attrs.type === "News") news.push(item);
      else if (attrs.type === "Event") events.push(item);
      else if (attrs.type === "Blog") blogs.push(item);
    });

    events.sort((a, b) => new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime());
    news.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());
    blogs.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());

    console.log("Fetched all News, Events, Blogs:", news.length, events.length, blogs.length);

    return { news, events, blogs };
  } catch (err) {
    console.error(err);
    return { news: [], events: [], blogs: [] };
  }
}
