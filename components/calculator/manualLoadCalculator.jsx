"use client";
import { useState, useEffect } from "react";
import { toWatts, wToKw } from "@/lib/powerConversions";

export default function ManualLoadCalculator({ formData, setFormData }) {
  const [items, setItems] = useState([
    { name: "LED Bulb", value: 10, unit: "W", qty: 1 },
    { name: "Ceiling Fan", value: 75, unit: "W", qty: 1 },
    { name: "Refrigerator", value: 200, unit: "W", qty: 1 },
    { name: "Television", value: 120, unit: "W", qty: 1 },
    { name: "Mobile Charger", value: 10, unit: "W", qty: 1 },
    { name: "WiFi Router", value: 20, unit: "W", qty: 1 },
    { name: "Washing Machine", value: 600, unit: "W", qty: 1 },
    { name: "Mixer/Grinder", value: 500, unit: "W", qty: 1 },
    { name: "Water Pump", value: 0.5, unit: "HP", qty: 1 },
    { name: "Air Conditioner", value: 1, unit: "TON", qty: 1 },
  ]);

  const [totalWatts, setTotalWatts] = useState(0);

  useEffect(() => {
    let sum = 0;
    items.forEach((it) => {
      sum += toWatts(it.value, it.unit) * (it.qty || 1);
    });
    setTotalWatts(sum);
    setFormData({ ...formData, loadItems: items, plant_size_kw: wToKw(sum) });
  }, [items]);

  const handleChange = (idx, field, val) => {
    const newItems = [...items];
    newItems[idx][field] = field === "qty" ? Number(val) : val;
    setItems(newItems);
  };

  const addRow = () => {
    if (items.length >= 10) return;
    setItems([...items, { name: "", value: 0, unit: "W", qty: 1 }]);
  };

  const removeRow = (idx) => {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
  };

  return (
    <div className="space-y-1">
      <h3 className="text-lg font-bold text-green-400 text-xs sm:text-base">
        Design Your Perfect Solar Fit
      </h3>
      <p className="text-xs sm:text-sm text-gray-400 mb-2">
        Select your essentials, get the right solar.
      </p>

      {/* ✅ Column Headings */}
      <div className="grid grid-cols-[2fr_4rem_4rem_3rem_2rem] sm:grid-cols-[1fr_5rem_6rem_4rem_2rem] gap-2 font-semibold text-green-400 text-center text-xs sm:text-sm">
        <div>Appliance</div>
        <div>Input</div>
        <div>Unit</div>
        <div>Qty</div>
      </div>

      {items.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[2fr_4rem_4rem_3rem_2rem] sm:grid-cols-[1fr_5rem_6rem_4rem_2rem] gap-2 items-center py-1 sm:py-2 text-xs sm:text-sm"
        >
          {/* Appliance Name */}
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
            className="px-2 py-1 rounded bg-black border border-green-500 text-white w-full"
            placeholder="Appliance"
          />

          {/* Value */}
          <input
            type="number"
            value={item.value}
            onChange={(e) => handleChange(idx, "value", Number(e.target.value))}
            className="px-2 py-1 rounded bg-black border border-green-500 text-white w-full"
            placeholder="Value"
          />

          {/* Unit */}
          <select
            value={item.unit}
            onChange={(e) => handleChange(idx, "unit", e.target.value)}
            className="px-2 py-1 rounded bg-black border border-green-500 text-white w-full"
          >
            <option value="W">W</option>
            <option value="kW">kW</option>
            <option value="HP">HP</option>
            <option value="TON">Ton</option>
            <option value="A_1PH">Amps (1φ)</option>
            <option value="A_3PH">Amps (3φ)</option>
            <option value="kVA">kVA</option>
          </select>

          {/* Qty */}
          <input
            type="number"
            value={item.qty}
            onChange={(e) => handleChange(idx, "qty", Number(e.target.value))}
            className="px-2 py-1 rounded bg-black border border-green-500 text-white w-full"
            placeholder="Qty"
          />

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeRow(idx)}
            className="text-red-400 cursor-pointer hover:text-red-500 hover:scale-110 transition-transform justify-self-center"
            title="Remove appliance"
          >
            ✕
          </button>
        </div>
      ))}

      {/* Add row button */}
      <button
        type="button"
        onClick={addRow}
        disabled={items.length >= 10}
        className={`px-3 py-1 rounded text-xs sm:text-sm transition ${
          items.length >= 10
            ? "bg-gray-700 text-gray-400 cursor-not-allowed flex items-center gap-2"
            : "bg-green-600 text-black hover:bg-green-500"
        }`}
      >
        {items.length >= 10 ? (
          <>
            <span>Limit Reached</span>
            <span className="text-yellow-400">↺</span>
          </>
        ) : (
          "+ Add Appliance"
        )}
      </button>

      {/* Total load */}
      <div className="text-xs sm:text-sm text-gray-300 mt-3">
        🔌{" "}
        <span className="text-green-400 font-bold">
          Total Load = {totalWatts} W
        </span>{" "}
        ( ≈ {wToKw(totalWatts)} kW)
      </div>
    </div>
  );
}
