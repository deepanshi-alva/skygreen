"use client";

import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";
import Select from "react-select";
import { State, Country } from "country-state-city";
import ManualLoadCalculator from "./manualLoadCalculator";

export default function LeftInputPanel({ onResults }) {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [loadingStates, setLoadingStates] = useState(true);
  const [error, setError] = useState("");

  const defaultFormData = {
    state: "",
    mode: "residential",
    bill: "",
    units: "",
    roofArea: "",
    roofUnit: "sqft",
    numHouses: "",
    proposedCapacity: "",
    sanctionedLoad: "1",
    tariff: "8",
    societySanctionedLoad: "",
    perHouseSanctionedLoad: "",
    plant_size_kw: "",
    extraCharges: "200",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Reset form to defaults but keep current state + mode
    setFormData((prev) => ({
      ...defaultFormData,
      state: prev.state, // preserve selected state
      mode: prev.mode, // preserve the new mode
    }));

    // Clear results in parent
    onResults(null);
  }, [formData.mode]);

  console.log("this is the formdata", formData);

  // Fetch states from Strapi
  useEffect(() => {
    const india = Country.getCountryByCode("IN"); // India
    const allStates = State.getStatesOfCountry(india.isoCode);

    const formatted = allStates.map((s) => ({
      value: s.name,
      label: s.name,
      isoCode: s.isoCode,
    }));

    setStates(formatted);
    setLoadingStates(false);
  }, []);

  const handleStateChange = async (option) => {
    setSelectedState(option);
    setFormData({ ...formData, state: option.value });

    try {
      // fetch metadata only for the chosen state
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/states?filters[name][$eq]=${option.value}`
      );
      const data = await res.json();

      if (data?.data?.[0]) {
        const attrs = data.data[0].attributes;
        setSelectedState({
          ...option,
          rwa_enabled: attrs.rwa_enabled,
          id: data.data[0].id,
        });
      }
    } catch (err) {
      console.error("Error fetching state metadata:", err);
    }
  };

  console.log("these are the states which are being fetched", states);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // helpers
    const toNum = (v) => Number(v ?? 0) || 0;
    const isPositive = (n) => n > 0;

    // --- Edge Case 1: No State selected ---
    if (!formData.state.trim()) {
      setError("⚠️ Please select a State.");
      return;
    }

    // --- Residential Mode Validation ---
    if (formData.mode === "residential") {
      const bill = toNum(formData.bill);
      const units = toNum(formData.units);

      if (!isPositive(bill) && !isPositive(units)) {
        setError(
          "⚠️ Please enter a positive Monthly Bill or Monthly Units to proceed."
        );
        return;
      }
    }

    // --- RWA Mode Validation ---
    if (formData.mode === "rwa") {
      const proposed = toNum(formData.proposedCapacity);
      const societyLoad = toNum(formData.societySanctionedLoad);
      const perHouse = toNum(formData.perHouseSanctionedLoad);
      const houses = toNum(formData.numHouses);

      // If per-house load is provided, number of houses must be > 0
      if (isPositive(perHouse) && !isPositive(houses)) {
        setError(
          "⚠️ Please enter Number of Houses when Per-house Sanctioned Load is provided."
        );
        return;
      }

      // ✅ NEW RULE: society sanctioned load must be >= (houses × per-house load)
      if (isPositive(perHouse) && isPositive(houses)) {
        const minSocietyLoad = houses * perHouse;
        if (isPositive(societyLoad) && societyLoad < minSocietyLoad) {
          setError(
            `⚠️For ${houses} houses × ${perHouse} kW/house = ${minSocietyLoad} kW minimum required society sanctioned load.`
          );
          return;
        }
      }

      // At least one positive sizing input required
      const anyPositive =
        isPositive(proposed) ||
        isPositive(societyLoad) ||
        isPositive(perHouse) ||
        isPositive(houses);

      if (!anyPositive) {
        setError(
          "⚠️ Enter at least one positive RWA sizing input: Proposed Capacity (kW) or Society Sanctioned Load (kW) or Per-house Sanctioned Load (kW) with Number of Houses."
        );
        return;
      }
    }

    // 👉 Determine sizingMethod
    let sizingMethod = "";
    if (formData.mode === "residential") {
      sizingMethod = isPositive(toNum(formData.bill))
        ? "bill"
        : isPositive(toNum(formData.units))
        ? "units"
        : "";
    } else if (formData.mode === "rwa") {
      sizingMethod = "rwa"; // backend handles the RWA sizing logic
    } else if (
      formData.mode === "plant_size" ||
      formData.mode === "manual_load"
    ) {
      sizingMethod = "plant_size"; // backend handles the RWA sizing logic
    }

    // ✅ Fix: set default 3.105 if manual_load and no edits
    let finalPlantSize = Number(formData.plant_size_kw) || 0;
    if (formData.mode === "manual_load" && finalPlantSize <= 0) {
      finalPlantSize = 3.105;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/calculator/estimate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state_name: formData.state,
            is_rwa: formData.mode === "rwa",
            num_houses: Number(formData.numHouses) || 1,
            proposed_capacity_kw: Number(formData.proposedCapacity) || 0,
            society_sanctioned_load_kw:
              Number(formData.societySanctionedLoad) || 0,
            per_house_sanctioned_load_kw:
              Number(formData.perHouseSanctionedLoad) || 1,
            monthly_bill_inr: Number(formData.bill) || 0,
            monthly_units_kwh: Number(formData.units) || 0,
            tariff_inr_per_kwh: Number(formData.tariff) || 8,
            roof_area_value: Number(formData.roofArea) || 0,
            roof_area_unit: formData.roofUnit,
            sizing_method: sizingMethod,
            plant_size_kw: finalPlantSize,
            discom_extra_charges: Number(formData.extraCharges) || 200,
          }),
        }
      );

      const data = await res.json();
      // Always enrich results with user-provided fields for frontend logic
      data.user_sanctioned_load = Number(formData.sanctionedLoad) || 1;
      data.user_num_houses = Number(formData.numHouses) || 0;
      data.user_proposed_capacity = Number(formData.proposedCapacity) || 0;
      data.user_society_sanctioned_load =
        Number(formData.societySanctionedLoad) || 0;
      data.user_per_house_sanctioned_load =
        Number(formData.perHouseSanctionedLoad) || 0;
      data.user_roof_area_value = Number(formData.roofArea) || 0;
      data.user_tariff = Number(formData.tariff) || 8;
      data.sizing_method = sizingMethod;

      console.log("Results:", data);
      console.log("state name is", formData.state);

      // send results to parent
      onResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      borderColor: state.isFocused ? "#22c55e" : "#22c55e", // Tailwind green-500
      color: "white",
      boxShadow: state.isFocused ? "0 0 0 1px #22c55e" : null,
      "&:hover": { borderColor: "#22c55e" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111",
      border: "1px solid #22c55e",
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#22c55e" : "#111",
      color: state.isFocused ? "black" : "white",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", // gray-400
    }),
  };

  const panelOptions = [
    { value: "skygreen_575w", label: "SKYGREEN 575W TOPCon Bifacial" },
    // { value: "skygreen_400w", label: "SKYGREEN 400W Mono PERC" },
    // { value: "skygreen_300w", label: "SKYGREEN 300W Polycrystalline" },
  ];

  return (
    <>
      <div className="mb-6 p-4 mt-8 rounded-xl border border-green-500/40 bg-black/70 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
        <p className="text-sm sm:text-base md:text-lg text-green-400 font-semibold leading-relaxed text-justify">
          India’s No.1 Free Solar Calculator ⚡ — Trusted by thousands to find
          the right system size, subsidy eligibility and payback instantly.{" "}
          <br className="hidden sm:block" />
          <span className="text-gray-300 font-normal">
            Just enter your details and discover how much you can save with{" "}
            <span className="text-green-400 font-bold">
              SKYGREEN’s premium solar solutions
            </span>
            .
          </span>
        </p>
      </div>
      <div className="p-4 shadow-lg relative sticky top-24 self-start">
        <h2 className="text-xl font-bold mb-4">Your Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Searchable State Dropdown */}
          <div>
            <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
              State
            </label>
            <Select
              options={states}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Search or select a state..."
              isSearchable
              styles={customStyles}
              // isLoading={loadingStates}
              // loadingMessage={() => "Loading states..."} // ✅ custom message
              noOptionsMessage={() =>
                loadingStates ? "Loading states..." : "No states found"
              }
            />
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block mb-2 text-sm font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
              Mode
            </label>
            {selectedState ? (
              <div className="grid grid-cols-2 gap-3 md:flex md:gap-4 text-[12px]">
                {/* Residential */}
                <label
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition
          ${
            formData.mode === "residential"
              ? "bg-green-500 text-black font-semibold border-green-500"
              : "bg-[#111] text-gray-300 border-gray-600 hover:border-green-400 hover:text-green-400"
          }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="residential"
                    checked={formData.mode === "residential"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  Residential
                </label>

                {/* Plant Size */}
                <label
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition
          ${
            formData.mode === "plant_size"
              ? "bg-green-500 text-black font-semibold border-green-500"
              : "bg-[#111] text-gray-300 border-gray-600 hover:border-green-400 hover:text-green-400"
          }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="plant_size"
                    checked={formData.mode === "plant_size"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  Plant Size
                </label>

                {/* RWA */}
                <label
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition
          ${
            selectedState.rwa_enabled
              ? formData.mode === "rwa"
                ? "bg-green-500 text-black font-semibold border-green-500"
                : "bg-[#111] text-gray-300 border-gray-600 hover:border-green-400 hover:text-green-400"
              : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
          }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="rwa"
                    checked={formData.mode === "rwa"}
                    onChange={handleChange}
                    disabled={!selectedState.rwa_enabled}
                    className="hidden"
                  />
                  RWA / GHS
                </label>

                {/* Manual Load */}
                <label
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition
          ${
            formData.mode === "manual_load"
              ? "bg-green-500 text-black font-semibold border-green-500"
              : "bg-[#111] text-gray-300 border-gray-600 hover:border-green-400 hover:text-green-400"
          }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="manual_load"
                    checked={formData.mode === "manual_load"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  Manual Load
                </label>
              </div>
            ) : (
              <p className="text-sm text-red-400">
                Please select a state first
              </p>
            )}
          </div>

          {/* Panel Type Dropdown */}
          <div>
            <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
              Panel Type
            </label>
            <Select
              options={panelOptions}
              value={
                panelOptions.find((opt) => opt.value === formData.panelType) ||
                panelOptions[0]
              }
              onChange={(option) =>
                setFormData({ ...formData, panelType: option.value })
              }
              styles={customStyles} // 🔥 reuse same green/black theme
              isSearchable={false} // panels are limited, so no need for search
            />
          </div>

          {/* Conditional Fields */}
          {formData.mode === "residential" ? (
            <>
              {/* Monthly Bill OR Units */}
              <div className="flex flex-row gap-x-2">
                <div>
                  <label className="block mb-1 flex items-center font-bold gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Avg Monthly Bill
                    <span className="relative group cursor-pointer">
                      <Info className="w-4 h-4 text-blue-400" />
                      <div className="absolute font-normal left-6 top-1/2 transform -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs p-2 rounded-md border border-green-500 w-56 z-10">
                        Enter the average of your last 12 months' electricity
                        bills (₹).
                      </div>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="bill"
                    value={formData.bill}
                    min={800}
                    onChange={handleChange}
                    disabled={!!formData.units}
                    className={`w-full p-2 rounded-lg border appearance-none
                  ${
                    formData.units
                      ? "bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed"
                      : "bg-black border-green-500 text-white"
                  }`}
                    placeholder="e.g. 2500"
                  />
                </div>

                <span className="text-center justify-center mt-9">or</span>

                <div>
                  <label className="block mb-1 flex items-center font-bold gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Avg Monthly Units
                    <span className="relative group cursor-pointer">
                      <Info className="w-4 h-4 text-blue-400" />
                      <div className="absolute font-normal left-6 top-1/2 transform -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs p-2 rounded-md border border-green-500 w-56 z-10">
                        Enter the average of your last 12 months' electricity
                        consumption in units (kWh).
                      </div>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    disabled={!!formData.bill}
                    className={`w-full p-2 rounded-lg border appearance-none
      ${
        formData.bill
          ? "bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed"
          : "bg-black border-green-500 text-white"
      }`}
                    placeholder="e.g. 350"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-x-6">
                <div>
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Roof Area
                  </label>
                  <input
                    type="number"
                    name="roofArea"
                    value={formData.roofArea}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black border border-green-500"
                    placeholder="Enter rooftop area"
                  />
                </div>

                <div className="w-[12.5rem]">
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Roof Area Unit
                  </label>
                  <select
                    name="roofUnit"
                    value={formData.roofUnit}
                    onChange={handleChange}
                    className="w-full p-2 px-4 rounded-lg bg-black border border-green-500"
                  >
                    <option value="sqft">Sqft</option>
                    <option value="sqm">Sqm</option>
                    <option value="sqyd/gaj">Sqyd/Gaj</option>
                    <option value="ground">Ground</option>
                    <option value="cent">Cent</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row gap-x-6">
                <div>
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Sanctioned Load (kW)
                  </label>
                  <input
                    type="number"
                    name="sanctionedLoad"
                    value={formData.sanctionedLoad}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black border border-green-500"
                    placeholder="Default 1"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Tariff (₹/kWh)
                  </label>
                  <input
                    type="number"
                    name="tariff"
                    value={formData.tariff}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black border border-green-500"
                    placeholder="Default 8"
                  />
                </div>
              </div>

              {/* Extra Charges (Discom) – common to all modes */}
              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Monthly Extra Charges (₹) (Discom)
                </label>
                <input
                  type="number"
                  name="extraCharges"
                  value={formData.extraCharges || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Default 200"
                />
              </div>
            </>
          ) : formData.mode === "rwa" ? (
            <>
              {/* RWA-specific fields */}
              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Number of Houses
                </label>
                <input
                  type="number"
                  name="numHouses"
                  value={formData.numHouses}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Enter number of houses"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Total Sanctioned Load of Society (kW)
                </label>
                <input
                  type="number"
                  name="societySanctionedLoad"
                  value={formData.societySanctionedLoad || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Enter total sanctioned load"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Sanctioned Load Per House (kW)
                </label>
                <input
                  type="number"
                  name="perHouseSanctionedLoad"
                  value={formData.perHouseSanctionedLoad || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Default 1"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Proposed Capacity (kW)
                </label>
                <input
                  type="number"
                  name="proposedCapacity"
                  value={formData.proposedCapacity || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Enter proposed capacity"
                />
              </div>

              <div className="flex flex-row gap-x-6">
                <div>
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Roof Area
                  </label>
                  <input
                    type="number"
                    name="roofArea"
                    value={formData.roofArea}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black border border-green-500"
                    placeholder="Enter rooftop area"
                  />
                </div>

                <div className="w-[12.5rem]">
                  <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                    Roof Area Unit
                  </label>
                  <select
                    name="roofUnit"
                    value={formData.roofUnit}
                    onChange={handleChange}
                    className="w-full p-2 px-4 rounded-lg bg-black border border-green-500"
                  >
                    <option value="sqft">Sqft</option>
                    <option value="sqm">Sqm</option>
                    <option value="sqyd/gaj">Sqyd/Gaj</option>
                    <option value="ground">Ground</option>
                    <option value="cent">Cent</option>
                  </select>
                </div>
              </div>

              {/* Extra Charges (Discom) – common to all modes */}
              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Monthly Extra Charges (₹) (Discom)
                </label>
                <input
                  type="number"
                  name="extraCharges"
                  value={formData.extraCharges || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Default 200"
                />
              </div>
            </>
          ) : formData.mode === "plant_size" ? (
            <>
              {/* Plant Size Mode Inputs */}
              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Proposed Plant Size (kW)
                </label>
                <input
                  type="number"
                  name="plant_size_kw"
                  value={formData.plant_size_kw || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Enter desired plant size (kW)"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Tariff (₹/kWh)
                </label>
                <input
                  type="number"
                  name="tariff"
                  value={formData.tariff}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Default 8"
                />
              </div>

              {/* Extra Charges (Discom) – common to all modes */}
              <div>
                <label className="block mb-1 font-bold whitespace-nowrap text-xs sm:text-sm md:text-base">
                  Monthly Extra Charges (₹) (Discom)
                </label>
                <input
                  type="number"
                  name="extraCharges"
                  value={formData.extraCharges || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Default 200"
                />
              </div>
            </>
          ) : formData.mode === "manual_load" ? (
            <ManualLoadCalculator
              formData={formData}
              setFormData={setFormData}
            />
          ) : null}

          {error && (
            <div className="p-2 bg-red-600 text-white rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            Calculate Savings
          </button>
        </form>
      </div>
    </>
  );
}
