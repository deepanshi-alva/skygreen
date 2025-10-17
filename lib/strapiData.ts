// lib/strapiData.ts
export type Item = {
  id: string | number;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  start_date?: string;
  tag?: string;
  href?: string;
  meta?: string;
  document?: string;
  button_text?: string;
};

export type Data = {
  news: Item[];
  events: Item[];
  blogs: Item[];
};

// Helper to build image URL from Strapi response
function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (media?.url)
    return media.url.startsWith("http")
      ? media.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
  return undefined;
}

export async function fetchNewsEventsBlogs(): Promise<Data> {
  try {
    const pageSize = 100;
    let page = 1;
    let totalPages = 1;

    const allItems: any[] = [];

    // ✅ Fetch all data (with image + additional_media populated)
    while (page <= totalPages) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?populate[image]=*&populate[additional_media]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
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

    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore time, compare only date

    allItems.forEach((entry: any) => {
      const attrs = entry.attributes;
      const startDate = attrs.start_date ? new Date(attrs.start_date) : null;

      // ✅ Build object
      const item: Item = {
        id: entry.id,
        title: attrs.title,
        excerpt: attrs.description,
        image: getMediaUrl(attrs.image?.data?.attributes),
        tag: attrs.tag,
        href: attrs.link_of_article,
        meta: attrs.meta,
        start_date: attrs.start_date,
        date: attrs.start_date || attrs.createdAt,
        document: getMediaUrl(attrs.additional_media?.data?.attributes),
        button_text: attrs.button_text,
      };

      // ✅ Event filtering: only include events whose start_date >= today
      if (attrs.type === "Event") {
        if (!startDate || startDate < today) return; // skip expired
        events.push(item);
      } else if (attrs.type === "News") {
        news.push(item);
      } else if (attrs.type === "Blog") {
        blogs.push(item);
      }
    });

    // ✅ Sort
    events.sort(
      (a, b) =>
        new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
    );
    news.sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
    blogs.sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );

    console.log(
      "Fetched filtered News, Events, Blogs:",
      news.length,
      events.length,
      blogs.length
    );

    return { news, events, blogs };
  } catch (err) {
    console.error(err);
    return { news: [], events: [], blogs: [] };
  }
}

export async function fetchBlogById(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events/${id}?populate=*`
    );
    const json = await res.json();
    if (!json.data) return null;
    const b = json.data.attributes;
    console.log("these are the attributes", b);
    return {
      id: json.data.id,
      title: b.title,
      excerpt: b.description,
      image: b.image?.data?.attributes?.url,
      tag: b.tag,
      date: b.publishedAt,
      metaDescription: b.metaDescription,
      meta: b.meta,
      document: getMediaUrl(b.additional_media?.data?.attributes),
        button_text: b.button_text,
    };
  } catch (e) {
    console.error("Error fetching blog:", e);
    return null;
  }
}
