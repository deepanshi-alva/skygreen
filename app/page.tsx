import Hero from "../components/homepage/hero";
import WhyUs from "../components/homepage/whyUs";
import CertificateCarousel from "@/components/homepage/certificates";
import Climate from "../components/homepage/climate";
import PartOfSkygreen from "@/components/homepage/partOfSkyGreen/PartOfSkygree";
import NewsEventsBlogs from "@/components/homepage/newsEventsBlogs";
import NewsEventsBlogsSkeleton from "@/components/homepage/newsEventsBlogsSkeleton";
import Testimonial from "../components/homepage/testimonial";
import WhySkyGreen from "@/components/homepage/whyShop";
import { fetchNewsEventsBlogs } from "@/lib/strapiData";
import { Suspense } from "react";

export default async function Home() {
  const dataPromise = fetchNewsEventsBlogs();
  // console.log("this is the homepage data", dataPromise);
  return (
    <div>
      <Hero />
      <WhyUs />
      <CertificateCarousel />
      <Climate />
      <PartOfSkygreen />
      <Suspense fallback={<NewsEventsBlogsSkeleton />}>
        <NewsEventsBlogs
          data={await dataPromise}
          initialTab="news"
          autoplayMs={5000}
        />
      </Suspense>
      <Testimonial />
      <WhySkyGreen />
    </div>
  );
}
