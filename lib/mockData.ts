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
    // {
    //   id: 1,
    //   title: "China mulls OPEC-style fund to shut excess polysilicon capacity",
    //   excerpt:
    //     "Industry leaders discuss a ¥50bn restructuring fund to curb overcapacity and stabilize prices amid intense competition.",
    //   image: "https://static.toiimg.com/thumb/msid-123359201,imgsize-366828,width-400,height-225,resizemode-72/123359201.jpg",
    //   date: "2025-08-14",
    //   tag: "China · Polysilicon",
    //   href: "https://www.reuters.com/commentary/breakingviews/chinas-opec-for-solar-push-risks-overreaching-2025-08-14/",
    //   meta: "Reuters Breakingviews",
    // },
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
        "Banaras Locomotive Works has installed India’s first removable solar panels along railway tracks. These can be detached for maintenance, helping green India’s train network. Why it matters: If scaled up, this could make Indian Railways a global pioneer in renewable - powered transport.",
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
      image:"https://i0.wp.com/solarquarter.com/wp-content/uploads/2020/04/7.png?resize=696%2C392&ssl=1",
      tag: "GlobalSolar . WoodMackenzie . BatteryStorage . CleanEnergy",
      href: "https://solarquarter.com/2025/08/18/global-energy-transition-needs-us1-2-trillion-battery-storage-investment-by-2034-to-support-5900-gw-of-renewable-energy-projects-says-wood-mackenzie/?utm_source=chatgpt.com",
      meta: "Reuters",
    },
  ],

  events: [
    {
      id: "ev-1",
      title: "Renewable Energy India (REI) Expo 2025 — Greater Noida",
      excerpt: "India's flagship clean-energy trade show.",
      date: "2025-10-30",
      tag: "Expo",
      href: "https://renewableenergyindiaexpo.com/",
      meta: "India Expo Mart · Oct 30 - Nov 1",
    },
    {
      id: "ev-2",
      title: "Intersolar India 2025 — Gandhinagar",
      excerpt: "Conference & expo focused on PV, storage and e-mobility.",
      date: "2025-02-12",
      tag: "Expo",
      href: "https://www.solarpowereurope.org/events/intersolar-india-2025",
      meta: "Helipad Exhibition Centre · Feb 12-14",
    },
  ],

  blogs: [
    // Keep this for SKYGREEN articles or curated explainers you publish.
  ],
};
