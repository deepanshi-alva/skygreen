import Hero from "../components/homepage/hero";
// import Faq from "../components/homepage/faq";
import WhyUs from "../components/homepage/whyUs";
import Testimonial from "../components/homepage/testimonial";
// import WhySkygreen from "../components/homepage/whySkyGreen";
import Climate from "../components/homepage/climate";
// import HiddenLayerSection from "@/components/homepage/hiddenLayer";
import NewsEventsBlogs from "@/components/homepage/newsEventsBlogs";
import { mockData } from "@/lib/mockData";
import CertificateCarousel from "@/components/homepage/certificates";
import PartOfSkygreen from "@/components/homepage/partOfSkyGreen/PartOfSkygree";
import WhySkyGreen from "@/components/homepage/whyShop"

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <WhySkygreen/> */}
      <WhyUs />
      <CertificateCarousel/>
      <Climate />
      {/* <HiddenLayerSection /> */}
      <PartOfSkygreen/>
      <NewsEventsBlogs data={mockData} initialTab="news" autoplayMs={5000} />
      <Testimonial />
      <WhySkyGreen/>
      {/* <Faq /> */}
    </div>
  );
}
