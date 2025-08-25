"use client";

/** ---- Types ---- */
type ElectricalRow = { label: string; key: string; unit?: string };
type ElectricalBlock = {
  stc: Record<string, number | string | null>;
  noct: Record<string, number | string | null>;
};
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
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-500 tracking-tight">
            Electrical Performance Parameters
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            STC: 1000 W/m², 25°C, AM1.5 | NOCT: 800 W/m², 20°C, 1 m/s wind |
            Tolerance ±3%
          </p>
        </div>

        {/* Table */}
        <div className="mx-auto max-w-5xl h-full flex flex-col overflow-hidden rounded-2xl border border-green-500">
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-1/3" />
              <col className="w-1/3" />
              <col className="w-1/3" />
            </colgroup>
            <thead className="bg-zinc-900/70">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-b border-green-800/30 border-r border-green-800/50 text-center">
                  Parameter
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-b border-green-800/30 border-r border-green-800/50 text-center">
                  Value (STC)
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-b border-green-800/30 text-center">
                  Value (NOCT)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.key}
                  className={`
                    transition-all duration-300 cursor-pointer
                    ${idx % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/25"}
                    hover:bg-green-600/20 hover:scale-[1.01]
                  `}
                >
                  {/* Parameter */}
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/50 border-r border-green-800/50 text-center">
                    {r.label}{" "}
                    {r.unit ? (
                      <span className="text-zinc-500">({r.unit})</span>
                    ) : null}
                  </td>
                  {/* STC Value */}
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/50 border-r border-green-800/50 text-center">
                    {models[0].data.stc[r.key as keyof ElectricalBlock["stc"]]}
                  </td>
                  {/* NOCT Value */}
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/50 text-center">
                    {models[0].data.noct[r.key as keyof ElectricalBlock["noct"]]}
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
