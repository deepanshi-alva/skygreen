"use client";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Info } from "lucide-react"; // 👈 info icon

export default function CenterOutput({ results }) {
  const [mode, setMode] = useState("solar");

  if (!results) {
    return (
      <>
        {/* Top Intro Box */}
        <div className="w-full flex justify-center mb-6">
          <div
            className="bg-[#0b0b0b] border border-green-500/40 rounded-xl 
               shadow-[0_0_25px_4px_rgba(34,197,94,0.5)] 
               p-4 sm:p-6 text-center transition-shadow duration-300
               hover:shadow-[0_0_35px_8px_rgba(34,197,94,0.8)]"
          >
            <p className="text-green-400 font-bold text-sm sm:text-base md:text-lg mb-2">
              India’s No.1 Free Solar Calculator ⚡
            </p>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
              Trusted by thousands to find the right system size, subsidy
              eligibility and payback instantly.
              <br />
              Just enter your details and discover how much you can save with{" "}
              <span className="text-green-400 font-semibold">
                SKYGREEN’s premium solar solutions.
              </span>
            </p>
          </div>
        </div>

        <div className="col-span-7 p-6 flex items-center justify-center md:mt-42">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold">
              ⚡ Not just a calculator — your solar partner for life.
            </p>
            <p className="text-lg">
              🌱 From savings calculation to free consultation, our experts are
              just one call away.
            </p>
            <div className="text-2xl text-green-500 font-bold">
              ✅ Your Trusted Partner — SKYGREEN.
            </div>
          </div>
        </div>
      </>
    );
  }

  // console.log("this is the sizing method", results.sizing_method)

  const format = (value) => {
    if (typeof value !== "number") return value;
    return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  // const COLORS = ["#e60707ff", "#22c55e"];
  const COLORS = ["#e9dd72ff", "#22c55e"];

  const gridData = [{ name: "30-Year Grid Bill", value: results.total_spend }];

  const solarData = [
    {
      name: "Payback Period",
      value: results.payback_years * results.annual_saving_inr,
    },
    {
      name: "Net Saving After 30 Years",
      value: results.net_gain_after_payback,
    },
  ];

  return (
    <div className="col-span-7 p-6">
      {/* Top Intro Box */}
      <div className="w-full flex justify-center mb-6">
        <div
          className="bg-[#0b0b0b] border border-green-500/40 rounded-xl 
               shadow-[0_0_25px_4px_rgba(34,197,94,0.5)] 
               p-4 sm:p-6 text-center transition-shadow duration-300
               hover:shadow-[0_0_35px_8px_rgba(34,197,94,0.8)]"
        >
          <p className="text-green-400 font-bold text-sm sm:text-base md:text-lg mb-2">
            India’s No.1 Free Solar Calculator ⚡
          </p>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Trusted by thousands to find the right system size, subsidy
            eligibility and payback instantly.
            <br />
            Just enter your details and discover how much you can save with{" "}
            <span className="text-green-400 font-semibold">
              SKYGREEN’s premium solar solutions.
            </span>
          </p>
        </div>
      </div>

      {/* Header row with title + Contact Us button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-0 text-center sm:text-left">
          Think Solar. Think SKYGREEN
        </h2>

        <div className="flex flex-col 2xl:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end">
          {/* Contact Button */}
          <a
            href="/contact"
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg bg-green-500 text-black text-sm sm:text-base font-bold shadow-md hover:bg-green-400 hover:scale-105 transition transform text-center whitespace-nowrap"
          >
            💬 Got Questions? Call Us Now!
          </a>

          {/* WhatsApp Button */}
          {/* WhatsApp Button (Disabled for now) */}
          <a
            href="#"
            title="Coming Soon"
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg 
             bg-[#25D366] text-black text-sm sm:text-base font-bold 
             shadow-md opacity-50 cursor-not-allowed 
             transition transform text-center whitespace-nowrap"
            onClick={(e) => e.preventDefault()} // prevent navigation
          >
            📲 WhatsApp My Report
          </a>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Recommended System */}
        <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10 shadow-md relative">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
              Recommended System
              <div className="relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div className="absolute left-6 top-0 w-64 sm:w-72 bg-black text-gray-300 text-justify text-xs rounded-lg shadow-lg p-2 sm:p-3 border border-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-green-400 font-semibold">Note: </span>
                  The recommended system size is not set directly by your
                  proposed capacity. It is calculated by multiplying the number
                  of panels with their rated wattage (panel_watt_w) to reflect
                  the actual feasible capacity.
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 break-words mt-1 sm:mt-2">
            {format(results?.final_dc_kw)} kW
          </p>
        </div>

        {/* Monthly Saving */}
        <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-xs sm:text-sm text-gray-400">
            Estimated Monthly Saving
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 break-words">
            ₹{format(results.monthly_saving_inr)}
          </p>
        </div>

        {/* Yearly Saving */}
        <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-xs sm:text-sm text-gray-400">
            Estimated Yearly Saving
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 break-words">
            ₹{format(results.annual_saving_inr)}
          </p>
        </div>

        {/* Payback Period */}
        <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-xs sm:text-sm text-gray-400">Payback Period</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 break-words">
            {results?.payback_years?.toFixed(1)} years
          </p>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
        {/* Subsidy Overview card */}
        <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-white/10 shadow-md w-full">
          {/* Gross Plant Cost */}
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center">
              Gross Plant Cost
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 text-center whitespace-nowrap">
              ₹{format(results.gross_cost_inr)}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center mt-1 leading-snug">
              Includes panel cost, inverter, AMC, installation and more.
            </p>
          </div>

          {/* Eligible Subsidy */}
          {results?.eligibleKw > 0 && (
            <div className="flex items-center justify-center mb-2">
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                Eligible Subsidy :{" "}
                <span className="font-semibold">
                  {format(results?.eligibleKw)}
                </span>{" "}
                KW
              </p>
            </div>
          )}

          <hr className="border-white/10 my-2" />

          {/* Subsidy breakdown */}
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex justify-center gap-2 text-[clamp(10px,2.5vw,14px)]">
              <span className="text-gray-300">Central Subsidy</span>
              <span className="font-semibold text-white whitespace-nowrap">
                - ₹{format(results.central_subsidy_inr)}
              </span>
            </div>

            <div className="flex justify-center gap-2 text-[clamp(10px,2.5vw,14px)]">
              <span className="text-gray-300">State Subsidy</span>
              <span className="font-semibold text-white whitespace-nowrap">
                - ₹{format(results.state_subsidy)}
              </span>
            </div>

            {results?.sgst_subsidy > 0 && (
              <div className="flex justify-center gap-2 text-[clamp(10px,2.5vw,14px)]">
                <span className="text-gray-300">SGST</span>
                <span className="font-semibold text-white whitespace-nowrap">
                  - ₹{format(results.sgst_subsidy)}
                </span>
              </div>
            )}
          </div>

          <hr className="border-white/10 my-2" />

          {/* Net Cost */}
          <div className="flex flex-col items-center mt-4 sm:mt-6">
            <span className="text-xs sm:text-sm md:text-base text-gray-300 font-semibold text-center">
              Net Cost (After Subsidy)
            </span>
            <span className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 whitespace-nowrap">
              ₹{format(results.net_cost_inr)}
            </span>
          </div>
        </div>

        {/* Right column stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {(results?.sizing_method === "bill" ||
            results?.sizing_method === "units") && (
              <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10 shadow-md">
                <p className="text-xs sm:text-sm text-gray-400">
                  With grid daily consumption
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-green-400">
                  {format(results.daily_unit)}
                </p>
              </div>
            )}
          <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10">
            <p className="text-xs sm:text-sm text-gray-400">
              Solar Units Produced
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-green-400">
              {format(results.daily_gen_kwh)}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10">
            <p className="text-xs sm:text-sm text-gray-400">Panels Required</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-green-400">
              {results.panel_count}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-white/10">
            <p className="text-xs sm:text-sm text-gray-400">
              Total Area Needed
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-green-400">
              {format(results.roof_needed_sqft)} {results.roof_area_unit}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-white/10 shadow-md col-span-1 lg:col-span-2 flex flex-col items-center">
          <h3 className="text-sm sm:text-base md:text-lg font-bold mb-4">
            30-Year Economics
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={mode === "grid" ? gridData : solarData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={70}
                // ✅ Show labels only on medium+ screens
                label={
                  window.innerWidth >= 640
                    ? ({ value }) => `₹${format(value)}`
                    : false
                }
              >
                {(mode === "grid" ? gridData : solarData).map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1a1a1a] border border-green-500 rounded-lg p-2 shadow-md">
                        <p className="text-green-400 font-semibold text-sm mb-1">
                          {label}
                        </p>
                        {payload.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center gap-2"
                          >
                            <span className="text-white text-xs">
                              {entry.name}:
                            </span>
                            <span className="bg-green-500 text-black font-bold text-xs px-2 py-0.5 rounded-md">
                              ₹{Number(entry.value).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend wrapperStyle={{ fontSize: "0.75rem", color: "white" }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setMode("solar")}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${mode === "solar"
                  ? "bg-green-500 text-black"
                  : "bg-[#111] text-green-400 border border-green-500"
                }`}
            >
              With Solar
            </button>
            {(results?.sizing_method === "bill" ||
              results?.sizing_method === "units") && (
                <button
                  onClick={() => setMode("grid")}
                  className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${mode === "grid"
                      ? "bg-green-500 text-black"
                      : "bg-[#111] text-green-400 border border-green-500"
                    }`}
                >
                  With Grid
                </button>
              )}
          </div>
        </div>
      </div>

      {/* ---- System Configuration Section ---- */}
      {(results?.inverter_options?.length > 0 ||
        results?.string_design ||
        results?.battery_options?.length > 0) &&
        results.sizing_method !== "rwa" && (
          <div className="mt-8 bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-md">
            <h3 className="text-xl font-bold text-green-400 mb-4">
              ⚙️ System Configuration
            </h3>

            {/* Inverter Options */}
            {results?.inverter_options?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-2 text-center md:text-left">
                  Inverter Options
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.inverter_options.map((inv, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-white/10 bg-[#111]"
                    >
                      <p className="text-green-400 font-semibold">
                        {inv.inverter_size_kw} kW ({inv.phase})
                      </p>
                      <p className="text-sm text-gray-400">
                        DC/AC Ratio: {inv.dc_ac_ratio}
                      </p>
                      <p className="text-sm text-gray-400">
                        Bus Voltage: {inv.bus_voltage} V
                      </p>
                      <p className="text-xs text-gray-500 italic">{inv.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKU Recommendation */}
            {results?.inverter_options?.length > 0 &&
              (() => {
                // Filter valid inverter options
                const validSkus = results.inverter_options.filter(
                  (inv) => inv.dc_ac_ratio <= 1
                );

                if (validSkus.length === 0) return null; // nothing valid → show nothing

                return (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-2 text-center md:text-left">
                      Recommended SKU
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {validSkus.map((inv, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg border border-white/10 bg-[#111]"
                        >
                          <p className="text-green-400 font-semibold">
                            {inv.inverter_size_kw} kW ({inv.phase})
                          </p>
                          <p className="text-sm text-gray-400">
                            DC/AC Ratio: {inv.dc_ac_ratio}
                          </p>
                          <p className="text-sm text-gray-400">
                            Bus Voltage: {inv.bus_voltage} V
                          </p>
                          <p className="text-xs text-gray-500 italic">
                            {inv.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

            {/* String Design */}
            {results?.string_design && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-green-400 mb-2 text-center md:text-left">
                    String Design
                  </h4>

                  {/* Info button with tooltip */}
                  <div className="relative group">
                    <Info className="w-4 h-4 text-blue-400 cursor-pointer mb-1" />
                    <div className="absolute left-6 top-0 w-72 bg-black text-gray-300 text-justify text-xs rounded-lg shadow-lg p-3 border border-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      String sizing is calculated based on the panel’s
                      open-circuit voltage (Voc), inverter’s maximum DC input
                      voltage (usually 1000 V for residential/commercial and
                      1500 V for utility-scale), and a{" "}
                      <span className="font-semibold">20% safety margin</span>
                      to account for bifacial gain and low-temperature
                      conditions.
                    </div>
                  </div>
                </div>

                {/* ✅ New line with system summary */}
                <p className="text-sm text-gray-400 mb-3 text-center md:text-left">
                  ( For a recommended system of{" "}
                  <span className="text-green-400 font-semibold">
                    {format(results.final_dc_kw)} kW
                  </span>{" "}
                  using{" "}
                  <span className="text-green-400 font-semibold">
                    {results.panel_count}
                  </span>{" "}
                  panels )
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Single MPPT */}
                  <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                    <p className="font-semibold text-green-400">Single MPPT</p>
                    {results.string_design.single_mppt?.message ? (
                      <p className="text-sm text-red-400">
                        {results.string_design.single_mppt.message}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-400">
                          {results.string_design.single_mppt.panels_per_string}{" "}
                          panels per string
                        </p>
                        <p className="text-xs text-gray-500">
                          Voc_cold -{" "}
                          {results.string_design.single_mppt.voc_total} V, Vmp -{" "}
                          {results.string_design.single_mppt.vmp_total} V, Isc -{" "}
                          {results.string_design.single_mppt.isc_total} A
                        </p>
                      </>
                    )}
                  </div>

                  {/* Dual MPPT */}
                  {results.panel_count > 6 && (
                    <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                      <p className="font-semibold text-green-400">Dual MPPT</p>
                      {results.string_design.dual_mppt.map((mppt, idx) => (
                        <p key={idx} className="text-sm text-gray-400">
                          MPPT {mppt.mppt}: {mppt.panels_per_string} panels →
                          Voc_cold - {mppt.voc_total} V, Vmp - {mppt.vmp_total}{" "}
                          V, Isc - {mppt.isc_total} A
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Battery Options */}
            {results?.battery_options?.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-green-400 mb-2 text-center md:text-left">
                  Battery Options
                </h4>

                {/* ✅ New line with system summary */}
                <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 text-center md:text-left">
                  ( For a recommended system of{" "}
                  <span className="text-green-400 font-semibold">
                    {format(results.final_dc_kw)} kW
                  </span>{" "}
                  using{" "}
                  <span className="text-green-400 font-semibold">
                    {results.panel_count}
                  </span>{" "}
                  panels — Max battery capacity supported:{" "}
                  <span className="text-green-400 font-semibold">
                    {results.battery_options[0].max_battery_ah} Ah
                  </span>{" "}
                  )
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border border-white/10 rounded-lg overflow-hidden">
                    <thead className="bg-[#111] text-gray-300">
                      <tr>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Type
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Capacity
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Usable (kWh)
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Backup (Ess.)
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Backup (+1 AC)
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Backup (+2 ACs)
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Max Batteries
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Charge Time
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Connection
                        </th>
                        <th className="px-2 sm:px-3 py-1 sm:py-2 text-left">
                          Trade-off
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.battery_options
                        .filter((bat) => bat.max_batteries_per_day > 0)
                        .map((bat, idx) => (
                          <tr
                            key={idx}
                            className={`border-t border-white/10 ${bat.recommended
                                ? "bg-green-900/20"
                                : "bg-[#1a1a1a]"
                              }`}
                          >
                            <td className="px-2 sm:px-3 py-1 sm:py-2 font-semibold text-green-400 whitespace-nowrap">
                              {bat.type}
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300 whitespace-nowrap">
                              {bat.ah}Ah ({bat.nominal} kWh)
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300">
                              {bat.usable}
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300 whitespace-nowrap">
                              {bat.backup.essentials} hrs
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300 whitespace-nowrap">
                              {bat.backup.one_ac} hrs
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300 whitespace-nowrap">
                              {bat.backup.two_acs} hrs
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300">
                              {bat.max_batteries_per_day}
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300">
                              {bat.charge_time} hrs
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-300">
                              {bat.connection}
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-gray-400 italic">
                              {bat.tradeoff}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      {/* Disclaimer Section */}
      {Array.isArray(results?.disclaimer) && results.disclaimer.length > 0 && (
        <div className="mt-6 bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          {/* <h3 className="text-lg font-bold mb-2 text-green-400">Subsidy Guidelines</h3> */}
          <div className="space-y-3 text-sm text-gray-300">
            {results.disclaimer.map((block, idx) => {
              // --- Headings ---
              if (block.type === "heading") {
                const level = block.level || 4;

                // Map levels to actual JSX elements
                const HeadingTag =
                  level === 1
                    ? "h1"
                    : level === 2
                      ? "h2"
                      : level === 3
                        ? "h3"
                        : level === 4
                          ? "h4"
                          : level === 5
                            ? "h5"
                            : "h6";

                const headingStyles = {
                  h1: "text-2xl font-bold text-green-400 mt-4",
                  h2: "text-xl font-bold text-green-400 mt-4",
                  h3: "text-lg font-bold text-green-400 mt-3",
                  h4: "text-md font-bold text-green-400 mt-3",
                  h5: "text-sm font-bold text-green-400 mt-2",
                  h6: "text-xs font-bold text-green-400 mt-2",
                };

                return (
                  <HeadingTag key={idx} className={headingStyles[HeadingTag]}>
                    {block.children.map((child, cIdx) => {
                      let text = child.text || "";
                      return (
                        <span
                          key={cIdx}
                          className={`${child.bold ? "font-bold" : ""} ${child.underline ? "underline" : ""
                            }`}
                        >
                          {text}
                        </span>
                      );
                    })}
                  </HeadingTag>
                );
              }

              // --- Paragraphs ---
              if (block.type === "paragraph") {
                // Check if all children are empty strings → treat as a line break
                const isEmpty =
                  !block.children ||
                  block.children.every((c) => !c.text || c.text.trim() === "");

                if (isEmpty) {
                  return <br key={idx} />;
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {block.children.map((child, cIdx) => {
                      let text = child.text || "";

                      if (text.includes("\n")) {
                        return text.split("\n").map((part, i) => (
                          <span key={i} className="whitespace-pre-wrap">
                            {part}
                            <br />
                          </span>
                        ));
                      }

                      return (
                        <span
                          key={cIdx}
                          className={`${child.bold ? "font-bold" : ""} ${child.underline ? "underline" : ""
                            } whitespace-pre-wrap`} // ✅ Keep indentation visible
                        >
                          {text}
                        </span>
                      );
                    })}
                  </p>
                );
              }

              // Render lists
              if (block.type === "list") {
                const ListTag = block.format === "ordered" ? "ol" : "ul";
                return (
                  <ListTag
                    key={idx}
                    className="list-disc list-inside space-y-1 ml-4"
                  >
                    {block.children.map((li, liIdx) => (
                      <li key={liIdx}>
                        {li.children.map((child, cIdx) => (
                          <span
                            key={cIdx}
                            className={`${child.bold ? "font-bold" : ""} ${child.underline ? "underline" : ""
                              }`}
                          >
                            {child.text}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ListTag>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}

      {/* <button className="mt-6 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg transition">
        Download Full Report
      </button> */}
    </div>
  );
}
