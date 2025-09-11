"use client";

import React, { useState } from "react";
import {
  Download,
  ChevronRight,
  User,
  Phone,
} from "lucide-react";
import HeadOfficeInfo from "./headOffice";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import Select from "react-select";
import { State, City } from "country-state-city";

// Custom dark theme styles for react-select
const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#222" : "#111", // darker gray when disabled
    borderColor: state.isDisabled ? "#333" : "#444",
    borderRadius: "0.75rem",
    padding: "2px",
    minHeight: "48px",
    color: "white",
    cursor: state.isDisabled ? "not-allowed" : "default",
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#111",
    borderRadius: "0.75rem",
    color: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#16a34a" : "#111",
    color: state.isFocused ? "#fff" : "#ddd",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: state.isDisabled ? "#555" : "#666",
  }),
};

// Generate 15-min time slots between 10:00–18:00
const generateTimeSlots = () => {
  const slots = [];
  const start = 10 * 60; // 10:00 in minutes
  const end = 18 * 60; // 18:00 in minutes
  for (let mins = start; mins < end; mins += 15) {
    const h1 = String(Math.floor(mins / 60)).padStart(2, "0");
    const m1 = String(mins % 60).padStart(2, "0");
    const h2 = String(Math.floor((mins + 15) / 60)).padStart(2, "0");
    const m2 = String((mins + 15) % 60).padStart(2, "0");
    slots.push({
      value: `${h1}:${m1}-${h2}:${m2}`,
      label: `${h1}:${m1} - ${h2}:${m2}`,
    });
  }
  return slots;
};

const timeOptions = generateTimeSlots();


type FormData = {
  name: string;
  phone: string;
  state: string;
  city: string;
  capacity: string;
  date: Date | null;
  time: string;
  message: string;
  agreeToProcessing: boolean;
};

/* ----------------------------- Left Components ---------------------------- */

