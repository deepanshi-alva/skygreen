"use client";

import { AlertTriangle, Info } from "lucide-react";

export default function RightAds({ results }) {
  const notes = [];

  // helper to format numbers
  const formatNum = (num) => {
    if (num == null || isNaN(num)) return num;
    return Number(num).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const addNote = (type, text) => notes.push({ type, text });

  if (results?.is_rwa) {
    // --- RWA subsidy logic ---

    const numHouses = results?.num_houses || results?.user_num_houses;
    const proposed = results?.recommended_kw || results?.user_proposed_capacity;
    const societySanctioned = results?.user_society_sanctioned_load;
    const perHouseSanctioned = results?.user_per_house_sanctioned_load;
    const perHouseCap = results?.rwa_per_house_cap_kw; // e.g., 3 or 10 depending on state

    // 1) Per-house sanctioned load too low
    if (numHouses && perHouseSanctioned && proposed) {
      const subsidyCap = numHouses * perHouseSanctioned;
      if (subsidyCap < proposed) {
        addNote(
          "warning",
          `With ${numHouses} houses and ${perHouseSanctioned} kW per house, subsidy is limited to ${subsidyCap} kW. To claim subsidy on full ${proposed} kW, increase per-house sanctioned load to at most ${perHouseCap} kW (as per state rule).`
        );
      }
    }

    // 2) Society sanctioned load lower than proposed
    if (societySanctioned && proposed && societySanctioned < proposed) {
      addNote(
        "warning",
        `Your society sanctioned load is ${societySanctioned} kW, but the proposed system is ${proposed} kW. Please upgrade sanctioned load to at least ${proposed} kW to avail full subsidy.`
      );
    }

    // 3) Per-house sanctioned load above state cap
    if (perHouseSanctioned && perHouseCap && perHouseSanctioned > perHouseCap) {
      addNote(
        "info",
        `You entered ${perHouseSanctioned} kW per house, but subsidy is capped at ${perHouseCap} kW per house in ${results?.state}. Extra capacity will not be subsidized.`
      );
    }

  } else {
    // --- Residential Notes ---
    if (results?.sanctioned_load_must_be && results?.sanctioned_load_must_be > 0) {
      const userLoad = results?.user_sanctioned_load || 1;
      const requiredLoad = results.sanctioned_load_must_be;
      if (requiredLoad > userLoad) {
        addNote(
          "warning",
          `You provided ${userLoad} kW sanctioned load, but the recommended system is ${results.recommended_kw} kW. Please upgrade your sanctioned load to ${requiredLoad} kW.`
        );
      }
    }

    if (results?.roof_needed_sqft) {
      const roofNeeded = formatNum(results.roof_needed_sqft);
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = formatNum(results.roof_area_available);
        if (roofAvailable < roofNeeded) {
          addNote(
            "warning",
            `You provided ${roofAvailable} ${results.roof_area_unit} sqft rooftop area, but ${roofNeeded} ${results.roof_area_unit} is required for the system.`
          );
        }
      } else {
        addNote("info", `For this system, approx. ${roofNeeded} sqft rooftop area is required.`);
      }
    }
  }

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
      {notes.length > 0 && (
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

      {/* Sponsored Section (always visible) */}
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
