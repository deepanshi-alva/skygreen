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
    const perHouseSanctioned = results?.user_per_house_sanctioned_load || 1;
    const rawPerHouseSanctioned = results?.user_per_house_sanctioned_loader;
    const perHouseCap = results?.rwa_per_house_cap_kw; // e.g., 3 or 10 depending on state
    const overallSubsidyCap = results?.rwa_overall_subsidy_cap;
    // calculate per-house limited capacity
    const perHouseLimit = numHouses ? numHouses * Math.min(perHouseSanctioned, perHouseCap) : 0;

    if (numHouses && proposed && societySanctioned && proposed > societySanctioned) {
      console.log("entered 1");

      const capByHouses = Math.min(numHouses * 1, overallSubsidyCap);
      const remaining = proposed - capByHouses;

      addNote(
        "warning",
        `Your proposed system is ${proposed} kW but your subsidy is capped at ${capByHouses} kW.${remaining > 0
          ? ` Remaining ${remaining} kW will not receive subsidy i.e. you have to pay for that from your pocket.`
          : ` To avail the full subsidy of ${overallSubsidyCap} kW, consider increasing the per-house sanctioned load (max allowed is ${perHouseCap} kW per house).`
        }`
      );
    }
    else if (numHouses && societySanctioned) {
      console.log("entered 2");

      const capByHouses = Math.min(numHouses * 1, overallSubsidyCap);
      const remaining = proposed - capByHouses;

      addNote(
        "warning",
        `Your proposed system is ${proposed} kW but your subsidy is capped at ${capByHouses} kW.${remaining > 0
          ? ` Remaining ${remaining} kW will not receive subsidy i.e. you have to pay for that from your pocket.`
          : ` To avail the full subsidy of ${overallSubsidyCap} kW, consider increasing the per-house sanctioned load (max allowed is ${perHouseCap} kW per house).`
        }`
      );
    }
    else if (numHouses && perHouseSanctioned) {
      console.log("entered 4")
      const calculatedSystem = numHouses * perHouseSanctioned;
      const eligibleCap = Math.min(calculatedSystem, overallSubsidyCap);
      addNote(
        "info",
        `We calculated your proposed system as ${numHouses} houses × ${perHouseSanctioned} kW = ${calculatedSystem} kW. 
          Based on current rules, your subsidy is eligible up to ${eligibleCap} kW${eligibleCap < overallSubsidyCap
          ? `. To avail the full subsidy of ${overallSubsidyCap} kW, consider increasing the per-house sanctioned load (max allowed is ${perHouseCap} kW per house).`
          : "."
        }`
      );
    }
    else if (proposed && proposed != overallSubsidyCap) {
      console.log("entered 3", proposed)
      addNote(
        "warning",
        `Your proposed system is ${proposed} kW and your subsidy is capped at ${overallSubsidyCap} kW.${proposed > overallSubsidyCap
          ? ` Remaining ${proposed - overallSubsidyCap} kW will not receive subsidy i.e. you have to pay for that from your pocket.`
          : proposed < overallSubsidyCap
            ? ` If you want to gain the full subsidy benefit, increase your proposed system size up to ${overallSubsidyCap} kW.`
            : ""
        }`
      );
    }
    
    if (results?.roof_needed_sqft) {
      const roofNeeded = results.roof_needed_sqft;
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = results.roof_area_available;
        if (roofAvailable < roofNeeded) {
          addNote(
            "warning",
            `You provided ${roofAvailable} ${results.roof_area_unit} rooftop area, but ${formatNum(roofNeeded)} ${results.roof_area_unit} is required for the system.`
          );
        }
      } else {
        addNote("info", `For this system, approx. ${roofNeeded} sqft rooftop area is required.`);
      }
    }
    if (perHouseSanctioned <= perHouseCap && numHouses != 1) {
      addNote(
        "info",
        `The per-house sanctioned load = ${perHouseSanctioned} kW, therefore subsidy cap per-house = ${numHouses} × ${perHouseSanctioned} = ${perHouseLimit} kW.`
      );
    }
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

    // if (numHouses && proposed && perHouseSanctioned) {
    //   // max subsidy-eligible capacity per rules
    //   const perHouseLimit = numHouses * Math.min(perHouseSanctioned || 0, perHouseCap);
    //   const eligibleCap = Math.min(proposed, Math.min(overallSubsidyCap, perHouseLimit));

    //   if (eligibleCap < proposed) {
    //     addNote(
    //       "warning",
    //       `Subsidy is available only up to ${eligibleCap} kW. Your proposed system is ${proposed} kW, so the extra ${proposed - eligibleCap} kW will not receive subsidy (to be paid from your pocket).`
    //     );
    //   } else {
    //     addNote(
    //       "info",
    //       `Your proposed system of ${proposed} kW is fully eligible for subsidy rules (up to ${perHouseCap} kW per house and ${overallSubsidyCap} kW per society).`
    //     );
    //   }
    // }
  } else {
    // --- Residential Notes ---
    if (results?.sanctioned_load_must_be && results?.sanctioned_load_must_be > 0) {
      const userLoad = results?.user_sanctioned_load || 1;
      const requiredLoad = results.sanctioned_load_must_be;
      if (requiredLoad > userLoad) {
        addNote(
          "warning",
          `You provided ${userLoad} kW sanctioned load, but the recommended system is ${formatNum(results.recommended_kw)} kW. Please upgrade your sanctioned load to ${requiredLoad} kW.`
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
    <div className="col-span-2 p-4 mt-2 space-y-4 sticky top-24 self-start">
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
                <p className="text-sm leading-snug text-justify">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}
