"use client";

import { AlertTriangle, Info } from "lucide-react";

export default function RightAds({ results }) {
  const notes = [];

  // helper to format numbers to 2 decimals (but avoid ".00" if integer)
  const formatNum = (num) => {
    if (num == null || isNaN(num)) return num;
    const rounded = Number(num).toFixed(2);
    return parseFloat(rounded); // removes trailing .00
  };

  // --- Sanctioned Load Check ---
  if (results?.sanctioned_load_must_be && results?.sanctioned_load_must_be > 0) {
    const userLoad = formatNum(results?.user_sanctioned_load) || 1;
    const requiredLoad = formatNum(results.sanctioned_load_must_be);

    if (requiredLoad > userLoad) {
      notes.push({
        type: "warning",
        text: `You provided ${userLoad} kW sanctioned load, but the recommended system is ${formatNum(
          results.recommended_kw
        )} kW. Please upgrade your sanctioned load to ${requiredLoad} kW.`,
      });
    }
  }

  // --- Rooftop Area Check ---
  if (results?.roof_needed_sqft) {
    const roofNeeded = formatNum(results.roof_needed_sqft);
    if (results?.roof_area_available && results.roof_area_available > 0) {
      const roofAvailable = formatNum(results.roof_area_available);
      if (roofAvailable < roofNeeded) {
        notes.push({
          type: "warning",
          text: `You provided ${roofAvailable} sqft rooftop area, but ${roofNeeded} sqft is required for the system.`,
        });
      }
    } else {
      notes.push({
        type: "info",
        text: `For this system, approx. ${roofNeeded} sqft rooftop area is required.`,
      });
    }
  }

  // ✅ Don’t add success message, just leave notes empty if no issues

  const getStyles = (type) => {
    switch (type) {
      case "warning":
        return "border-red-500 text-red-300 animate-[pulse-alert-red_1.5s_infinite]";
      case "info":
        return "border-blue-500 text-blue-300 animate-[pulse-alert-blue_1.5s_infinite]";
      default:
        return "bg-gray-900/30 border-gray-500 text-gray-300";
    }
  };


  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="col-span-2 p-4 space-y-4 sticky top-24 self-start">
      {/* Render only if there are actual notes */}
      {notes.length > 0 && !results?.is_rwa && (
        <div>
          <h2 className="text-xl font-bold mb-2">🚨 Important Notes</h2>

          <div className="space-y-3">
            {notes.map((note, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 shadow-sm ${getStyles(
                  note.type
                )}`}
              >
                {getIcon(note.type)}
                <p className="text-sm leading-snug">{note.text}</p>
              </div>

            ))}
          </div>
        </div>
      )}

      {/* Ads section (always visible) */}
      <h2 className="text-xl font-bold mt-6">Sponsored</h2>
      <div className="bg-black/70 p-4 rounded-xl border border-green-500 hover:shadow-lg transition">
        <p className="font-bold">SKYGREEN Premium Panels</p>
        <p className="text-sm">High-efficiency 575W TOPCon. Limited offer.</p>
      </div>
      <div className="bg-black/70 p-4 rounded-xl border border-green-500 hover:shadow-lg transition">
        <p className="font-bold">Referral Program</p>
        <p className="text-sm">Earn ₹5,000 by referring a friend.</p>
      </div>
    </div>
  );
}
