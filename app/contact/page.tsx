import dynamic from "next/dynamic";
import Hero from "@/components/contact/hero" ;
import Form from "@/components/contact/contactform"


export default function ContactPage() {
  return (
    <>
      <Hero />
      <Form/>
    </>
  );
}