function DownloadCard() {
  return (
    <div className="space-y-8">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex justify-center items-center gap-2 text-white">
          <Download className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold">Download Presentation</h2>
        </div>

        {/* Company Profile Card */}
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg overflow-hidden">
          {/* Accent triangle */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-green-500/70" />

          {/* Badge */}
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            SKYGREEN
          </div>

          {/* Content */}
          <div className="relative z-10 mt-12">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              COMPANY <br /> PROFILE
            </h3>
            <p className="text-sm text-gray-300">
              It&apos;s time to save the world with clean energy.
            </p>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-2 text-gray-300">
        <p className="text-center md:text-justify">
          <span className="text-white font-semibold">An Indian brand</span> in the
          renewable energy industry, delivering{" "}
          <span className="text-white font-semibold">premium solar solutions</span>{" "}
          to your doorstep.
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
    state: "",
    city: "",
    capacity: "",
    date: null,
    time: "",
    message: "",
    agreeToProcessing: false,
  });

  const [error, setError] = useState<string>("");

  // Build state & city options from library
  const stateOptions = State.getStatesOfCountry("IN").map((s) => ({
    value: s.isoCode,
    label: s.name,
  }));

  const cityOptions = formData.state
    ? City.getCitiesOfState("IN", formData.state).map((c) => ({
      value: c.name,
      label: c.name,
    }))
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validations
    if (!formData.name || formData.name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.state) {
      setError("Please select your state.");
      return;
    }

    if (!formData.city) {
      setError("Please select your city.");
      return;
    }

    if (!formData.capacity || isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      setError("Please enter a valid capacity in kW.");
      return;
    }

    if (!formData.date) {
      setError("Please select a preferred date.");
      return;
    }

    if (formData.date < new Date(new Date().setHours(0, 0, 0, 0))) {
      setError("Preferred date cannot be in the past.");
      return;
    }

    if (!formData.time) {
      setError("Please select a preferred time slot.");
      return;
    }

    if (!formData.agreeToProcessing) {
      setError("You must agree to the processing of personal data.");
      return;
    }

    setError(""); // clear error if all validations passed

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-uses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // add Authorization header if needed
          // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            phone_number: parseInt(formData.phone, 10),
            state: formData.state,
            city: formData.city,
            capacity_required: parseInt(formData.capacity, 10),
            preferred_date: formData.date.toISOString().split("T")[0],
            preferred_time_slot: formData.time,
            message: formData.message
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      const responseData = await res.json();
      console.log("✅ Data saved to Strapi:", responseData);

      // reset form
      setFormData({
        name: "",
        phone: "",
        state: "",
        city: "",
        capacity: "",
        date: null,
        time: "",
        message: "",
        agreeToProcessing: false,
      });

      alert("Your details have been submitted successfully!");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      setError("Something went wrong, please try again.");
    }
  };

  const inputStyle =
    "w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/40 focus:outline-none transition-all duration-200";

  return (
    <div className="space-y-8 ">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
        Let&apos;s <span className="text-green-500">Connect</span>
      </h1>
      <p className="text-gray-400 mb-6">
        Share your details and our team will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <div className="flex items-center gap-2">
            <User className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="John Doe"
              className={inputStyle}
            />
          </div>
        </div>

        {/* Phone + State + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <div className="flex items-center gap-2">
              <Phone className="text-gray-400 w-5 h-5 mr-1" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+91 9876543210"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">State</label>
            <Select
              options={stateOptions}
              styles={customSelectStyles}
              value={stateOptions.find((s) => s.value === formData.state) || null}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  state: selected?.value || "",
                  city: "",
                }))
              }
              placeholder="Select your state"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">City</label>
            <Select
              options={cityOptions}
              styles={customSelectStyles}
              value={cityOptions.find((c) => c.value === formData.city) || null}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  city: selected?.value || "",
                }))
              }
              placeholder={
                formData.state ? "Now select your city" : "Select state first"
              }
              isDisabled={!formData.state}
            />
          </div>

        </div>

        {/* Capacity + Preferred Date + Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Capacity (kW)</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, capacity: e.target.value }))
              }
              placeholder="e.g., 5 kW"
              className={inputStyle}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, date: date || null }))
              }
              minDate={today}
              placeholderText="Select a date"
              className="w-[137%] sm:md:w[90%] md:w-[132%] bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Preferred Time</label>
            <Select
              options={timeOptions}
              styles={customSelectStyles}
              value={timeOptions.find((t) => t.value === formData.time) || null}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, time: selected?.value || "" }))
              }
              placeholder="Select a time slot"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, message: e.target.value }))
              // auto-expand logic
              const el = e.target;
              el.rows = 1; // reset first
              const currentRows = Math.min(Math.floor(el.scrollHeight / 24), 4);
              el.rows = currentRows;
            }}
            placeholder="Tell us how we can help..."
            rows={1}
            className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 
               focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
          />
        </div>

        {/* Agreement */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeToProcessing"
              checked={formData.agreeToProcessing}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  agreeToProcessing: e.target.checked,
                }))
              }
              className="mt-1 w-4 h-4 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
            />
            <label className="text-sm text-gray-400 leading-relaxed">
              I agree to the processing of personal data
            </label>
          </div>

          {/* error message */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
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
    </div>
  );
}

/* ------------------------------- Main Shell ------------------------------- */

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-10 lg:gap-12 max-w-7xl mx-auto">

          {/* Left */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-8 self-start">
            <div className="mx-auto max-w-md lg:max-w-none">
              <DownloadCard />
            </div>
          </aside>

          {/* Right */}
          <main className="order-1 lg:order-2">
            <div className="relative max-w-2xl lg:max-w-full mx-auto">
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
                {/* subtle border glow */}
                <div className="absolute inset-0 rounded-3xl border border-green-500/20 pointer-events-none"></div>

                <ContactForm />
              </div>
            </div>

            {/* Uncomment if you want office info below */}
            {/* <div className="mt-12">
              <HeadOfficeInfo />
            </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}

