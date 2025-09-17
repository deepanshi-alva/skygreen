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

export default function CenterOutput({ results }) {
  const [mode, setMode] = useState("solar");

  if (!results) {
    return (
      <div className="col-span-7 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">
            🌞 Every rooftop can be a power plant!
          </p>
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

  // console.log("this is the sizing method", results.sizing_method)

  const format = (value) => {
    if (typeof value !== "number") return value;
    return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const COLORS = ["#e60707ff", "#22c55e"];

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
      {/* Header row with title + Contact Us button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Solar payback, simplified</h2>
        <a
          href="/contact"
          className="px-5 py-2 rounded-lg bg-green-500 text-black font-bold shadow-md hover:bg-green-400 hover:scale-105 transition transform"
        >
          ❓ Have a query? Let’s Talk
        </a>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Recommended System */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Recommended System</p>
          <p className="text-2xl font-bold text-green-400 break-all">
            {format(results.final_dc_kw)} kW
          </p>
        </div>

        {/* Monthly Saving */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Estimated Monthly Saving</p>
          <p className="text-2xl font-bold text-green-400 break-all">
            ₹{format(results.monthly_saving_inr)}
          </p>
        </div>

        {/* Yearly Saving */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Estimated Yearly Saving</p>
          <p className="text-2xl font-bold text-green-400 break-all">
            ₹{format(results.annual_saving_inr)}
          </p>
        </div>

        {/* Payback Period */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
          <p className="text-sm text-gray-400">Payback Period</p>
          <p className="text-2xl font-bold text-green-400 break-all">
            {results?.payback_years?.toFixed(1)} years
          </p>
        </div>
      </div>

      {/* Middle Row → Subsidy Overview + 4 small stat boxes */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* Subsidy Overview card (big) */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-md col-span-1">
          {/* <h3 className="text-lg font-bold mb-4">Subsidy Overview</h3> */}
          <div className="flex items-center justify-center mb-8 mt-2">
            <div>
              <p className="text-sm text-gray-400 text-center text-[1.5rem]">
                Gross Plant Cost
              </p>
              <p className="text-3xl font-bold text-green-400 text-center whitespace-nowrap text-[clamp(1rem,2vw,2rem)]">
                ₹{format(results.gross_cost_inr)}
              </p>
            </div>
          </div>

          {results?.eligibleKw > 0 && (
            <div className="flex items-center justify-center">
              <p className="text-md text-gray-300">
                Eligible Subsidy : <span>{format(results.eligibleKw)}</span> KW
              </p>
            </div>
          )}

          <hr className="border-white/10 my-2" />

          <div className="space-y-2">
            {/* <div className="flex justify-between text-sm">
              <span className="text-gray-300 mr-1">Gross Plant Cost</span>
              <span className="font-semibold text-white break-all">₹{format(results.gross_cost_inr)}</span>
            </div> */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Central Subsidy</span>
              <span className="font-semibold text-white break-all">
                - ₹{format(results.central_subsidy_inr)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">State Subsidy</span>
              <span className="font-semibold text-white break-all">
                - ₹{format(results.state_subsidy)}
              </span>
            </div>
            <hr className="border-white/10 my-2" />
            <div className=" flex flex-col mt-8 justify-center items-center text-sm">
              <span className="text-gray-300 text-[1rem] text-center font-semibold">
                Net Cost (After Subsidy)
              </span>
              <span className="font-semibold mt-2 text-center text-4xl text-green-400 whitespace-nowrap text-[clamp(1rem,2vw,2rem)]">
                ₹{format(results.net_cost_inr)}
              </span>
            </div>
          </div>
        </div>

        {/* Right column → 4 small stat boxes */}
        <div className="grid grid-cols-1 gap-4">
          {(results?.sizing_method === "bill" ||
            results?.sizing_method === "units") && (
            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
              <p className="text-sm text-gray-400">
                With grid daily consumption
              </p>
              <p className="text-xl font-bold text-green-400 break-all">
                {format(results.daily_unit)}
              </p>
            </div>
          )}

          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Solar Units Produced</p>
            <p className="text-xl font-bold text-green-400 break-all">
              {format(results.daily_gen_kwh)}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Panels Required</p>
            <p className="text-xl font-bold text-green-400 break-all">
              {results.panel_count}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10 shadow-md">
            <p className="text-sm text-gray-400">Total Area Needed</p>
            <p className="text-xl font-bold text-green-400 break-all">
              {format(results.roof_needed_sqft)} {results.roof_area_unit}
            </p>
          </div>
        </div>

        {/* Pie + Buttons */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-md pt-10 col-span-2 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">30-Year Economics</h3>
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
                label={({ value }) => `₹${format(value)}`}
                labelLine={{ stroke: "white", strokeWidth: 1.5 }}
                fontSize={16}
                fill="white"
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
                formatter={(val, name) => [
                  `₹${Number(val).toLocaleString("en-IN")}`, // ✅ Adds commas (Indian format)
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #22c55e",
                  color: "white",
                }}
                itemStyle={{ color: "white" }}
                labelStyle={{ color: "white" }}
              />
              <Legend
                wrapperStyle={{ color: "white" }}
                iconType="rect"
                formatter={(value) => (
                  <span style={{ color: "white", fontSize: "14px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Toggle buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setMode("solar")}
              className={`px-4 py-1 rounded-md font-semibold ${
                mode === "solar"
                  ? "bg-green-500 text-black"
                  : "bg-[#111] text-green-400 border border-green-500"
              }`}
            >
              With Solar
            </button>
            {/* Show With Grid only if not RWA or plant_size */}
            {(results?.sizing_method === "bill" ||
              results?.sizing_method === "units") && (
              <button
                onClick={() => setMode("grid")}
                className={`px-4 py-1 rounded-md font-semibold ${
                  mode === "grid"
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
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
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
            {results?.nearest_sku && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  Recommended SKU
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4  rounded-lg bg-[#111]">
                    <p className="text-green-400 font-semibold">Nearest SKU</p>
                    <p className="text-sm text-gray-400">
                      {results.nearest_sku.inverter_kw} kW (
                      {results.nearest_sku.phase})
                    </p>
                    <p className="text-sm text-gray-400">
                      DC/AC Ratio: {results.nearest_sku.dc_ac_ratio}
                    </p>
                    <p className="text-sm text-gray-400">
                      Bus Voltage: {results.nearest_sku.bus_voltage} V
                    </p>
                    <p className="text-xs text-gray-500">
                      {results.nearest_sku.note}
                    </p>
                  </div>
                  {results?.wider_sku && (
                    <div className="p-4 border border-white/10 rounded-lg bg-[#111]">
                      <p className="text-yellow-400 font-semibold">Wider SKU</p>
                      <p className="text-sm text-gray-400">
                        {results.wider_sku.inverter_kw} kW (
                        {results.wider_sku.phase})
                      </p>
                      <p className="text-sm text-gray-400">
                        DC/AC Ratio: {results.wider_sku.dc_ac_ratio}
                      </p>
                      <p className="text-sm text-gray-400">
                        Bus Voltage: {results.wider_sku.bus_voltage} V
                      </p>
                      <p className="text-xs text-gray-500">
                        {results.wider_sku.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* "string_design": {
        "single_mppt": {
            "mppt_mode": "single",
            "panels_per_string": 7,
            "strings_used": 1,
            "panels_connected": 7,
            "voc_total": "397.6",
            "vmp_total": "306.7",
            "isc_total": "13.8",
            "max_parallel_strings": 2
        },
        "dual_mppt": [
            {
                "mppt": 1,
                "panels_per_string": 3,
                "voc_total": "170.4",
                "vmp_total": "131.5",
                "isc_total": "13.8"
            },
            {
                "mppt": 2,
                "panels_per_string": 4,
                "voc_total": "227.2",
                "vmp_total": "175.3",
                "isc_total": "13.8"
            }
        ]
    }, */}

            {/* String Design */}
            {results?.string_design && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  String Design
                </h4>
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
                          Voc - {results.string_design.single_mppt.voc_total} V,
                          Vmp - {results.string_design.single_mppt.vmp_total} V,
                          Isc - {results.string_design.single_mppt.isc_total} A
                        </p>
                      </>
                    )}
                  </div>

                  {/* Dual MPPT */}
                  <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                    <p className="font-semibold text-green-400">Dual MPPT</p>
                    {results.string_design.dual_mppt.map((mppt, idx) => (
                      <p key={idx} className="text-sm text-gray-400">
                        MPPT {mppt.mppt}: {mppt.panels_per_string} panels → Voc{" "}
                        {mppt.voc_total} V, Vmp {mppt.vmp_total} V, Isc{" "}
                        {mppt.isc_total} A
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Battery Options */}
            {results?.battery_options?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  Battery Options
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.battery_options.map((bat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-white/10 bg-[#111]"
                    >
                      <p className="text-green-400 font-semibold">
                        {bat.type} (Bus: {bat.bus_voltage}V)
                      </p>
                      <p className="text-sm text-gray-400">
                        Recommended Range: {bat.min_recommended.kwh} –{" "}
                        {bat.max_recommended.kwh} kWh
                      </p>
                      {Object.entries(bat.connection).map(
                        ([key, conn], cIdx) => (
                          <div key={cIdx} className="mt-2">
                            <p className="text-xs text-yellow-400">
                              {conn.note}
                            </p>
                            {conn.skus.map((sku, sIdx) => (
                              <p key={sIdx} className="text-xs text-gray-400">
                                {sku.type} {sku.ah}Ah → {sku.usable_kwh} kWh
                                usable
                              </p>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  ))}
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
                          className={`${child.bold ? "font-bold" : ""} ${
                            child.underline ? "underline" : ""
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
                          className={`${child.bold ? "font-bold" : ""} ${
                            child.underline ? "underline" : ""
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
                            className={`${child.bold ? "font-bold" : ""} ${
                              child.underline ? "underline" : ""
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
