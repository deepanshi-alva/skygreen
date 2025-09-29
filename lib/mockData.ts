// lib/mockdata.ts
export type Item = {
  id: string | number;
  title: string;
  excerpt?: string;
  image?: string;   // optional; leave undefined to use your gradient fallback
  date?: string;    // ISO (YYYY-MM-DD)
  tag?: string;
  href?: string;    // link to original article
  meta?: string;    // source / location
};

export type Data = {
  news: Item[];
  events: Item[];
  blogs: Item[];
};

export const mockData: Data = {
  news: [
    {
      id: 1,
      title: "Tata Power adds 4.8 GW solar cell capacity to India’s approved list",
      excerpt:
        "Tata Power has successfully added 4.8 GW of solar cell manufacturing capacity to India’s Approved List of Models and Manufacturers (ALMM). This means government projects and subsidy-linked schemes can now officially buy from Tata Power’s factories. For India, this strengthens local solar manufacturing, reduces dependence on imports, and supports the “Make in India” push.",
      image: "/images/news/tata.jpg",
      date: "2025-09-29",
      tag: " India, solar, manufacturing, ALMM, Tata Power",
      href: "https://www.pv-magazine.com/2025/09/29/tata-powers-4-8-gw-cell-capacity-added-to-indias-manufacturing-list ",
      meta: "PV-Magazine",
    },
    {
      id: 2,
      title: " India generates 27,859 million units of renewable power in August 2025",
      excerpt: "In August 2025, India produced 27,859 million units (MUs) of renewable electricity, with solar and wind together making up 91.6% of this. This shows how quickly clean energy is becoming India’s main power source. It means fewer blackouts, reduced coal dependence, and cleaner air for millions of people. The steady rise of renewables is a sign that India is on track to reach its big 2030 targets.",
      tag: "India, solar, wind, renewable energy, generation.",
      image: "/images/news/windmill.jpg",
      date: "2025-09-29",
      href: "https://solarquarter.com/2025/09/29/india-generates-27859-million-units-of-renewable-power-in-august-2025-solar-and-wind-contribute-91-6/",
      meta: "solarquarter",
    },
    {
      id: 3,
      title: "Indore to run entire water supply on solar power",
      excerpt:
        "Indore, already famous as India’s cleanest city, will now become the first Indian city to power its entire water supply system with solar energy. The project, funded by green bonds, will begin in November 2025. This means water for lakhs of residents will be pumped using clean energy instead of costly and polluting electricity. It’s a model other Indian cities can follow to cut bills and emissions.",
      image: "/images/news/indorenews.jpg",
      date: "2025-09-29",
      tag: "India, solar, Indore, water supply, green bonds",
      href: "https://asianews.network/indore-first-city-in-india-to-get-water-supply-powered-by-solar-plant-funded-by-green-bonds/?utm_source=chatgpt.com",
      meta: "asianews.network",
    },
    {
      id: 4,
      title: "India’s clean energy IPO wave gathers momentum",
      excerpt:
        "Indian renewable companies are rushing to the stock market. In just one week, a solar module maker and an EPC company raised over ₹13.6 billion (~$170 million) through IPOs. Many more are lined up, including battery and solar power producers. This IPO boom shows that investors strongly believe in India’s clean energy future. For common people, it means more trusted green companies to invest in and faster growth of the sector.",
      image: "/images/news/paisa.jpg",
      date: "2025-09-29",
      tag: "India, clean energy, IPO, investment, finance",
      href: "https://www.mercomindia.com/indias-clean-energy-ipo-wave-powers-ahead-despite-headwinds",
      meta: "mercomindia",
    },
    {
      id: 5,
      title: " Silver prices hit solar manufacturers, push innovation",
      excerpt:
        " The price of silver, used in solar cells, has shot up above $44/oz, the highest in 10 years. This makes solar panels more expensive to produce. To deal with this, manufacturers are cutting down silver usage and developing new ways to keep panels efficient but affordable. For customers worldwide, it means solar will stay cost-competitive despite rising material costs.",
      image: "/images/news/silver.jpg",
      date: "2025-09-29",
      tag: " Global, solar, silver, manufacturing, cost",
      href: "https://www.pv-magazine-india.com/2025/09/29/silver-price-surge-drives-pv-makers-to-cut-silver-usage-further ",
      meta: "pv-magazine-india",
    },
    {
      id: 6,
      title: "Fortescue partners with LONGi for big solar module deal",
      excerpt:
        "Australian giant Fortescue has signed a major deal with Chinese solar leader LONGi to supply solar modules for its clean energy projects. Fortescue wants to reach “Real Zero by 2030” — meaning no fossil fuels. The partnership ensures steady module supply for its large solar farms in Australia. This shows how global companies are teaming up to scale solar fast.",
      image: "/images/news/fortescue.jpg",
      date: "2025-09-29",
      tag: "Global, Australia, solar, LONGi, corporate deal",
      href: "https://www.pv-tech.org/fortescue-signs-solar-module-supply-agreement-with-chinas-longi/?utm_source=chatgpt.com",
      meta: "pv-tech.org",
    },
    {
      id: 7,
      title: "Chad inaugurates its first large-scale solar power plant",
      excerpt:
        "Chad, in Central Africa, has opened its first big solar plant — a 50 MW project with battery storage. Built by Global South Utilities (UAE), it will supply clean power to about 274,000 homes and reduce dependence on diesel generators. It’s a historic step for the country and shows how solar can transform lives in regions with weak electricity supply.",
      image: "/images/news/chad.jpg",
      date: "2025-09-29",
      tag: "Global, Africa, solar, project, battery storage",
      href: "https://solarquarter.com/2025/09/29/gsu-inaugurates-chads-first-large-scale-50-mw-solar-pv-plant/",
      meta: "solarquarter",
    },
  ],

  events: [
    {
      id: "ev-1",
      title: "Renewable Energy India Expo 2025 (18th Annual)",
      excerpt: "India's flagship clean-energy trade show.",
      date: "2025-09-29",
      tag: "solar, renewable energy, expo, India, clean energy, conference",
      image: "/images/news/wa1.jpg",
      href: "https://renewableenergyindiaexpo.com",
      meta: "India Expo Centre, Greater Noida, Delhi NCR · 30 Oct - 1 Nov 2025",
    },
    {
      id: "ev-2",
      title: "Harit Bharat Expo 2026",
      excerpt: "India's largest renewable energy business platform. If you want to see the future of solar, wind, and green technologies all in one place, this is the expo. You'll meet 500+ exhibitors, 150+ speakers, and visitors from 50+ countries. Perfect for making global connections and exploring sustainable solutions.",
      date: "2025-09-29",
      tag: "renewable energy, solar, expo, India, Harit Bharat, Jaipur",
      image: "/images/news/harit.jpg",
      href: "https://theharitbharat.com/home.html ",
      meta: "Jaipur Exhibition & Convention Centre (JECC), Jaipur, Rajasthan · 16 - 18 Jan 2026",
    },
    {
      id: "ev-3",
      title: "The smarter E India 2026 (Intersolar India)",
      excerpt: "Here you don't just see solar panels — you also see batteries, EV charging, and smart energy together. It's like a one-stop shop for the future of energy. Perfect for people who want to understand how solar, storage, and electric mobility work together in business.",
      date: "2025-09-29",
      tag: "solar, India, Intersolar, clean energy, storage, EV",
      image: "/images/news/smartereindia.jpg",
      href: "https://www.thesmartere.in/home",
      meta: "Helipad Exhibition Centre, Gandhinagar, Gujarat · 25 - 27 Feb 2026",
    },
    {
      id: "ev-4",
      title: "SNEC PV Power Expo 2026",
      excerpt: "If you want to see the world’s largest solar show, this is it. Hundreds of companies showcase panels, equipment, and storage systems. It’s in China, the global hub of solar manufacturing — the best place to meet suppliers and compare technologies.",
      date: "2025-09-29",
      tag: "solar, PV, expo, China, storage",
      image: "/images/news/snecpv.jpg",
      href: "https://www.snec-pv.com/",
      meta: "National Exhibition & Convention Center, Shanghai, China · 3 – 5 Jun 2026",
    },
    {
      id: "ev-5",
      title: "Intersolar Europe 2026",
      excerpt: "This is the world’s biggest solar exhibition. If you want to see the latest solar panels, inverters, and storage tech from across the globe, this is the place. You’ll meet thousands of companies, compare technologies side by side, and get a clear view of where solar is headed worldwide.",
      date: "2025-09-29",
      tag: "solar, Europe, expo, PV, Germany",
      image: "/images/news/intersolareurope.jpg",
      href: "https://www.intersolar.de/for-exhibitors/application",
      meta: "Messe München, Munich, Germany · 23 – 25 Jun 2026",
    },
    {
      id: "ev-6",
      title: "Intersolar South America 2026",
      excerpt: "The largest solar show in Latin America. If you are interested in how solar is booming in Brazil and the region, you’ll see all the key players here. Great for connecting with new distributors, exploring solar + storage solutions, and tapping into a fast-growing market.",
      date: "2025-09-29",
      tag: "solar, South America, expo, PV, Brazil",
      image: "/images/news/intersolarsouthamerica.jpg",
      href: "https://www.intersolar.net.br/home",
      meta: "Expo Center Norte, São Paulo, Brazil · 25 – 27 Aug 2026",
    },
    {
      id: "ev-7",
      title: "SolarPower Summit 2026",
      excerpt: "Organized by SolarPower Europe, this summit brings together policymakers, industry leaders, and innovators to shape the future of solar in Europe. Great for understanding EU solar policy, investment trends, and market expansion opportunities.",
      date: "2025-09-29",
      tag: "solar, Europe, summit, policy, business",
      image: "/images/news/summit.jpg",
      href: "https://www.solarpowersummit.org/",
      meta: "Brussels, Belgium · Mar 2026 (exact dates TBA)",
    },
    {
      id: "ev-8",
      title: "World Future Energy Summit (WFES) 2026",
      excerpt: "The Middle East’s biggest renewable energy event, held in Abu Dhabi. A global hub for solar, hydrogen, and clean tech investors. Great for finding partners in GCC and African markets.",
      date: "2025-09-29",
      tag: "solar, renewable energy, Middle East, Abu Dhabi, clean tech",
      image: "/images/news/worldsummit.jpg",
      href: "https://www.worldfutureenergysummit.com/#/",
      meta: "Abu Dhabi National Exhibition Centre (ADNEC), UAE · 14–16 January 2026",
    },
    {
      id: "ev-9",
      title: "Intersolar North America 2026",
      excerpt: "North America’s dedicated solar and energy storage expo. You’ll find the latest PV, battery, and EV charging solutions, plus strong networking with U.S. EPCs, utilities, and investors. A key gateway into the booming U.S. solar market.",
      date: "2025-09-29",
      tag: "solar, USA, expo, storage, North America",
      image: "/images/news/intersolarnorthamerica.jpg",
      href: "https://www.iesna.com/",
      meta: "San Diego, California, USA · 18–20 Feb 2026",
    },
    {
      id: "ev-10",
      title: "RE+ 2026",
      excerpt: "North America’s largest renewable energy trade show, covering solar, storage, EVs, and clean technologies.",
      date: "2025-09-29",
      tag: "solar, USA, expo, renewable energy, clean tech",
      image: "/images/news/re.jpg",
      href: "https://www.re-plus.com",
      meta: "Las Vegas Convention Center, Las Vegas, USA · 16 – 19 Nov 2026",
    },
  ],

  blogs: [
    // Keep this for SKYGREEN articles or curated explainers you publish.
  ],
};
