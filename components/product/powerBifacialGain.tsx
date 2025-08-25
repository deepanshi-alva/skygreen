"use client";

import { useState } from "react";

/** ---- Types ---- */
type ElectricalBlock = { stc: Record<string, number | string | null>; noct: Record<string, number | string | null> };
type Model = { code: string; key: string; data: ElectricalBlock };

/** ---- Row order ---- */
const gains = [
  { rear: "+5%", pmax: "604 Wp", eff: "23.4 %" },
  { rear: "+10%", pmax: "633 Wp", eff: "24.5 %" },
  { rear: "+15%", pmax: "661 Wp", eff: "25.6 %" },
  { rear: "+20%", pmax: "690 Wp", eff: "26.7 %" },
  { rear: "+25%", pmax: "719 Wp", eff: "27.8 %" },
  { rear: "+30%", pmax: "748 Wp", eff: "28.9 %" },
];

export default function BifacialGain() {

  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* Heading (centered) */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-500 tracking-tight">
            Backside Power Gain{" "}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Base: 575 Wp front-side, module area ~2.585 m² → ~22.3% efficiency at STC
          </p>
        </div>

        <div className="mx-auto h-full flex flex-col max-w-4xl overflow-hidden
    rounded-2xl border border-green-500">
          <table className="w-full border-collapse">
            <thead className="bg-zinc-900/70">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                  Rear Side Gain
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                  Peak Power (Pmax)
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-200 border-l border-green-800/30 text-center">
                  Module Efficiency (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {gains.map((g, i) => (
                <tr
                  key={i}
                  className={`
        ${i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/25"}
      `}
                >
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                    {g.rear}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                    {g.pmax}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-200 border-t border-green-800/70 border-l border-green-800/70 text-center">
                    {g.eff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <p className="mt-4 text-center text-xs text-zinc-500">
          Based on front-side rated power of 575 Wp at STC (1000 W/m², 25°C, AM1.5). Extra power depends on the surface below the panels and installation conditions.
        </p>
      </div>
    </section>
  );
}
