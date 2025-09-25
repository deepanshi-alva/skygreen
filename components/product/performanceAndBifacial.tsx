"use client";

type ElectricalRow = { label: string; key: string; unit?: string };
type ElectricalBlock = {
  stc: Record<string, number | string | null>;
  noct: Record<string, number | string | null>;
};
type Model = { code: string; key: string; data: ElectricalBlock };

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

const rows: ElectricalRow[] = [
  { label: "Maximum power (Pmax)", key: "pmax", unit: "W" },
  { label: "Open-circuit voltage (Voc)", key: "voc", unit: "V" },
  { label: "Short-circuit current (Isc)", key: "isc", unit: "A" },
  { label: "Voltage at Pmax (Vmp)", key: "vmp", unit: "V" },
  { label: "Current at Pmax (Imp)", key: "imp", unit: "A" },
];

const gains = [
  { rear: "+5%", pmax: "604 Wp", eff: "22.37 %" },
  { rear: "+10%", pmax: "633 Wp", eff: "24.49 %" },
  { rear: "+20%", pmax: "690 Wp", eff: "26.71 %" },
  { rear: "+30%", pmax: "748 Wp", eff: "28.94 %" },
];

export default function PerformanceAndBifacial() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ---- Electrical Performance Table ---- */}
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-500 tracking-tight">
              Electrical Performance Parameters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              STC: 1000 W/m², 25°C, AM1.5 | NOCT: 800 W/m², 20°C, 1 m/s wind |
              Tolerance ±3%
            </p>
          </div>

          <div className="mx-auto w-full rounded-2xl border border-green-500">
            <table className="w-full min-w-[500px] border-collapse">
              <thead className="bg-zinc-900/70">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-b border-green-800/30 border-r border-green-800/50 text-center">
                    Parameter
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-b border-green-800/30 border-r border-green-800/50 text-center">
                    Value (STC)
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-b border-green-800/30 text-center">
                    Value (NOCT)
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={r.key}
                    className={`transition-all duration-300 cursor-pointer ${
                      idx % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/25"
                    } hover:bg-green-600/20 hover:scale-[1.01]`}
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/50 border-r border-green-800/50 text-center">
                      {r.label}{" "}
                      {r.unit && (
                        <span className="text-zinc-500">({r.unit})</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/50 border-r border-green-800/50 text-center">
                      {
                        models[0].data.stc[
                          r.key as keyof ElectricalBlock["stc"]
                        ]
                      }
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/50 text-center">
                      {
                        models[0].data.noct[
                          r.key as keyof ElectricalBlock["noct"]
                        ]
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

        {/* ---- Bifacial Power Gain ---- */}
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-500 tracking-tight">
              Backside Power Gain
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Base: 575 Wp front-side, module area ~2.585 m² → ~22.3% efficiency
              at STC
            </p>
          </div>

          <div className="mx-auto w-full rounded-2xl border border-green-500">
            <table className="w-full min-w-[400px] border-collapse">
              <thead className="bg-zinc-900/70">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                    Rear Side Gain
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                    Peak Power (Pmax)
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                    Module Efficiency (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {gains.map((g, i) => (
                  <tr
                    key={i}
                    className={`transition-all duration-300 cursor-pointer ${
                      i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/25"
                    } hover:bg-green-600/20 hover:scale-[1.01]`}
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                      {g.rear}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                      {g.pmax}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                      {g.eff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Based on front-side rated power of 575 Wp at STC (1000 W/m², 25°C,
            AM1.5). Extra power depends on the surface below the panels and
            installation conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
