import Image from "next/image";
import Hero from "../components/homepage/hero";
import Faq from "../components/homepage/faq";
import WhyUs from "../components/homepage/whyUs";
import Testimonial from "../components/homepage/testimonial";
import WhySkygreen from "../components/homepage/whySkyGreen";
import Climate from "../components/homepage/climate";
// import HiddenLayerSection from "@/components/homepage/hiddenLayer";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <WhySkygreen/> */}
      <WhyUs />
      <Climate />
      {/* <HiddenLayerSection /> */}
      <Testimonial />
      <Faq />
    </div>
  );
}
