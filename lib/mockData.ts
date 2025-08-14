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
      title: "China mulls OPEC-style fund to shut excess polysilicon capacity",
      excerpt:
        "Industry leaders discuss a ¥50bn restructuring fund to curb overcapacity and stabilize prices amid intense competition.",
      date: "2025-08-14",
      tag: "China · Polysilicon",
      href: "https://www.reuters.com/commentary/breakingviews/chinas-opec-for-solar-push-risks-overreaching-2025-08-14/",
      meta: "Reuters Breakingviews",
    },
    {
      id: 2,
      title: "China's solar capacity growth to slow in H2 after pricing reforms",
      excerpt:
        "Removal of guaranteed tariffs spurs uncertainty; analysts still see a record year after H1 front‑loading.",
      date: "2025-08-13",
      tag: "Markets · Policy",
      href: "https://www.reuters.com/sustainability/climate-energy/chinas-solar-power-capacity-growth-slow-h2-after-pricing-reforms-2025-08-13/",
      meta: "Reuters",
    },
    {
      id: 3,
      title: "Maharashtra crosses 1,000 MW rooftop solar; Nagpur leads",
      excerpt:
        "State hits a major milestone under PM Suryaghar; Nagpur tops district installs with 157 MW.",
      date: "2025-08-14",
      tag: "India · Rooftop",
      href: "https://timesofindia.indiatimes.com/city/nagpur/nagpur-dist-leads-as-maha-crosses-1000mw-rooftop-solar-milestone/articleshow/123289666.cms",
      meta: "Times of India",
    },
    {
      id: 4,
      title: "MNRE posts updated ALMM List-I for solar PV modules",
      excerpt:
        "Official update to the Approved List of Models & Manufacturers (Modules).",
      date: "2025-08-13",
      tag: "India · ALMM",
      href: "https://mnre.gov.in/en/notice/updated-13-08-2025-list-i-under-almm-order-for-solar-pv-modules/",
      meta: "MNRE (Official)",
    },
    {
      id: 5,
      title: "MNRE clarifies ALMM mandate for govt projects under net-metering & open access",
      excerpt:
        "Clarifies applicability where bid submission dates and cut-offs created confusion; List-II for cells effective July 1, 2026.",
      date: "2025-08-13",
      tag: "India · ALMM",
      href: "https://www.mercomindia.com/mnre-issues-clarification-on-almm-list-ii-mandate-for-government-projects",
      meta: "Mercom India",
    },
    {
      id: 6,
      title: "ACME secures ₹3,184 crore REC funding for 280 MW FDRE project",
      excerpt:
        "Financing boost for firm's round-the-clock renewable development.",
      date: "2025-08-13",
      tag: "Finance · India",
      href: "https://www.pv-magazine-india.com/",
      meta: "pv magazine India (homepage story)",
    },
    {
      id: 7,
      title: "India's battery storage boom—minister outlines push at IESW 2025 keynote",
      excerpt:
        "Policy mix and tendering pipeline highlighted as India scales storage; 171 GWh of tenders noted.",
      date: "2025-08-14",
      tag: "Storage · India",
      href: "https://www.energy-storage.news/indias-battery-storage-boom-getting-the-execution-right/",
      meta: "Energy-Storage.news",
    },
    {
      id: 8,
      title: "India scraps central renewable pricing pools to speed up power deals",
      excerpt:
        "Uniform tariff pools dissolved to clear project pipeline; existing awards to be honored.",
      date: "2025-08-05",
      tag: "Policy · India",
      href: "https://www.reuters.com/sustainability/boards-policy-regulation/india-scraps-central-renewable-energy-pricing-pools-speed-up-power-deals-2025-08-05/",
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
