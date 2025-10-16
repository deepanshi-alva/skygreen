"use client";
import { useState } from "react";
import { generateReportTemplate } from "./ReportTemplate";

async function generatePDF(results: any, userInput: any) {
  const pdf = await generateReportTemplate(results, userInput);
  return pdf.output("blob");
}

async function uploadReport(pdfBlob: Blob) {
  const formData = new FormData();
  formData.append("files", pdfBlob, "report.pdf");

  const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const uploadedFiles = await uploadRes.json();
  if (!uploadedFiles || !uploadedFiles[0]) throw new Error("Upload failed");
  return uploadedFiles;
}

export default function ReportDownloadModal({ results }: { results: any }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validateInputs = () => {
    if (!/^[a-zA-Z ]{3,}$/.test(form.name.trim())) {
      setError("Please enter a valid full name (only alphabets).");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    setError("");
    return true;
  };

  // ✅ Reset form & close modal
  const handleClose = () => {
    setForm({ name: "", phone: "" });
    setError("");
    setOpen(false);
  };

  // ✅ Handle Submit
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);

      // Generate unique report token
      const token = `RPT-${Math.random().toString(36).substring(2, 6).toUpperCase()}${Date.now()
        .toString(36)
        .slice(-4)
        .toUpperCase()}`;

      // Generate PDF (token appears inside)
      const pdfBlob = await generatePDF(results, {
        ...form,
        state: results?.state || "Unknown",
        report_token: token,
      });

      // Upload PDF
      const uploaded = await uploadReport(pdfBlob);

      // Save record in Strapi
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            report_token: token,
            name: form.name,
            whatsapp_number: form.phone,
            pdf_file: uploaded[0].id,
            status: "pending",
            verified: false,
          },
        }),
      });

      // ✅ STEP 2: Save Lead Data from Calculator
      const leadPayload = {
        data: {
          full_name: form.name,
          phone_number: form.phone,
          calculator_report_token: token,
          lead_source: "calculator",
          state: results?.state || "Unknown",
          user_category: results?.user_category || (results?.is_rwa ? "RWA" : "Residential"),
          system_size: results?.final_dc_kw || 0,
          inquiry_medium: "organic",
          calculator_pdf: uploaded[0].id,
        },
      };

      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      // Open PDF in new tab
      const pdfUrl = uploaded[0].url.startsWith("http")
        ? uploaded[0].url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${uploaded[0].url}`;

      alert(`✅ Your solar report has been generated!\nYour Report ID is ${token}`);
      window.open(pdfUrl, "_blank");

      // ✅ Reset form after success
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating your report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg 
          bg-[#25D366] text-black text-sm sm:text-base font-bold 
          shadow-md hover:bg-green-400 hover:scale-105 
          transition transform text-center whitespace-nowrap"
      >
        📲 Download My Report
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111] border border-green-500 rounded-xl p-6 w-11/12 sm:w-[400px] shadow-lg text-white">
            <h3 className="text-lg font-bold text-green-400 mb-4 text-center">
              Enter Your Details
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-white/10 focus:border-green-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-white/10 focus:border-green-500 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs mt-3 text-center font-medium">
                ⚠️ {error}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-md text-black font-bold"
              >
                {loading ? "Generating..." : "Submit & Download"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
