"use client";

import React, { useState } from "react";
import { Download, ChevronRight } from "lucide-react"; // removed User, Phone (unused)
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import Select, { GroupBase, StylesConfig } from "react-select";
import { State, City } from "country-state-city";

// Custom dark theme styles for react-select
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
    "&:hover": {
      borderColor: "#16a34a",
    },
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
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#555" : "#666",
  }),
};

// Generate 15-min time slots between 10:00–18:00
const generateTimeSlots = () => {
  const slots: { value: string; label: string }[] = [];
  const start = 10 * 60; // 10:00 in minutes
  const end = 18 * 60; // 18:00 in minutes

  const format12 = (minutes: number) => {
    const h24 = Math.floor(minutes / 60);
    const m = minutes % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  };

  for (let mins = start; mins < end; mins += 15) {
    const label = `${format12(mins)} - ${format12(mins + 15)}`;
    slots.push({ value: label, label });
  }
  return slots;
};

const timeOptions = generateTimeSlots();
type OptionType = { value: string; label: string };

type FormData = {
  name: string;
  phone: string;
  state: OptionType | null;
  city: OptionType | null;
  gender: string;
  capacity: string;
  date: Date | null;
  time: string;
  message: string;
  agreeToProcessing: boolean;
};

/* ----------------------------- Left Components ---------------------------- */

function DownloadCard() {
  return (
    <div className="space-y-10">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex flex-col justify-center items-center gap-2 text-white">
          <div className="flex justify-center items-center gap-2 text white">
            <h2 className="text-lg md:text-xl font-semibold">
              🌟 Join the Family
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
              Together, We Shine <br />
              {/* <span className="text-green-400">Together, We Shine</span> */}
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed text-justify">
              It’s time to save the world…
              At SKYGREEN, joining us means becoming part of something bigger than business.
              Every referral, every partnership, every connection helps light up homes and brings India closer to a cleaner tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-4 text-gray-300 text-justify sm:text-justify px-4 md:px-0">
        <p className="leading-relaxed">
          <span className="text-white font-semibold">An Indian brand</span> in renewable energy…
          With us, you don’t just join — <span className="text-green-400 font-semibold">you belong</span>. 🌱✨
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Contact Form ---------------------------- */
function ContactForm() {
  const today = new Date();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    state: null,
    city: null,
    gender: "",
    capacity: "",
    date: null,
    time: "",
    message: "",
    agreeToProcessing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Validation Function
  const validateField = (
    field: keyof FormData,
    value: string | number | boolean | Date | null | OptionType
  ): string => {
    switch (field) {
      case "name":
        if (typeof value !== "string" || value.trim().length < 2)
          return "Name must be at least 2 characters.";
        if (/^\d+$/.test(value)) return "Name cannot be numbers only.";
        return "";
      case "phone":
        if (typeof value !== "string" || !/^\d{10}$/.test(value))
          return "Enter a valid 10-digit phone number.";
        return "";
      case "state":
      case "city":
        return value ? "" : `Please select your ${field}.`;
      case "gender":
        return value ? "" : "Please select your gender.";
      case "capacity":
        if (!value || isNaN(Number(value)) || Number(value) <= 0)
          return "Enter a valid capacity in kW.";
        return "";
      case "date":
        if (!(value instanceof Date)) return "Please select a preferred date.";
        if (value < new Date(new Date().setHours(0, 0, 0, 0)))
          return "Preferred date cannot be in the past.";
        return "";
      case "time":
        return value ? "" : "Please select a time slot.";
      case "agreeToProcessing":
        return value ? "" : "You must agree before submitting.";
      default:
        return "";
    }
  };

  const handleChange = (
    field: keyof FormData,
    value: string | number | boolean | Date | null | OptionType
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value } as FormData));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    // ✅ get reCAPTCHA token
    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }
    const token = await executeRecaptcha("join_us_form");
    console.log("this is the recaptcha token that is to be send to the backend", token)

    const payload = {
      name: formData.name,
      phone_number: Number(formData.phone),
      state: formData.state?.label || "", // save state name
      city: formData.city?.label || "",
      gender: formData.gender,
      capacity_required: Number(formData.capacity),
      preferred_date: formData.date
        ? formData.date.toISOString().split("T")[0]
        : null,
      preferred_time_slot: formData.time,
      message: formData.message,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-uses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: payload, token }), // Strapi needs { data: {...} }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      // 🧩 3B. Also send to Leads API
      const leadPayload = {
        data: {
          full_name: formData.name,
          phone_number: formData.phone,
          state: formData.state?.label || "Unknown",
          city: formData.city?.label || "",
          gender: formData.gender,
          lead_source: "contact us",
          inquiry_medium: "organic",
          problem_objective: formData.message,
          system_size: Number(formData.capacity) || 0,
          scheduled_date: formData.date
            ? formData.date.toISOString().split("T")[0] // convert to YYYY-MM-DD
            : null,
          scheduled_time: formData.time,
        },
      };

      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      alert("✅ Form submitted successfully!");

      // 🔥 Clear form after success
      setFormData({
        name: "",
        phone: "",
        state: null,
        city: null,
        gender: "",
        capacity: "",
        date: null,
        time: "",
        message: "",
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
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 9876543210"
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
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Others", label: "Others" },
            ]}
            styles={customSelectStyles}
            value={
              formData.gender
                ? ["Male", "Female", "Others"]
                  .map((g) => ({
                    value: g,
                    label:
                      g === "Others"
                        ? "Others"
                        : g.charAt(0).toUpperCase() + g.slice(1),
                  }))
                  .find((g) => g.value === formData.gender) || null
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

      {/* Capacity, Date, Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Capacity (kW)
          </label>
          <input
            type="text"
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            placeholder="e.g., 5 kW"
            className={inputStyle}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleChange("date", date || null)}
            minDate={today}
            placeholderText="Select a date"
            popperClassName="datepicker-center"
            popperPlacement="bottom"
            className={inputStyle}
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

      {/* Message */}
      <div>
        <label className="block text-lg font-medium mb-2">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us how we can help..."
          rows={1}
          className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
        />
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
          Send Request
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </form>
  );
}

/* ------------------------------- Main Shell ------------------------------- */
export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-[22%_minmax(0,1fr)] 
            gap-10 lg:gap-12 
            max-w-7xl 
            mx-auto
          "
        >
          {/* Sidebar */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-8 self-start">
            <div className="mx-auto max-w-md lg:max-w-none">
              <DownloadCard />
            </div>
          </aside>

          {/* Form */}
          <main className="order-1 lg:order-2">
            <div className="relative w-full max-w-full lg:max-w-5xl mx-auto">
              <div
                className="
                  relative 
                  p-6 sm:p-8 md:p-12 lg:p-16 
                  rounded-3xl 
                  bg-gradient-to-br from-gray-900/90 to-black/90 
                  backdrop-blur-xl 
                  shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(34,197,94,0.25)] 
                  transform 
                  transition-transform 
                  duration-300 
                  hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(34,197,94,0.35)]
                "
              >
                <div className="absolute inset-0 rounded-3xl border border-green-500/20 pointer-events-none"></div>
                <ContactForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
