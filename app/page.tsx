import Image from "next/image";
import Hero from "../components/homepage/hero"
import Faq from "../components/homepage/faq"
// import FAQ from "../components/homepage/faq"

export default function Home() {
  return (
    <div>
      <Hero/>
      <Faq/>
      {/* <FAQ/> */}
    </div>
  );
}
