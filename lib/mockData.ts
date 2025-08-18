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
      image: "data:image/jpeg;base64,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",
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
