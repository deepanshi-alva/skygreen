// components/homepage/newsEventsBlogsSkeleton.tsx
export default function NewsEventsBlogsSkeleton() {
  return (
    <section className="w-full bg-black text-white pt-15">
      <div className="mx-auto max-w-7xl px-2 md:px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold leading-tight">
            Latest <span className="text-[#acfe53]">Updates & Insights</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            Loading content from the solar industry...
          </p>
        </div>

        {/* shimmer box */}
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-6 md:h-[520px]">
          <div className="bg-white/10 rounded-2xl h-20 md:h-full" />
          <div className="bg-white/10 rounded-3xl h-full" />
        </div>
      </div>
    </section>
  );
}
