"use client";

import { useState } from "react";

/** ---- Types ---- */
type ElectricalRow = {
  label: string;
  key: string;
  unit?: string;
};
type ElectricalBlock = {
  stc: Record<string, number | string | null>;
  noct: Record<string, number | string | null>;
};
type Model = {
  code: string;          // display name in the header
  key: string;           // unique key for data lookup
  data: ElectricalBlock; // STC + NOCT values
};

/** ---- Your data (add more models later) ---- */
const models: Model[] = [
  {
    code: "GPT72M-575HC",
    key: "m575",
    data: {
      stc: {
        pmax: 575,
        voc: 51.74,
        isc: 13.79,
        vmp: 43.82,
        imp: 13.12,
      },
      noct: {
        pmax: 429.52,
        voc: 48.93,
        isc: 12.53,
        vmp: 41.24,
        imp: 10.42,
      },
    },
  },

  // Example placeholders (fill when ready)
  // {
  //   code: "GPT72M-570HC",
  //   key: "m570",
  //   data: { stc: { pmax: 570, voc: 51.19, isc: 14.05, vmp: 43.0,  imp: 13.26 },
  //           noct:{ pmax: null, voc: null,  isc: null,  vmp: null, imp: null } }
  // },
  // {
  //   code: "GPT72M-580HC",
  //   key: "m580",
  //   data: { stc: { pmax: 580, voc: 51.41, isc: 14.22, vmp: 43.22, imp: 13.42 },
  //           noct:{ pmax: null, voc: null,  isc: null,  vmp: null, imp: null } }
  // },
];

/** ---- Table rows (order + labels) ---- */
const rows: ElectricalRow[] = [
  { label: "Maximum power (Pmax)", key: "pmax", unit: "W" },
  { label: "Open-circuit voltage (Voc)", key: "voc", unit: "V" },
  { label: "Short-circuit current (Isc)", key: "isc", unit: "A" },
  { label: "Peak power voltage (Vmp)", key: "vmp", unit: "V" },
  { label: "Peak power current (Imp)", key: "imp", unit: "A" },
];

export default function ElectricalPerformanceTable() {
  const [tab, setTab] = useState<"stc" | "noct">("stc");

  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Electrical Performance Parameters
            <span className="ml-2 text-green-500">
              ({tab.toUpperCase()} Test)
            </span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {tab === "stc"
              ? "STC: 1000 W/m², 25°C, AM1.5"
              : "NOCT: 800 W/m², 20°C, 1 m/s wind"}
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex rounded-xl overflow-hidden ring-1 ring-white/10 mb-4">
          <button
            onClick={() => setTab("stc")}
            className={`px-4 py-2 text-sm font-semibold transition ${
              tab === "stc"
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            STC
          </button>
          <button
            onClick={() => setTab("noct")}
            className={`px-4 py-2 text-sm font-semibold transition ${
              tab === "noct"
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            NOCT
          </button>
        </div>

        {/* Table (desktop) */}
        <div className="hidden md:block overflow-x-auto rounded-2xl ring-1 ring-white/10">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-zinc-900/60 backdrop-blur">
                <th className="sticky left-0 z-10 bg-zinc-900/60 text-left px-6 py-4 text-sm font-semibold text-zinc-300">
                  Parameter
                </th>
                {models.map((m) => (
                  <th
                    key={m.key}
                    className="text-left px-6 py-4 text-sm font-semibold text-zinc-300"
                  >
                    {m.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.key}
                  className={idx % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"}
                >
                  <td className="sticky left-0 z-10 bg-inherit px-6 py-4 text-sm text-zinc-200">
                    {r.label} {r.unit ? <span className="text-zinc-500">({r.unit})</span> : null}
                  </td>
                  {models.map((m) => {
                    const value = m.data[tab as keyof ElectricalBlock][
                      r.key as keyof ElectricalBlock["stc"]
                    ];
                    return (
                      <td key={m.key + r.key} className="px-6 py-4 text-sm">
                        {value === null || value === undefined || value === ""
                          ? "—"
                          : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="md:hidden space-y-6">
          {models.map((m) => (
            <div
              key={m.key}
              className="rounded-2xl ring-1 ring-white/10 overflow-hidden"
            >
              <div className="bg-zinc-900/60 px-4 py-3 text-sm font-semibold text-zinc-300">
                {m.code}
              </div>
              <div className="divide-y divide-white/5">
                {rows.map((r) => {
                  const value = m.data[tab as keyof ElectricalBlock][
                    r.key as keyof ElectricalBlock["stc"]
                  ];
                  return (
                    <div key={r.key} className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm text-zinc-300">
                        {r.label} {r.unit ? <span className="text-zinc-500">({r.unit})</span> : null}
                      </span>
                      <span className="text-sm">
                        {value === null || value === undefined || value === ""
                          ? "—"
                          : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Specs are subject to change. Confirm before installation.
        </p>
      </div>
    </section>
  );
}
