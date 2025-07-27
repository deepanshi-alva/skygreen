// components/HiddenLayerSection.jsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import layerData from "../../lib/layerData"; // we'll create this next

export default function HiddenLayerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-xl h-[700px]">
        {layerData.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.3, duration: 0.6 },
              },
            }}
            className="absolute w-full h-24 flex items-center justify-center"
            style={{
              top: `${index * 60}px`,
              zIndex: layerData.length - index,
            }}
          >
            <Image
              src={layer.image}
              alt={layer.name}
              width={400}
              height={100}
              className="object-contain rounded shadow-lg"
            />
            <span className="absolute left-full ml-4 text-sm">{layer.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
