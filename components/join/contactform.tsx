"use client";

import React, { useMemo, useState } from "react";
import { Download, ChevronRight } from "lucide-react";

/* --------------------------------- Types --------------------------------- */

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
  email?: string;
  businessType: BusinessType;
  otherBusinessType?: string;
  reason: string; // why you want to join us
  city: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:00 - 10:30"
};

type SubmitState = {
  errors: Partial<Record<keyof FormData, string>>;
  submitted: boolean;
};

/* ----------------------------- Left Components ---------------------------- */

function DownloadCard() {
  return (
    <div className="space-y-8">
      {/* Download Presentation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Download className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold">Download Presentation</h2>
        </div>

        {/* Company Profile Card */}
        <div className="relative bg-gray-900 rounded-lg p-1 overflow-hidden">
          <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg">
            {/* Green accent triangle */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-green-500" />

            {/* SKYGREEN Badge */}
            <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
              SKYGREEN
            </div>

            {/* Content */}
            <div className="relative z-10 mt-16">
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                COMPANY
                <br />
                PROFILE
              </h3>
              <p className="text-sm text-gray-300">It&apos;s time to save the world.</p>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-transparent to-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <p className="text-gray-300">
          <span className="text-white font-semibold">Indian brand</span> in the
          renewable energy industry, providing high-quality products and
          services to <span className="text-white font-semibold">your doorstep.</span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Helper Components --------------------------- */

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-sm text-red-400">{msg}</p>;
}

/* ---------------------------- Right: Join Form ---------------------------- */

function JoinUsForm() {
  const minDate = useMemo(() => {
    // Today (IST-safe enough for client) -> YYYY-MM-DD
    const d = new Date();
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    return iso;
  }, []);

  const timeSlots = useMemo(
    () => [
      "10:00 - 10:30",
      "10:30 - 11:00",
      "11:00 - 11:30",
      "11:30 - 12:00",
      "14:00 - 14:30",
      "14:30 - 15:00",
      "15:00 - 15:30",
      "15:30 - 16:00",
      "16:00 - 16:30",
      "16:30 - 17:00",
      "17:00 - 17:30",
      "17:30 - 18:00",
    ],
    []
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    businessType: "Distributor",
    otherBusinessType: "",
    reason: "",
    city: "",
    date: "",
    timeSlot: "",
  });

  const [state, setState] = useState<SubmitState>({ errors: {}, submitted: false });

  const setField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setState((s) => ({ ...s, errors: { ...s.errors, [name]: "" } }));
  };

  const validate = (): boolean => {
    const errors: SubmitState["errors"] = {};
    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }
    // email is optional; basic check if present
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email or leave it blank.";
    }
    if (!formData.city.trim()) errors.city = "Please enter your city.";
    if (!formData.reason.trim()) errors.reason = "Please tell us why you want to join.";
    if (!formData.businessType) errors.businessType = "Select a business type.";
    if (formData.businessType === "Other" && !formData.otherBusinessType?.trim()) {
      errors.otherBusinessType = "Please specify your business type.";
    }
    if (!formData.date) errors.date = "Select a date.";
    if (!formData.timeSlot) errors.timeSlot = "Select a time slot.";

    setState({ errors, submitted: Object.keys(errors).length === 0 });
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      businessType:
        formData.businessType === "Other"
          ? `Other: ${formData.otherBusinessType}`
          : formData.businessType,
    };

    console.log("Appointment booked:", payload);
    // You can replace the above with your API call
    // await fetch('/api/join', { method: 'POST', body: JSON.stringify(payload) })

    // Optional: clear or show success UI
    alert("Appointment booked! We’ll contact you shortly.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      businessType: "Distributor",
      otherBusinessType: "",
      reason: "",
      city: "",
      date: "",
      timeSlot: "",
    });
    setState({ errors: {}, submitted: false });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl lg:text-5xl font-bold mb-2">
        Join the <span className="text-green-500">SKYGREEN Network</span>
      </h1>
      <p className="text-gray-300">
        Book a quick appointment and tell us about your business.
      </p>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Your full name"
            className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
          />
          <FieldError msg={state.errors.name} />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-medium mb-2">Number</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-300">+91</span>
            <input
              type="tel"
              name="phone"
              inputMode="numeric"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit mobile number"
              className="flex-1 bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
          </div>
          <FieldError msg={state.errors.phone} />
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Email <span className="text-gray-500 text-sm">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
          />
          <FieldError msg={state.errors.email} />
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-lg font-medium mb-2">Business Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="businessType"
              value={formData.businessType}
              onChange={(e) => setField("businessType", e.target.value as BusinessType)}
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white focus:border-green-500 focus:outline-none transition-colors duration-200"
            >
              {[
                "Distributor",
                "Dealer",
                "Retailer",
                "EPC Company",
                "Installer",
                "Other",
              ].map((opt) => (
                <option key={opt} value={opt} className="bg-black">
                  {opt}
                </option>
              ))}
            </select>

            {formData.businessType === "Other" && (
              <input
                type="text"
                name="otherBusinessType"
                value={formData.otherBusinessType || ""}
                onChange={(e) => setField("otherBusinessType", e.target.value)}
                placeholder="Please specify"
                className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
              />
            )}
          </div>
          <FieldError msg={state.errors.businessType || state.errors.otherBusinessType} />
        </div>

        {/* Why you want to join us */}
        {/* Why you want to join us */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Why do you want to join us?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={(e) => {
              setField("reason", e.target.value);

              // auto-expand logic
              const el = e.target;
              el.rows = 1; // reset first
              const currentRows = Math.min(Math.floor(el.scrollHeight / 24), 4);
              el.rows = currentRows;
            }}
            placeholder="Tell us a bit about your goals and expectations"
            rows={1}
            className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 
               focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
          />
          <FieldError msg={state.errors.reason} />
        </div>


        {/* City */}
        <div>
          <label className="block text-lg font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) => setField("city", e.target.value)}
            placeholder="Your city"
            className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
          />
          <FieldError msg={state.errors.city} />
        </div>

        {/* Date + Time Slot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Select date to book the appointment
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => {
                // Reset time slot if date changes
                setField("date", e.target.value);
                setField("timeSlot", "");
              }}
              min={minDate}
              className="w-full bg-transparent border-b-2 border-gray-700 pb-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
            <FieldError msg={state.errors.date} />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Select the time slot for the selected date
            </label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={(e) => setField("timeSlot", e.target.value)}
              disabled={!formData.date}
              className={`w-full bg-transparent border-b-2 pb-2 text-white focus:border-green-500 focus:outline-none transition-colors duration-200 ${formData.date ? "border-gray-700" : "border-gray-800 text-gray-500"
                }`}
            >
              <option value="" className="bg-black">
                {formData.date ? "Choose a slot" : "Select date first"}
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="bg-black">
                  {slot}
                </option>
              ))}
            </select>
            <FieldError msg={state.errors.timeSlot} />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="group flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            disabled={!formData.name || !formData.phone || !formData.city || !formData.date || !formData.timeSlot || !formData.reason}
          >
            Book appointment
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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 lg:pr-15 pt-16">
        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-[22%_75%] 
            gap-19 
            max-w-7xl 
            mx-auto
          "
        >
          {/* Left: 20% width */}
          <aside className="lg:sticky lg:top-8 self-start">
            <DownloadCard />
          </aside>

          {/* Right: 75% width */}
          <main>
            <div className="p-16 bg-[url('/images/testimonials/download_converted.png')] bg-no-repeat bg-cover bg-center rounded-4xl">
              <JoinUsForm />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
