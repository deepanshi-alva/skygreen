import Image from "next/image";
import Hero from "../components/homepage/hero"
import Faq from "../components/homepage/faq"
import WhyUs from "../components/homepage/whyUs"

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhyUs/>
      <Faq/>
    </div>
  );
}
