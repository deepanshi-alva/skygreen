"use client";

import React, { useState, useMemo } from "react";
import { Download, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import Select, { GroupBase, StylesConfig } from "react-select";
import { State, City } from "country-state-city";

/* ---------------------------- Select Styles ---------------------------- */
const customSelectStyles: StylesConfig<
  { value: string; label: string },
  false,
  GroupBase<{ value: string; label: string }>
> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#222" : "#111",
    borderColor: state.isFocused
      ? "#16a34a"
      : state.isDisabled
        ? "#333"
        : "#444",
    borderRadius: "0.75rem",
    padding: "2px",
    minHeight: "48px",
    color: "white",
    cursor: state.isDisabled ? "not-allowed" : "default",
    opacity: state.isDisabled ? 0.5 : 1,
    boxShadow: state.isFocused ? "0 0 0 1px #16a34a" : "none",
    "&:hover": { borderColor: "#16a34a" },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#111",
    borderRadius: "0.75rem",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#16a34a" : "#111",
    color: state.isFocused ? "#fff" : "#ddd",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({ ...provided, color: "white" }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#555" : "#666",
  }),
};

/* ---------------------------- Time Slots ---------------------------- */
const generateTimeSlots = () => {
  const slots: { value: string; label: string }[] = [];
  const start = 10 * 60;
  const end = 18 * 60;

  const format12 = (minutes: number) => {
    const h24 = Math.floor(minutes / 60);
    const m = minutes % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  };

  for (let mins = start; mins < end; mins += 30) {
    const label = `${format12(mins)} - ${format12(mins + 30)}`;
    slots.push({ value: label, label });
  }
  return slots;
};
const timeOptions = generateTimeSlots();

/* ---------------------------- Types ---------------------------- */
type OptionType = { value: string; label: string };

type BusinessType =
  | "Distributor"
  | "Dealer"
  | "Retailer"
  | "EPC Company"
  | "Installer"
  | "Other";

type FormData = {
  name: string;
  phone: string;
  state: OptionType | null;
  city: OptionType | null;
  gender: string;
  businessType: BusinessType;
  otherBusinessType?: string;
  date: Date | null;
  time: string;
  agreeToProcessing: boolean;
};

