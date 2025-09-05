"use client";

import { useState, useEffect, useRef } from "react";

export default function LeftInputPanel({ onResults }) {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    mode: "residential", // default
    bill: "",
    units: "",
    roofArea: "",
    roofUnit: "sqft",
    numHouses: "",
    proposedCapacity: "",
    sanctionedLoad: "1", // default
    tariff: "8", // default
    // New RWA fields
    societySanctionedLoad: "",
    perHouseSanctionedLoad: "",
    societyBill: "",
    societyUnits: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch states from Strapi
  useEffect(() => {
    async function fetchStates() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/states?pagination[pageSize]=100`,
          { cache: "no-store" }
        );
        const data = await res.json();
        const formatted = Array.isArray(data.data)
          ? data.data.map((item) => ({
              id: item.id,
              name: item.attributes.name,
              rwa_enabled: item.attributes.rwa_enabled,
            }))
          : [];

        setStates(formatted);
        setFilteredStates(formatted); // init
      } catch (err) {
        console.error("Error fetching states:", err);
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

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setFormData({ ...formData, state: state.name });
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, state: value });
    setDropdownOpen(true);
    const filtered = states.filter((st) =>
      st.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/calculator/estimate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state_name: formData.state,
            sizing_method: formData.bill ? "bill" : "units",
            monthly_bill_inr: Number(formData.bill) || 0,
            monthly_units_kwh: Number(formData.units) || 0,
            roof_area_value: Number(formData.roofArea) || 0,
            roof_area_unit: formData.roofUnit,
            is_rwa: formData.mode === "rwa",
            num_houses: Number(formData.numHouses) || 1,
            proposed_capacity_kw: Number(formData.proposedCapacity) || 0,
            society_sanctioned_load_kw:
              Number(formData.societySanctionedLoad) || 0,
            per_house_sanctioned_load_kw:
              Number(formData.perHouseSanctionedLoad) || 0,
            tariff_inr_per_kwh: Number(formData.tariff) || 8,
          }),
        }
      );

      const data = await res.json();
      console.log("Results:", data);
      console.log("state name is", formData.state);

      // send results to parent
      onResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  return (
    <div className="col-span-3 p-4 shadow-lg relative sticky top-24 self-start">
      <h2 className="text-xl font-bold mb-4">Your Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Searchable State Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleSearch}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            placeholder="Search state..."
            className="w-full p-2 rounded-lg bg-black border border-green-500"
          />
          {dropdownOpen && filteredStates.length > 0 && (
            <ul className="absolute z-10 bg-[#111] border border-green-500 rounded-lg mt-1 max-h-40 overflow-y-auto w-full">
              {filteredStates.map((st) => (
                <li
                  key={st.id}
                  onClick={() => handleStateSelect(st)}
                  className="p-2 hover:bg-green-600 hover:text-black cursor-pointer"
                >
                  {st.name}
                </li>
              ))}
            </ul>
          )}
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
          <select
            name="panelType"
            value={"skygreen_575w"}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-black border border-green-500"
          >
            <option value="skygreen_575w">SKYGREEN 575W TOPCon Bifacial</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {formData.mode === "residential" ? (
          <>
            {/* Monthly Bill OR Units */}
            <div className="flex flex-row gap-x-2">
              <div>
                <label className="block mb-1">Monthly Bill (₹)</label>
                <input
                  type="number"
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                  disabled={!!formData.units}
                  className="w-full p-2 rounded-lg bg-black border border-green-500 appearance-none"
                  placeholder="Average bill amount"
                />
              </div>

              <span className="text-center justify-center mt-9">or</span>

              <div>
                <label className="block mb-1">Monthly Units (kWh)</label>
                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  disabled={!!formData.bill}
                  className="w-full p-2 rounded-lg bg-black border border-green-500"
                  placeholder="Average monthly units"
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
                  <option value="sqyd">Sqyd</option>
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
        ) : (
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
                disabled={
                  !!formData.perHouseSanctionedLoad ||
                  !!formData.proposedCapacity ||
                  !!formData.societyBill ||
                  !!formData.societyUnits
                }
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
                disabled={
                  !!formData.societySanctionedLoad ||
                  !!formData.proposedCapacity ||
                  !!formData.societyBill ||
                  !!formData.societyUnits
                }
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
                disabled={
                  !!formData.societySanctionedLoad ||
                  !!formData.perHouseSanctionedLoad ||
                  !!formData.societyBill ||
                  !!formData.societyUnits
                }
                className="w-full p-2 rounded-lg bg-black border border-green-500"
                placeholder="Enter proposed capacity"
              />
            </div>

            <div>
              <label className="block mb-1">Total Monthly Bill of Society (₹)</label>
              <input
                type="number"
                name="societyBill"
                value={formData.societyBill || ""}
                onChange={handleChange}
                disabled={
                  !!formData.societySanctionedLoad ||
                  !!formData.perHouseSanctionedLoad ||
                  !!formData.proposedCapacity ||
                  !!formData.societyUnits
                }
                className="w-full p-2 rounded-lg bg-black border border-green-500"
                placeholder="Enter total monthly bill"
              />
            </div>

            <div>
              <label className="block mb-1">
                Total Monthly Units Consumed (kWh)
              </label>
              <input
                type="number"
                name="societyUnits"
                value={formData.societyUnits || ""}
                onChange={handleChange}
                disabled={
                  !!formData.societySanctionedLoad ||
                  !!formData.perHouseSanctionedLoad ||
                  !!formData.proposedCapacity ||
                  !!formData.societyBill
                }
                className="w-full p-2 rounded-lg bg-black border border-green-500"
                placeholder="Enter monthly units consumed"
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
