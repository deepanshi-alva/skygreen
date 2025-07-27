import Image from "next/image";
import Hero from "../components/homepage/hero"
import Faq from "../components/homepage/faq"
import WhyUs from "../components/homepage/whyUs"
import Testimonial from "../components/homepage/testimonial";
import HiddenLayer from "../components/homepage/hiddenLayer";

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhyUs/>
      {/* <HiddenLayer/> */}
      <Testimonial/>
      <Faq/>
    </div>
  );
}
