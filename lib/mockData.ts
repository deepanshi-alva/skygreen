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
      title: "India’s Solar Module Manufacturing Hits New High",
      excerpt:
        "India’s solar module production under ALMM has reached 8.8 GW listed capacity, pushing the country closer to its 100 GW domestic manufacturing goal. The Ministry of New and Renewable Energy (MNRE) highlighted that India now has over 100 certified manufacturers with 123 production lines. Why it matters: This milestone boosts India’s push for self - reliance in solar and reduces dependence on Chinese imports.",
      image: "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2025/07/Standard-Mercom-54.jpg",
      date: "18 Aug 2025",
      tag: "IndiaSolar . MNRE . ALMM . MakeInIndia . SolarManufacturing",
      href: "https://www.mercomindia.com/daily-news-wrap-up-indias-solar-module-manufacturing-capacity-reaches-100-gw?utm_source",
      meta: "Reuters",
    },

    {
      id: 2,
      title: "West Bengal Opens Doors for Rooftop Solar Prosumers",
      excerpt:
        "The West Bengal Electricity Regulatory Commission (WBERC) has issued new Prosumers Regulations 2025, allowing households and businesses to install rooftop solar and feed surplus power into the grid. Why it matters: Consumers will save on bills and earn credits by selling excess power—making solar more attractive at the state level.",
      date: "18 Aug 2025",
      image: "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2025/08/Copy-of-Mercom-FI-2025-08-18T130016.569.jpg",
      tag: "RooftopSolar . WestBengal . Prosumers . CleanEnergyIndia",
      href: "https://www.mercomindia.com/west-bengal-issues-rooftop-solar-regulations-for-prosumers?utm_source",
      meta: "Reuters",
    },

    {
      id: 3,
      title: "Indian Railways Tests First Removable Solar Panels on Tracks",
      excerpt:
        "Banaras Locomotive Works has installed India's first removable solar panels along railway tracks. These can be detached for maintenance, helping green India’s train network. Why it matters: If scaled up, this could make Indian Railways a global pioneer in renewable - powered transport.",
      date: "18 Aug 2025",
      image: "https://static.toiimg.com/thumb/msid-123359201,imgsize-366828,width-400,height-225,resizemode-72/123359201.jpg",
      tag: "IndianRailways . SolarInnovation . GreenTransport . RenewableIndia",
      href: "https://timesofindia.indiatimes.com/city/varanasi/banaras-locomotive-installs-indias-first-removable-solar-panels-on-railway-tracks-boosting-green-energy-drive/articleshow/123362268.cms",
      meta: "Reuters",
    },
    {
      id: 4,
      title: "World Needs $1.2 Trillion for Battery Storage by 2034",
      excerpt:
        "A Wood Mackenzie report warns that the world must invest $1.2 trillion in battery storage by 2034 to support nearly 5,900 GW of new solar and wind capacity. Why it matters: Without storage, clean energy growth will hit bottlenecks; this is critical for global solar expansion.",
      date: "18 Aug 2025",
      image: "https://i0.wp.com/solarquarter.com/wp-content/uploads/2020/04/7.png?resize=696%2C392&ssl=1",
      tag: "GlobalSolar . WoodMackenzie . BatteryStorage . CleanEnergy",
      href: "https://solarquarter.com/2025/08/18/global-energy-transition-needs-us1-2-trillion-battery-storage-investment-by-2034-to-support-5900-gw-of-renewable-energy-projects-says-wood-mackenzie/?utm_source=chatgpt.com",
      meta: "Reuters",
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
