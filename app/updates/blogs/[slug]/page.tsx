import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogById } from "@/lib/strapiData";

type Props = {
  params: { slug: string };
};

// ✅ Extract ID from slug (e.g. "42-solar-batteries-guide" → 42)
function extractId(slug: string) {
  const idPart = slug.split("-")[0];
  return parseInt(idPart, 10);
}

// ✅ SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = extractId(params.slug);
  const blog = await fetchBlogById(id);
  if (!blog) return { title: "Blog | SKYGREEN" };

  const fullImage =
    blog.image?.startsWith("http")
      ? blog.image
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.image}`;

  return {
    title: `${blog.title} | SKYGREEN`,
    description:
      blog.metaDescription ||
      blog.meta ||
      blog.excerpt ||
      "Latest SKYGREEN solar insights and technology updates.",
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: fullImage ? [{ url: fullImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: fullImage ? [fullImage] : [],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const id = extractId(params.slug);
  const blog = await fetchBlogById(id);
  if (!blog) notFound();

  // ✅ Safe image handling
  const imageSrc = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.image}`
    : null;

  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-16 px-6 md:px-10">
      <article className="max-w-4xl mx-auto">
        {/* ✅ Blog image */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-6 shadow-lg"
          />
        )}

        {/* ✅ Blog title */}
        <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-4">
          {blog.title}
        </h1>

        {/* ✅ Blog Meta Info */}
        <div className="text-sm text-white/60 mb-4">
          {blog.date && (
            <span>
              {new Date(blog.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
          {blog.tag && <> • {blog.tag}</>}
          {/* {blog.id && <> • ID: {blog.id}</>} */}
        </div>

        {/* ✅ Blog Meta (source / credit / author line) */}
        {blog.meta && (
          <p className="text-sm text-white/60 mb-5">Source: {blog.meta}</p>
        )}

        {/* ✅ Blog Content */}
        {(blog.excerpt) ? (
          <div
            className="prose prose-invert prose-green max-w-none"
            dangerouslySetInnerHTML={{
              __html: String(blog.excerpt),
            }}
          />
        ) : (
          <p className="text-white/70 leading-relaxed">
            No content available for this article.
          </p>
        )}

        {/* ✅ Back button */}
        <div className="mt-10">
          <a
            href="/updates#blogs"
            className="inline-flex items-center gap-2 text-green-400 hover:underline"
          >
            ← Back to Blogs
          </a>
        </div>
      </article>
    </main>
  );
}
