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
    const overallSubsidyCap = results?.rwa_overall_subsidy_cap;

    if (numHouses && proposed && perHouseSanctioned) {
      // max subsidy-eligible capacity per rules
      const perHouseLimit = numHouses * Math.min(perHouseSanctioned || 0, perHouseCap);
      const eligibleCap = Math.min(proposed, Math.min(overallSubsidyCap, perHouseLimit));

      if (eligibleCap < proposed) {
        addNote(
          "warning",
          `Subsidy is available only up to ${eligibleCap} kW. Your proposed system is ${proposed} kW, so the extra ${proposed - eligibleCap} kW will not receive subsidy (to be paid from your pocket).`
        );
      } else {
        addNote(
          "info",
          `Your proposed system of ${proposed} kW is fully eligible for subsidy rules (up to ${perHouseCap} kW per house and ${overallSubsidyCap} kW per society).`
        );
      }
    }

    // Extra helper notes

    // A) Per-house above 3 kW
    if (perHouseSanctioned && perHouseSanctioned > perHouseCap) {
      addNote(
        "info",
        `You entered ${perHouseSanctioned} kW per house, but subsidy is capped at ${perHouseCap} kW per house. Extra capacity per house is not subsidized.`
      );
    }

    // B) Society sanctioned load lower than proposed
    if (societySanctioned && proposed && societySanctioned < proposed) {
      addNote(
        "warning",
        `Your society sanctioned load is ${societySanctioned} kW, but the proposed system is ${proposed} kW. Subsidy can only be claimed up to your sanctioned load. Please upgrade sanctioned load to claim subsidy on the full system.`
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
      const roofNeeded = results.roof_needed_sqft;
      console.log("entered the if condition", roofNeeded);
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = results.roof_area_available;
        console.log("entered the second if condition", roofAvailable);
        if (roofAvailable < roofNeeded) {
          console.log("this is third the rooftop things to be compared", roofAvailable, roofNeeded)
          addNote(
            "warning",
            `You provided ${roofAvailable} ${results.roof_area_unit} rooftop area, but ${roofNeeded} ${results.roof_area_unit} is required for the system.`
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
    <div className="col-span-2 p-4 mt-8 space-y-4 sticky top-24 self-start">
      {/* ✅ Permanent Important Notes from state data */}
      {results?.importantNotes?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">📌 State Important Notes</h2>
          <div className="space-y-3">
            {results.importantNotes.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-yellow-500 text-yellow-300 bg-black/40 shadow-sm"
              >
                {/* <Info className="w-5 h-5 text-yellow-400 mt-0.5" /> */}
                <p className="text-sm leading-snug">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">🚨 Alert</h2>
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 shadow-sm ${getStyles(
                  note.type
                )}`}
              >
                {/* {getIcon(note.type)} */}
                <p className="text-sm leading-snug">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Schedule Call CTA Button */}
      <div className="text-center">
        <a
          href="/contact"
          className="block w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                   text-black font-bold py-3 px-4 rounded-xl shadow-lg 
                   hover:scale-[1.03] hover:shadow-green-500/40 
                   transition transform duration-300"
        >
          🤝 Want to Bargain the Cost?
          <span className="block text-sm font-normal text-green-100">
            Schedule a call & crack the best deal
          </span>
        </a>
      </div>

      {/* ✅ Flashing DISCOM Portal Link Box */}
      <div className="flex items-start gap-3 p-3 rounded-lg border border-green-500 text-green-300 animate-[pulse-alert-blue_1.5s_infinite]">
        <Info className="w-5 h-5 text-green-400" />
        <p className="text-sm leading-snug">
          Link:{" "}
          <a
            href="https://api.solarrooftop.gov.in/grid_others/discomPortalLink"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-200"
          >
            Official DISCOM Subsidy Portal
          </a>
        </p>
      </div>

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
