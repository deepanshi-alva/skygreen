import Image from 'next/image'; // Use this if you're using Next.js
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-20 relative">
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            SOLAR PANELS <br /> FOR YOUR HOME
          </h2>
          <p className="text-gray-300 mb-6">
            High-quality solar solutions for a sustainable future
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-md">
            GET A QUOTE
          </Button>
        </div>

        {/* Image */}
        <div className="flex-1 relative">
          <Image
            src="/images/base_image.jpeg"
            alt="Solar Panel"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Advantages Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div>
          <div className="text-green-400 text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-lg mb-1">Efficiency</h3>
          <p className="text-gray-400 text-sm">
            Our solar panels offer high efficiency and performance
          </p>
        </div>
        <div>
          <div className="text-green-400 text-3xl mb-2">✔️</div>
          <h3 className="font-bold text-lg mb-1">Reliability</h3>
          <p className="text-gray-400 text-sm">
            We provide durable and dependable solar energy solutions
          </p>
        </div>
        <div>
          <div className="text-green-400 text-3xl mb-2">🌿</div>
          <h3 className="font-bold text-lg mb-1">Sustainability</h3>
          <p className="text-gray-400 text-sm">
            Power your home with clean, renewable energy
          </p>
        </div>
      </div>
    </section>
  );
}
