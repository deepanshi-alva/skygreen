"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Props = {
  results: any | null;
};

export default function CenterOutput({ results }: Props) {
  const [mode, setMode] = useState<"grid" | "solar">("grid");
  if (!results) {
    return (
      <div className="col-span-7 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">🌞 Every rooftop can be a power plant!</p>
          <p className="text-lg">
            Installing 3kW solar can save up to{" "}
            <span className="text-green-400 font-bold">₹40,000</span> per year.
          </p>
          <div className="animate-pulse text-green-500 font-bold">
            Fill in your details to calculate savings
          </div>
        </div>
      </div>
    );
  }

  const format = (value: any) =>
    typeof value === "number" ? value.toFixed(2) : value;

  // ---- PIE DATA ----
  const COLORS = ["#22c55e", "#1e293b"]; // green + gray

  const gridData = [
    { name: "30-Year Grid Bill", value: results.total_spend },
  ];

  const solarData = [
    { name: "Payback Period", value: results.payback_years * results.annual_saving_inr },
    { name: "Net Saving After Payback", value: results.net_gain_after_payback },
  ];

  return (
    <div className="col-span-7 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Solar Savings</h2>
      <div className="grid grid-cols-4 gap-4">
        {/* Recommended System */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Recommended System</p>
          <p className="text-2xl font-bold text-green-400 ">
            {format(results.recommended_kw)} kW
          </p>
        </div>

        {/* Monthly Saving */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Estimated Monthly Saving</p>
          <p className="text-2xl font-bold text-green-400 ">
            ₹{format(results.monthly_saving_inr)}
          </p>
        </div>

        {/* Yearly Saving */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Estimated Yearly Saving</p>
          <p className="text-2xl font-bold text-green-400 ">
            ₹{format(results.annual_saving_inr)}
          </p>
        </div>

        {/* Payback Period */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Payback Period</p>
          <p className="text-2xl font-bold text-green-400 ">
            {results.payback_years.toFixed(1)} years
          </p>
        </div>
      </div>

      {/* Middle Row → Subsidy Overview + 4 small stat boxes */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* Subsidy Overview card (big) */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-md col-span-1">
          <h3 className="text-lg font-bold mb-4">Subsidy Overview</h3>

          {/* Main subsidy number */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400">Total Subsidy</p>
              <p className="text-3xl font-bold text-green-400">
                ₹{format(results.total_subsidy)}
              </p>
            </div>
          </div>

          {/* Breakdown list */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Central Subsidy</span>
              <span className="font-semibold text-white">
                ₹{format(results.central_subsidy_inr)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">State Subsidy</span>
              <span className="font-semibold text-white">
                ₹{format(results.state_subsidy)}
              </span>
            </div>
            <hr className="border-white/10 my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Gross Plant Cost</span>
              <span className="font-semibold text-white">
                ₹{format(results.gross_cost_inr)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Net Cost (After Subsidy)</span>
              <span className="font-semibold text-green-400">
                ₹{format(results.net_cost_inr)}
              </span>
            </div>
          </div>
        </div>

        {/* Right column → 4 small stat boxes stacked */}
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex flex-row space-x-6"> */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Grid Consumed</p>
            <p className="text-2xl font-bold text-green-400">
              {format(results.daily_unit)}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Solar Units Produced</p>
            <p className="text-2xl font-bold text-green-400">
              {format(results.daily_gen_kwh)}
            </p>
          </div>
          {/* </div> */}
          {/* <div className="flex flex-row space-x-6"> */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Panels Required</p>
            <p className="text-2xl font-bold text-green-400">
              {results.panel_count}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Rooftop Area Needed</p>
            <p className="text-2xl font-bold text-green-400">
              {format(results.roof_needed_sqft)} sqft
            </p>
          </div>
          {/* </div> */}
        </div>

        {/* Right column → Pie + Buttons */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-md col-span-2 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">30-Year Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={mode === "grid" ? gridData : solarData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {(mode === "grid" ? gridData : solarData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number, name: string) => [`₹${val.toFixed(0)}`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Toggle buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setMode("grid")}
              className={`px-4 py-1 rounded-md font-semibold ${mode === "grid"
                ? "bg-green-500 text-black"
                : "bg-[#111] text-green-400 border border-green-500"
                }`}
            >
              With Grid
            </button>
            <button
              onClick={() => setMode("solar")}
              className={`px-4 py-1 rounded-md font-semibold ${mode === "solar"
                ? "bg-green-500 text-black"
                : "bg-[#111] text-green-400 border border-green-500"
                }`}
            >
              With Solar
            </button>
          </div>
        </div>
      </div>

      <button className="mt-6 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg transition">
        Download Full Report
      </button>
    </div>
  );

}
