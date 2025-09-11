"use client";

import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";
import Select from "react-select"

export default function LeftInputPanel({ onResults }) {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [loadingStates, setLoadingStates] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
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
    plant_size_kw: ""
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log("this is the formdata", formData)

  // Fetch states from Strapi
  useEffect(() => {
    async function fetchStates() {
      try {
        setLoadingStates(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/states?fields[0]=name&fields[1]=rwa_enabled&pagination[pageSize]=100&sort=name:asc`,
          { cache: "force-cache", next: { revalidate: 3600 } }
        );
        const data = await res.json();
        const formatted = Array.isArray(data.data)
          ? data.data.map((item) => ({
            value: item.attributes.name,
            label: item.attributes.name,
            rwa_enabled: item.attributes.rwa_enabled,
            id: item.id,
          }))
          : [];
        setStates(formatted);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    }
    fetchStates();
  }, []);


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
        setError("⚠️ Please enter a positive Monthly Bill or Monthly Units to proceed.");
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
        setError("⚠️ Please enter Number of Houses when Per-house Sanctioned Load is provided.");
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
        (isPositive(perHouse) && isPositive(houses));

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
      sizingMethod = isPositive(toNum(formData.bill)) ? "bill"
        : isPositive(toNum(formData.units)) ? "units"
          : "";
    } else if (formData.mode === "rwa") {
      sizingMethod = "rwa"; // backend handles the RWA sizing logic
    } else if (formData.mode === "plant_size") {
      sizingMethod = "plant_size"; // backend handles the RWA sizing logic
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
            society_sanctioned_load_kw: Number(formData.societySanctionedLoad) || 0,
            per_house_sanctioned_load_kw: Number(formData.perHouseSanctionedLoad) || 0,
            monthly_bill_inr: Number(formData.bill) || 0,
            monthly_units_kwh: Number(formData.units) || 0,
            tariff_inr_per_kwh: Number(formData.tariff) || 8,
            roof_area_value: Number(formData.roofArea) || 0,
            roof_area_unit: formData.roofUnit,
            sizing_method: sizingMethod,
            plant_size_kw: Number(formData.plant_size_kw) || 0,
          }),
        }
      );

      const data = await res.json();
      // Always enrich results with user-provided fields for frontend logic
      data.user_sanctioned_load = Number(formData.sanctionedLoad) || 1;
      data.user_num_houses = Number(formData.numHouses) || 0;
      data.user_proposed_capacity = Number(formData.proposedCapacity) || 0;
      data.user_society_sanctioned_load = Number(formData.societySanctionedLoad) || 0;
      data.user_per_house_sanctioned_load = Number(formData.perHouseSanctionedLoad) || 0;
      data.user_roof_area_value = Number(formData.roofArea) || 0;
      data.user_tariff = Number(formData.tariff) || 8;

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
    <div className="col-span-3 p-4 shadow-lg relative sticky top-24 self-start">
      <h2 className="text-xl font-bold mb-4">Your Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Searchable State Dropdown */}
        <div>
          <label className="block mb-1">State</label>
          <Select
            options={states}
            value={selectedState}
            onChange={(option) => {
              setSelectedState(option);
              setFormData({ ...formData, state: option.value });
            }}
            placeholder="Search or select a state..."
            isSearchable
            styles={customStyles}
            // isLoading={loadingStates}
            loadingMessage={() => "Loading states..."} // ✅ custom message
            noOptionsMessage={() =>
              loadingStates ? "Loading states..." : "No states found"
            }
          />
        </div>

        {/* Radio Button for Residential vs RWA */}
        <div>
          <label className="block mb-1">Mode</label>
          {selectedState ? (
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="residential"
                  checked={formData.mode === "residential"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Residential
              </label>

              {/* <label>
                <input
                  type="radio"
                  name="mode"
                  value="plant_size"
                  checked={formData.mode === "plant_size"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Plant Size
              </label> */}

              <label
                className={
                  selectedState.rwa_enabled ? "" : "opacity-50 cursor-not-allowed"
                }
              >
                <input
                  type="radio"
                  name="mode"
                  value="rwa"
                  checked={formData.mode === "rwa"}
                  onChange={handleChange}
                  disabled={!selectedState.rwa_enabled}
                  className="mr-2"
                />
                RWA / GHS
              </label>
            </div>
          ) : (
            <p className="text-sm text-red-400">Please select a state first</p>
          )}
        </div>

        {/* Panel Type Dropdown */}
        <div>
          <label className="block mb-1">Panel Type</label>
          <Select
            options={panelOptions}
            value={panelOptions.find((opt) => opt.value === formData.panelType) || panelOptions[0]}
            onChange={(option) => setFormData({ ...formData, panelType: option.value })}
            styles={customStyles} // 🔥 reuse same green/black theme
            isSearchable={false}  // panels are limited, so no need for search
          />
        </div>

        {/* Conditional Fields */}
        {formData.mode === "residential" ? (
          <>
            {/* Monthly Bill OR Units */}
            <div className="flex flex-row gap-x-2">
              <div>
                <label className="block mb-1 flex items-center gap-2">
                  Average Monthly Bill
                  <span className="relative group cursor-pointer">
                    <Info className="w-4 h-4 text-blue-400" />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs p-2 rounded-md border border-green-500 w-56 z-10">
                      Enter the average of your last 12 months' electricity bills (₹).
                    </div>
                  </span>
                </label>
                <input
                  type="number"
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                  disabled={!!formData.units}
                  className={`w-full p-2 rounded-lg border appearance-none
      ${formData.units
                      ? "bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed"
                      : "bg-black border-green-500 text-white"}`}
                  placeholder="e.g. 2500"
                />
              </div>

              <span className="text-center justify-center mt-9">or</span>

              <div>
                <label className="block mb-1 flex items-center gap-2">
                  Average Monthly Units
                  <span className="relative group cursor-pointer">
                    <Info className="w-4 h-4 text-blue-400" />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs p-2 rounded-md border border-green-500 w-56 z-10">
                      Enter the average of your last 12 months' electricity consumption in units (kWh).
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
      ${formData.bill
                      ? "bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed"
                      : "bg-black border-green-500 text-white"}`}
                  placeholder="e.g. 350"
                />
              </div>

            </div>

            <div className="flex flex-row gap-x-6">
              <div>
                <label className="block mb-1">Roof Area</label>
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
                <label className="block mb-1">Roof Area Unit</label>
                <select
                  name="roofUnit"
                  value={formData.roofUnit}
                  onChange={handleChange}
                  className="w-full p-2 px-4 rounded-lg bg-black border border-green-500"
                >
                  <option value="sqft">Sqft</option>
                  <option value="sqm">Sqm</option>
                  <option value="sqyd">Sqyd / Gaj</option>
                  <option value="ground">Ground</option>
                  <option value="cent">Cent</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-x-6">
              <div>
                <label className="block mb-1">Sanctioned Load (kW)</label>
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
                <label className="block mb-1">Tariff (₹/kWh)</label>
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
          </>
        ) : formData.mode === "rwa" ? (
          <>
            {/* RWA-specific fields */}
            <div>
              <label className="block mb-1">Number of Houses</label>
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
              <label className="block mb-1">
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
              <label className="block mb-1">Sanctioned Load Per House (kW)</label>
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
              <label className="block mb-1">Proposed Capacity (kW)</label>
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
                <label className="block mb-1">Roof Area</label>
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
                <label className="block mb-1">Roof Area Unit</label>
                <select
                  name="roofUnit"
                  value={formData.roofUnit}
                  onChange={handleChange}
                  className="w-full p-2 px-4 rounded-lg bg-black border border-green-500"
                >
                  <option value="sqft">Sqft</option>
                  <option value="sqm">Sqm</option>
                  <option value="sqyd">Sqyd / Gaj</option>
                  <option value="ground">Ground</option>
                  <option value="cent">Cent</option>
                </select>
              </div>
            </div>
          </>
        ) : formData.mode === "plant_size" ? (
          <>
            {/* Plant Size Mode Inputs */}
            <div>
              <label className="block mb-1">Proposed Plant Size (kW)</label>
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
              <label className="block mb-1">Tariff (₹/kWh)</label>
              <input
                type="number"
                name="tariff"
                value={formData.tariff}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black border border-green-500"
                placeholder="Default 8"
              />
            </div>
          </>
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
  );
}
