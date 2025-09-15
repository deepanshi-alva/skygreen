"use client";

import { number } from "framer-motion";
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
    const numHouses = results?.user_num_houses;
    const proposed = results?.user_proposed_capacity;
    const recommended_system = results?.recommended_kw;
    const societySanctioned = results?.user_society_sanctioned_load;
    const perHouseSanctioned = results?.user_per_house_sanctioned_load || 1;
    const rawPerHouseSanctioned = results?.user_per_house_sanctioned_load || "";
    const perHouseCap = results?.rwa_per_house_cap_kw; // e.g., 3 or 10 depending on state
    const overallSubsidyCap = results?.rwa_overall_subsidy_cap;

    if (numHouses && proposed && societySanctioned) {
      console.log("entered 1");
      const perHouseCapUsed = perHouseCap ? Number(perHouseCap) : 1; // default 1 kW/house
      const capByHouses = numHouses * perHouseCapUsed; // e.g., 100 * 3 = 300 kW
      const eligibleCap = Math.min(
        capByHouses,
        overallSubsidyCap,
        societySanctioned
      );
      const remaining = Math.max(0, proposed - eligibleCap);

      // Helper: explain what limited the cap (for clearer notes)
      const limitReasons = [];
      if (eligibleCap === capByHouses)
        limitReasons.push(
          `${numHouses} × ${perHouseCapUsed} kW/house = ${capByHouses} kW`
        );
      if (eligibleCap === overallSubsidyCap)
        limitReasons.push(`overall subsidy cap = ${overallSubsidyCap} kW`);
      if (eligibleCap === societySanctioned)
        limitReasons.push(`society sanctioned load = ${societySanctioned} kW`);

      const limitSuffix = limitReasons.length
        ? ` (limited by ${limitReasons.join(", ")})`
        : "";

      // 1) Proposed exceeds society sanctioned load → invalid proposal
      if (proposed > societySanctioned) {
        console.log("entered 1a");
        addNote(
          "warning",
          `Your society’s total sanctioned load is ${societySanctioned} kW, but the proposed system is ${proposed} kW, which exceeds the sanctioned limit. ` +
            `Maximum subsidy eligibility is ${eligibleCap} kW ${limitSuffix}. ` +
            `The remaining capacity must be self-funded.`
        );
      }
      // 2) Fully eligible (proposed ≤ eligibleCap)
      else if (proposed <= eligibleCap) {
        console.log("entered 1b");
        addNote(
          "info",
          `Your society’s total sanctioned load is ${societySanctioned} kW, ` +
            `and the maximum subsidy eligibility is ${eligibleCap} kW ` +
            `${limitSuffix}. ` +
            `You have proposed ${proposed} kW, which is fully eligible under the subsidy cap.`
        );
      }
      // 3) Partially eligible (proposed > eligibleCap)
      else {
        console.log("entered 1c");
        addNote(
          "info",
          `Your society’s total sanctioned load is ${societySanctioned} kW. ` +
            `Maximum subsidy eligibility is ${eligibleCap} kW ` +
            `${limitSuffix}. ` +
            `You have proposed ${proposed} kW. The remaining ${remaining} kW must be self-funded.`
        );
      }
    } else if (numHouses && societySanctioned) {
      console.log("entered 2");

      const capByHouses = Math.min(numHouses * 1, overallSubsidyCap);
      const remaining = societySanctioned - capByHouses;

      addNote(
        "warning",
        `You entered a ${societySanctioned} kW society load, but the subsidy is capped at ${capByHouses} kW. The remaining ${remaining} kW will not get subsidy and must be self-funded.`
      );
      // You entered a 5000 kW society load, but the subsidy is capped at 500 kW. The remaining 4500 kW will not get subsidy and must be self-funded
    } else if (numHouses && perHouseSanctioned && proposed) {
      console.log("entered 5");
      const eligibleCap = Math.min(
        proposed,
        overallSubsidyCap,
        numHouses * perHouseSanctioned
      );
      if (proposed > eligibleCap) {
        const remaining = proposed - eligibleCap;
        addNote(
          "info",
          `Proposed system: ${proposed} kW. Eligible subsidy: ${eligibleCap} kW. The remaining ${remaining} kW must be self-funded.`
        );
      } else {
        addNote(
          "info",
          `Proposed system: ${proposed} kW. This is fully eligible for subsidy.`
        );
      }
    } else if (numHouses && perHouseSanctioned) {
      console.log("entered 4");
      const calculatedSystem = numHouses * perHouseSanctioned;
      const eligibleCap = Math.min(calculatedSystem, overallSubsidyCap);

      if (calculatedSystem === eligibleCap) {
        addNote(
          "info",
          `This is treated as your proposed capacity (${calculatedSystem} kW) and is fully eligible for subsidy.`
        );
      } else {
        addNote(
          "info",
          `Since you haven’t provided the proposed capacity, we calculated it as Number of Houses × Sanctioned Load = ${calculatedSystem} kW. However, your state subsidy is capped at ${eligibleCap} kW, and the remaining capacity will need to be self-funded.`
        );
      }
    } else if (proposed) {
      console.log("entered 3");

      const eligibleCap = Math.min(proposed, overallSubsidyCap);

      if (proposed <= overallSubsidyCap) {
        addNote(
          "info",
          `Proposed system: ${proposed} kW. This is fully eligible for subsidy.`
        );
      } else {
        const remaining = proposed - overallSubsidyCap;
        addNote(
          "info",
          `Proposed system: ${proposed} kW. Eligible subsidy: ${eligibleCap} kW. The remaining ${remaining} kW must be self-funded.`
        );
      }
    }

    // else if (proposed && proposed != overallSubsidyCap) {
    //   console.log("entered 3", proposed)
    //   addNote(
    //     "warning",
    //     `Your proposed system is ${proposed} kW and your subsidy is capped at ${overallSubsidyCap} kW.${proposed > overallSubsidyCap
    //       ? ` Remaining ${proposed - overallSubsidyCap} kW will not receive subsidy i.e. you have to pay for that from your pocket.`
    //       : proposed < overallSubsidyCap
    //         ? ` If you want to gain the full subsidy benefit, increase your proposed system size up to ${overallSubsidyCap} kW.`
    //         : ""
    //     }`
    //   );
    // }

    if (results?.roof_needed_sqft && results?.roof_area_available) {
      const roofNeeded = results.roof_needed_sqft;
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = results.roof_area_available;
        if (roofAvailable < roofNeeded) {
          addNote(
            "warning",
            `You provided ${roofAvailable} ${
              results.roof_area_unit
            } rooftop area, but ${formatNum(roofNeeded)} ${
              results.roof_area_unit
            } is required for the system.`
          );
        }
      } else {
        addNote(
          "info",
          `For this system, approx. ${formatNum(
            roofNeeded
          )} sqft rooftop area is required.`
        );
      }
    }

    if (rawPerHouseSanctioned === "") {
      console.log("aa");
      addNote(
        "info",
        `You did not enter the sanctioned load per house. We have taken the default as 1 kW/house, but in ${results.state} the subsidy is capped at ${perHouseCap} kW/house (subject to an overall cap of ${overallSubsidyCap} kW).`
      );
    } else if (perHouseSanctioned < perHouseCap) {
      console.log("ab");

      const houses = Number(numHouses) || 0;
      const perHouseLimit = Number(perHouseCap) || 0;

      // Theoretical max if upgraded per house
      const potentialEligible = houses * perHouseLimit;

      // Apply overall subsidy cap
      const upgradedEligible = Math.min(potentialEligible, overallSubsidyCap);

      addNote(
        "info",
        `You entered ${perHouseSanctioned} kW/house as sanctioned load. In ${results.state}, subsidy allows up to ${perHouseLimit} kW/house. If you upgrade to ${perHouseLimit} kW/house, your total eligible subsidy could increase to ${upgradedEligible} kW (capped by the overall subsidy limit of ${overallSubsidyCap} kW).`
      );
    } else if (perHouseSanctioned === perHouseCap) {
      console.log("ac");

      const houses = Number(numHouses) || 0;
      const perHouseLimit = Number(perHouseCap) || 0;

      const eligibleTotal = Math.min(houses * perHouseLimit, overallSubsidyCap);

      addNote(
        "info",
        `You entered ${perHouseSanctioned} kW/house as sanctioned load. In ${results.state}, this is the maximum eligible limit per house. Your total eligible subsidy is ${eligibleTotal} kW, which is fully eligible under the cap.`
      );
    } else {
      console.log("ad");

      const houses = Number(numHouses) || 0;
      const perHouseLimit = Number(perHouseCap) || 0;

      const cappedEligible = Math.min(
        houses * perHouseLimit,
        overallSubsidyCap
      );

      addNote(
        "info",
        `You entered ${perHouseSanctioned} kW/house, but in ${results.state} the subsidy is capped at ${perHouseLimit} kW/house. Extra capacity per house is not subsidized. Your total eligible subsidy remains capped at ${cappedEligible} kW.`
      );
    }
  } else if (results?.sizing_method === "plant_size") {
    if (results?.recommended_kw) {
      addNote(
        "info",
        `The recommended system is ${formatNum(results.recommended_kw)} kW.`
      );
    }
    if (results?.roof_needed_sqft) {
      const roofNeeded = results.roof_needed_sqft;
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = results.roof_area_available;
        if (roofAvailable < roofNeeded) {
          addNote(
            "warning",
            `You provided ${roofAvailable} ${
              results.roof_area_unit
            } rooftop area, but ${formatNum(roofNeeded)} ${
              results.roof_area_unit
            } is required for the system.`
          );
        }
      } else {
        addNote(
          "info",
          `For this system, approx. ${formatNum(
            roofNeeded
          )} sqft rooftop area is required.`
        );
      }
    }
  } else {
    // --- Residential Notes ---
    if (
      results?.sanctioned_load_must_be &&
      results?.sanctioned_load_must_be > 0
    ) {
      const userLoad = results?.user_sanctioned_load || 1;
      const requiredLoad = results.sanctioned_load_must_be;
      if (requiredLoad > userLoad) {
        addNote(
          "warning",
          `You provided ${userLoad} kW sanctioned load, but the recommended system is ${formatNum(
            results.recommended_kw
          )} kW. Please upgrade your sanctioned load to ${requiredLoad} kW.`
        );
      }
    }

    if (results?.roof_needed_sqft && results?.roof_area_available) {
      const roofNeeded = results.roof_needed_sqft;
      console.log("entered the if condition", roofNeeded);
      if (results?.roof_area_available && results.roof_area_available > 0) {
        const roofAvailable = results.roof_area_available;
        console.log("entered the second if condition", roofAvailable);
        if (roofAvailable < roofNeeded) {
          console.log(
            "this is third the rooftop things to be compared",
            roofAvailable,
            roofNeeded
          );
          addNote(
            "warning",
            `You provided ${roofAvailable} ${
              results.roof_area_unit
            } rooftop area, but ${formatNum(roofNeeded)} ${
              results.roof_area_unit
            } is required for the system.`
          );
        }
      } else {
        addNote(
          "info",
          `For this system, approx. ${roofNeeded} sqft rooftop area is required.`
        );
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
