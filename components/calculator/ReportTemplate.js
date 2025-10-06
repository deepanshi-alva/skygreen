import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------- helper: load logo safely ---------- */
async function loadLogoBase64(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

function cleanText(value) {
  if (value === null || value === undefined) return "";

  // --- Convert everything to string ---
  let str = String(value).trim();

  // --- Detect and preserve units/symbols like ₹, kW, sqft, %, years ---
  const prefixMatch = str.match(/^[^\d\-]+/); // things before the number (₹ etc.)
  const suffixMatch = str.match(/[^\d\.]+$/); // things after number (kW, sqft etc.)
  const prefix = prefixMatch ? prefixMatch[0].trim() : "";
  const suffix = suffixMatch ? suffixMatch[0].trim() : "";

  // --- Extract numeric part ---
  const numMatch = str.match(/-?\d+(\.\d+)?/);
  const num = numMatch ? parseFloat(numMatch[0]) : NaN;

  if (!isNaN(num) && isFinite(num)) {
    // Round floats to 2 decimals, format with commas for readability
    const rounded = Number.isInteger(num)
      ? num.toLocaleString("en-IN")
      : num.toLocaleString("en-IN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

    return `${prefix}${rounded}${suffix ? " " + suffix : ""}`.trim();
  }

  // --- Fallback: just clean hidden unicode if not numeric ---
  return str
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\u00B9/g, "")
    .replace(/\u202F/g, " ")
    .trim();
}

/* ---------- main generator ---------- */
export async function generateReportTemplate(results, userInputs = {}) {
    const pdf = new jsPDF("p", "mm", "a4");
    const green = [34, 197, 94];
    const dark = [30, 30, 30];

    /* ===== HEADER ===== */
    try {
        const logo = await loadLogoBase64("/images/logo-bg-remove.png");
        pdf.addImage(logo, "PNG", 12, 8, 30, 15);
    } catch { }
    pdf.setFillColor(...green);
    pdf.rect(0, 0, 210, 25, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("SKYGREEN SOLAR SAVINGS REPORT", 110, 17, { align: "center" });

    /* ===== CUSTOMER / INPUT SUMMARY ===== */
    pdf.setTextColor(...dark);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("User Inputs & Project Details", 14, 35);

    const inputsData = [
        ["State", userInputs.state || "—"],
        ["Consumer Type", userInputs.consumerType || "Residential"],
        ["Input Method", results.sizing_method || "—"],
        // ["Monthly Bill (₹)", userInputs.billAmount || "—"],
        // ["Units / Month", userInputs.units || "—"],
        // ["Connected Load (kW)", userInputs.load || "—"],
        // ["Roof Type", userInputs.roofType || "—"],
    ];
    autoTable(pdf, {
        startY: 40,
        body: inputsData,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 2 },
        margin: { left: 14, right: 14 },
        tableWidth: 182,
    });

    /* ===== SYSTEM SUMMARY ===== */
    autoTable(pdf, {
        startY: pdf.lastAutoTable.finalY + 6,
        head: [["System Summary", "Value"]],
        body: [
            ["Recommended System", cleanText(`${results.final_dc_kw} kW`)],
            ["Panels Required", cleanText(`${results.panel_count}`)],
            ["Monthly Saving", cleanText(`₹${results.monthly_saving_inr}`)],
            ["Yearly Saving", cleanText(`₹${results.annual_saving_inr}`)],
            ["Payback Period", cleanText(`${results.payback_years?.toFixed(1)} years`)],
            ["Roof Area", cleanText(`${results.roof_needed_sqft} ${results.roof_area_unit}`)],
        ],
        theme: "grid",
        headStyles: { fillColor: green, textColor: 255 },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
        tableWidth: 182,
    });

    /* ===== COST & ECONOMICS ===== */
    autoTable(pdf, {
        startY: pdf.lastAutoTable.finalY + 6,
        head: [["Cost & Subsidy Breakdown", "Value"]],
        body: [
            ["Gross Cost", cleanText(`₹${results.gross_cost_inr}`)],
            ["Central Subsidy", cleanText(`₹${results.central_subsidy_inr}`)],
            ["State Subsidy", cleanText(`₹${results.state_subsidy}`)],
            ["Net Cost After Subsidy", cleanText(`₹${results.net_cost_inr}`)],
            ["Total Grid Spend (30 yrs)", cleanText(`₹${results.total_spend}`)],
            ["Net Gain After Payback", cleanText(`₹${results.net_gain_after_payback}`)],
        ],
        theme: "grid",
        headStyles: { fillColor: green, textColor: 255 },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
        tableWidth: 182,
    });

    /* ===== SYSTEM CONFIGURATION ===== */
    let y = pdf.lastAutoTable.finalY + 8;
    if (y > 260) { pdf.addPage(); y = 20; }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("System Configuration", 14, y);
    y += 4;

    const inverterRows =
        results?.inverter_options?.map((i) => [
            `${i.inverter_size_kw} kW (${i.phase})`,
            `DC/AC ${i.dc_ac_ratio}`,
            `${i.bus_voltage} V`,
        ]) || [];
    if (inverterRows.length)
        autoTable(pdf, {
            startY: y + 4,
            head: [["Inverter", "Ratio", "Bus"]],
            body: inverterRows,
            headStyles: { fillColor: green, textColor: 255 },
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 },
            tableWidth: 182,
        });

    if (results?.string_design) {
        const single = results.string_design.single_mppt;
        const dual = results.string_design.dual_mppt || [];
        const stringRows = [];
        if (single)
            stringRows.push([
                "Single MPPT",
                `${single.panels_per_string} panels`,
                `${single.voc_total} V / ${single.isc_total} A`,
            ]);
        dual.forEach((m) =>
            stringRows.push([
                `MPPT ${m.mppt}`,
                `${m.panels_per_string} panels`,
                `${m.voc_total} V / ${m.isc_total} A`,
            ])
        );
        autoTable(pdf, {
            startY: pdf.lastAutoTable.finalY + 6,
            head: [["MPPT", "Configuration", "Electrical"]],
            body: stringRows,
            headStyles: { fillColor: green, textColor: 255 },
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 },
            tableWidth: 182,
        });
    }

    if (results?.battery_options?.length) {
        const batRows = results.battery_options
            .filter((b) => b.max_batteries_per_day > 0)
            .map((b) => [
                b.type,
                `${b.ah} Ah (${b.nominal} kWh)`,
                `${b.backup.essentials} h`,
            ]);
        autoTable(pdf, {
            startY: pdf.lastAutoTable.finalY + 6,
            head: [["Battery Type", "Capacity", "Backup (hrs)"]],
            body: batRows,
            headStyles: { fillColor: green, textColor: 255 },
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 },
            tableWidth: 182,
        });
    }

    /* ===== DISCLAIMERS ===== */
    if (Array.isArray(results.disclaimer) && results.disclaimer.length) {
        pdf.addPage();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.text("Disclaimers & Guidelines", 14, 20);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(70);

        let yPos = 28;
        results.disclaimer.forEach((block) => {
            const text = block.children.map((c) => c.text).join(" ");
            const lines = pdf.splitTextToSize(text, 180);
            pdf.text(lines, 15, yPos);
            yPos += lines.length * 5;
            if (yPos > 270) { pdf.addPage(); yPos = 20; }
        });
    }

    /* ===== FOOTER ===== */
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(100);
        pdf.text(
            `© 2025 SKYGREEN Energies | www.skygreenenergies.com`,
            105,
            287,
            { align: "center" }
        );
        pdf.text(`Page ${i} of ${pageCount}`, 200, 287, { align: "right" });
    }

    return pdf;
}
