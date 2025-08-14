'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Snowflake,
  CloudRain,
  Sun,
  CloudHail,
  Wind,
} from 'lucide-react';

const seasons = [
  {
    key: 'rainy',
    label: 'Rainy',
    image: '/images/climate/rainy.png',
    description:
      'IP68-rated connectors and hydrophobic coating ensure waterproof protection during monsoons. Optimal drainage design prevents water accumulation and power loss.',
    icon: CloudRain,
  },
  {
    key: 'snowy',
    label: 'Snowy',
    image: '/images/climate/snow.png',
    description:
      'Engineered for extreme cold, SKYGREEN panels deliver consistent output even during heavy snowfall. Snow-shedding glass and reinforced frames prevent buildup and structural stress.',
    icon: Snowflake,
    
  },
  {
    key: 'sunny',
    label: 'Desert',
    image: '/images/climate/dessert.png',
    description:
      'Top-tier thermal stability and anti-reflective glass allow maximum power generation in high-temperature regions. Perfect for desert zones and tropical rooftops with intense sunlight.',
    icon: Sun,
  },
  {
    key: 'Hailstrom',
    label: 'Hailstrom',
    image: '/images/climate/hailstorm.png',
    description:
      'Tested against hail impact up to 35mm, our panels feature tempered glass and strong backsheet integrity — ideal for hail-prone regions and unpredictable weather.',
    icon: CloudHail,
  },
  {
    key: 'windy',
    label: 'Windy',
    image: '/images/climate/humid.png',
    description:
      'Wind tunnel-tested for cyclone-grade gusts. Aluminium alloy frames and certified mounting kits ensure long-term structural integrity even in coastal and hilly zones.',
    icon: Wind,
  },
];

export default function ClimateShowcase() {
  const [active, setActive] = useState('sunny');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full min-h-screen px-16 py-12 bg-black flex flex-col justify-center"
        style={{
        backgroundImage: "url('/images/climate/bg_green.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading */}
      <header className="mb-12 text-center text-white">
        <h2 className="text-7xl font-bold mb-2 text-[#3ef838ff]">Weatherproof Power</h2>
        <p className="text-2xl">SKYGREEN panels that thrive in every climate</p>
      </header>
    <div className="w-full h-[600px] px-16 py-12 flex items-center gap-4">
      {seasons.map((season) => {
        const isActive = active === season.key;
        const isHovered = hovered === season.key;
        const Icon = season.icon;

        return (
          <motion.div
              key={season.key}
              onClick={() => setActive(season.key)}
              onMouseEnter={() => setHovered(season.key)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer overflow-hidden transition-all duration-500"
              animate={{
                flex: isActive ? 1.3 : 1,
                filter: isActive || isHovered ? 'brightness(1)' : 'brightness(0.5)',
              }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                borderTopRightRadius: '1.5rem',
                borderBottomLeftRadius: '1.5rem',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#3ef838ff',
                height: isActive ? '100%' : '80%',
              }}
            >
              <Image src={season.image} alt={season.label} fill style={{ objectFit: 'cover',}} />

              {/* Tint + Text for ALL panels */}
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/95 via-black/80 to-transparent px-6 py-6 text-white">
                <div className="absolute bottom-4 left-6 right-6 flex items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-green-400 flex items-center gap-2">
                      <Icon size={28} className="text-green-400" />
                      {season.label}
                    </h3>
                    <p className="text-sm leading-relaxed">{season.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