/* ---------------------------- Download Card ---------------------------- */
function DownloadCard() {
  return (
    <div className="space-y-10">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex flex-col justify-center items-center gap-2 text-white">
          <div className="flex justify-center items-center gap-2 text white">
            <h2 className="text-lg md:text-xl font-semibold">
              Become a Partner
            </h2>
          </div>
        </div>

        {/* Company Profile Card */}
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg overflow-hidden">
          {/* Corner Ribbon */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-green-500/70" />
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            SKYGREEN
          </div>

          {/* Profile Content */}
          <div className="relative z-10 mt-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
              Grow With Skygreen
              <br />
              {/* <span className="text-green-400">Together, We Shine</span> */}
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed text-justify">
              It’s time to save the world…
              At SKYGREEN, we’re more than a solar brand — we’re a fast-growing clean energy network across India. By joining as a Dealer, Distributor, or EPC Partner, you unlock access to premium products, transparent rewards, and business opportunities that create real impact.
            </p>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-4 text-gray-300 text-justify sm:text-justify px-4 md:px-0">
        <p className="leading-relaxed">
          <span className="text-white font-semibold">An Indian brand </span>
          with Skygreen, you don&apos;t just do business — you build trust, profits, and a <span className="text-green-400 font-semibold">cleaner future</span>.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Join Form ---------------------------- */
function JoinUsForm() {
  const today = new Date();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    state: null,
    city: null,
    gender: "",
    businessType: "Distributor",
    otherBusinessType: "",
    date: null,
    time: "",
    agreeToProcessing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
   const { executeRecaptcha } = useGoogleReCaptcha();

  const validateField = (field: keyof FormData, value: any): string => {
    switch (field) {
      case "name":
        if (!value || value.trim().length < 2) return "Name is required.";
        return "";
      case "phone":
        if (!/^\d{10}$/.test(value))
          return "Enter a valid 10-digit phone number.";
        return "";
      case "state":
        return value ? "" : "Select your state.";
      case "city":
        return value ? "" : "Select your city.";
      case "gender":
        return value ? "" : "Select gender.";
      case "businessType":
        return value ? "" : "Select business type.";
      case "otherBusinessType":
        if (formData.businessType === "Other" && !value?.trim())
          return "Specify your business type.";
        return "";
      case "date":
        if (!value) return "Select a date.";
        if (value < new Date(new Date().setHours(0, 0, 0, 0)))
          return "Date cannot be in the past.";
        return "";
      case "time":
        return value ? "" : "Select a time slot.";
      case "agreeToProcessing":
        return value ? "" : "You must agree before submitting.";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean | Date | null | OptionType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((f) => {
      newErrors[f] = validateField(f, formData[f]);
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    // ✅ get reCAPTCHA token
    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }
    const token = await executeRecaptcha("join_us_form");
    console.log("this is the recaptcha token that is to be send to the backend", token)

    // 🔑 Map frontend formData → Strapi schema
    const payload = {
      name: formData.name,
      phone_number: Number(formData.phone),
      state: formData.state?.label || "",
  city: formData.city?.label || "",
      gender: formData.gender,
      business_type:
        formData.businessType === "Other"
          ? `Other: ${formData.otherBusinessType}`
          : formData.businessType,
      preferred_date: formData.date
        ? formData.date.toISOString().split("T")[0] // convert to YYYY-MM-DD
        : null,
      preferred_time_slot: formData.time,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/join-uses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: payload, token }), // Strapi requires { data: {...} }
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      alert("✅ Join Us form submitted successfully!");

      // 🔥 Reset form after success
      setFormData({
        name: "",
        phone: "",
        state: null,
        city: null,
        gender: "",
        businessType: "Distributor",
        otherBusinessType: "",
        date: null,
        time: "",
        agreeToProcessing: false,
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit. Try again later.");
    }
  };

  const inputStyle =
    "w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/40 focus:outline-none transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Deepanshi Singhal"
            className={inputStyle}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            placeholder="+91 9876543210"
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputStyle}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* State, City, Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <Select
            options={State.getStatesOfCountry("IN").map((s) => ({
              value: s.isoCode,
              label: s.name,
            }))}
            styles={customSelectStyles}
            value={formData.state}
            onChange={(opt) => handleChange("state", opt)}
            placeholder="Select your state"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <Select
            options={
              formData.state
                ? City.getCitiesOfState("IN", formData.state.value).map((c) => ({
                  value: c.name,
                  label: c.name,
                }))
                : []
            }
            styles={customSelectStyles}
            value={formData.city}
            onChange={(opt) => handleChange("city", opt)}
            placeholder={
              formData.state ? "Now select your city" : "Select state first"
            }
            isDisabled={!formData.state}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <Select
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "na", label: "Prefer not to say" },
            ]}
            styles={customSelectStyles}
            value={
              formData.gender
                ? [
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "na", label: "Prefer not to say" },
                ].find((g) => g.value === formData.gender) || null
                : null
            }
            onChange={(opt) => handleChange("gender", opt?.value || "")}
            placeholder="Select gender"
          />
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>
      </div>

      {/* Date & Time & business type*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Business Type
          </label>
          <Select
            options={[
              { value: "Distributor", label: "Distributor" },
              { value: "Dealer", label: "Dealer" },
              { value: "Retailer", label: "Retailer" },
              { value: "EPC Company", label: "EPC Company" },
              { value: "Installer", label: "Installer" },
              { value: "Other", label: "Other" },
            ]}
            styles={customSelectStyles}
            value={
              formData.businessType
                ? { value: formData.businessType, label: formData.businessType }
                : null
            }
            onChange={(opt) =>
              handleChange("businessType", opt?.value as BusinessType)
            }
            placeholder="Select business type"
          />
          {formData.businessType === "Other" && (
            <input
              type="text"
              placeholder="Please specify"
              value={formData.otherBusinessType}
              onChange={(e) =>
                handleChange("otherBusinessType", e.target.value)
              }
              className={inputStyle + " mt-2"}
            />
          )}
          {(errors.businessType || errors.otherBusinessType) && (
            <p className="text-red-500 text-sm">
              {errors.businessType || errors.otherBusinessType}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleChange("date", date)}
            minDate={today}
            className={inputStyle}
            popperClassName="datepicker-center"
            popperPlacement="bottom"
            placeholderText="Select a date"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Time
          </label>
          <Select
            options={timeOptions}
            styles={customSelectStyles}
            value={timeOptions.find((t) => t.value === formData.time) || null}
            onChange={(opt) => handleChange("time", opt?.value || "")}
            placeholder="Select a time slot"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
      </div>

      {/* Agreement */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.agreeToProcessing}
            onChange={(e) =>
              handleChange("agreeToProcessing", e.target.checked)
            }
            className="mt-1 w-4 h-4 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
          />
          <label className="text-sm text-gray-400 leading-relaxed">
            I agree to the{" "}
            <a
              href="/images/pdfs/privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              Privacy Policy ↗
            </a>{" "}
            and{" "}
            <a
              href="/images/pdfs/terms-of-service.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              Terms of Service ↗
            </a>
          </label>
        </div>
        {errors.agreeToProcessing && (
          <p className="text-red-500 text-sm">{errors.agreeToProcessing}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="group flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Join Network
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </form>
  );
}

/* ---------------------------- Main ---------------------------- */
export default function JoinUs() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[22%_minmax(0,1fr)] gap-10 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-8 self-start">
            <DownloadCard />
          </aside>

          {/* Right Form */}
          <main className="order-1 lg:order-2">
            <div className="relative w-full max-w-full lg:max-w-5xl mx-auto">
              <div
                className="relative p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl 
                              bg-gradient-to-br from-gray-900/90 to-black/90 
                              backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(34,197,94,0.25)] 
                              hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(34,197,94,0.35)]"
              >
                <div className="absolute inset-0 rounded-3xl border border-green-500/20 pointer-events-none"></div>
                <JoinUsForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
