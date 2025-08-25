"use client";

import { useState } from "react";

/** ---- Types ---- */
type ElectricalRow = { label: string; key: string; unit?: string };
type ElectricalBlock = { stc: Record<string, number | string | null>; noct: Record<string, number | string | null> };
type Model = { code: string; key: string; data: ElectricalBlock };

/** ---- Data ---- */
const models: Model[] = [
  {
    code: "GPT72M-575HC",
    key: "m575",
    data: {
      stc: { pmax: 575, voc: 51.74, isc: 13.79, vmp: 43.82, imp: 13.12 },
      noct: { pmax: 429.52, voc: 48.93, isc: 12.53, vmp: 41.24, imp: 10.42 },
    },
  },
];

/** ---- Row order ---- */
const rows: ElectricalRow[] = [
  { label: "Maximum power (Pmax)", key: "pmax", unit: "W" },
  { label: "Open-circuit voltage (Voc)", key: "voc", unit: "V" },
  { label: "Short-circuit current (Isc)", key: "isc", unit: "A" },
  { label: "Voltage at Pmax (Vmp)", key: "vmp", unit: "V" },
  { label: "Current at Pmax (Imp)", key: "imp", unit: "A" },
];

export default function ElectricalPerformanceTable() {
  const [tab, setTab] = useState<"stc" | "noct">("stc");

  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-500 tracking-tight">
            Electrical Performance Parameters
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {tab === "stc"
              ? "STC: 1000 W/m², 25°C, AM1.5 | Tolerance ±3%"
              : "NOCT: 800 W/m², 20°C, 1 m/s wind | Tolerance ±3%"}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-6 flex justify-center">
          <div
            className="relative inline-flex p-1 rounded-full bg-zinc-900/70 ring-1 ring-green-500/40 shadow-[0_0_0_1px_rgba(34,197,94,0.15)]"
            role="tablist"
          >
            <button
              onClick={() => setTab("stc")}
              aria-selected={tab === "stc"}
              role="tab"
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                tab === "stc"
                  ? "bg-green-500 text-black shadow-[0_8px_24px_rgba(34,197,94,0.45)]"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              STC
            </button>
            <button
              onClick={() => setTab("noct")}
              aria-selected={tab === "noct"}
              role="tab"
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                tab === "noct"
                  ? "bg-green-500 text-black shadow-[0_8px_24px_rgba(34,197,94,0.45)]"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              NOCT
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-green-500 bg-gradient-to-b from-green-900/60 to-green-900/20">
          <table className="w-full border-collapse table-fixed">
  <colgroup>
    <col className="w-2/3" />
    <col className="w-1/3" />
  </colgroup>
  <thead className="bg-zinc-900/70">
    <tr>
      <th
        className="px-6 py-4 text-left text-sm font-semibold text-zinc-200 border-b border-green-800/30 border-r border-green-800/50"
      >
        Parameter
      </th>
      <th
        className="px-6 py-4 text-left text-sm font-semibold text-zinc-200 border-b border-green-800/30"
      >
        Value
      </th>
    </tr>
  </thead>
  <tbody>
    {rows.map((r, idx) => (
      <tr
        key={r.key}
        className={idx % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/25"}
      >
        <td
          className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/50 border-r border-green-800/50"
        >
          {r.label}{" "}
          {r.unit ? (
            <span className="text-zinc-500">({r.unit})</span>
          ) : null}
        </td>
        <td
          className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/50"
        >
          {
            models[0].data[
              tab as keyof ElectricalBlock
            ][r.key as keyof ElectricalBlock["stc"]]
          }
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Specifications are subject to change without notice. For the latest
          technical details, please contact a SKYGREEN sales representative.
        </p>
      </div>
    </section>
  );
}
