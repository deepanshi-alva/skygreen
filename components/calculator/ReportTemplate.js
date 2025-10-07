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

    let str = String(value)
        .normalize("NFKC") // normalize to plain ASCII form
        .replace(/[^\x00-\x7F]/g, "") // strip all non-ASCII
        .replace(/\s+/g, " ") // normalize whitespace
        .trim();

    // Extract currency/unit parts
    const prefixMatch = str.match(/^[^\d\-]+/);
    const suffixMatch = str.match(/[^\d\.]+$/);
    const prefix = prefixMatch ? prefixMatch[0].trim() : "";
    const suffix = suffixMatch ? suffixMatch[0].trim() : "";
    const numMatch = str.match(/-?\d+(\.\d+)?/);
    const num = numMatch ? parseFloat(numMatch[0]) : NaN;

    if (!isNaN(num) && isFinite(num)) {
        const rounded = Number.isInteger(num)
            ? num.toLocaleString("en-IN")
            : num.toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
        return `${prefix}${rounded}${suffix ? " " + suffix : ""}`.trim();
    }

    return str;
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
    pdf.setFontSize(20);
    pdf.text("SKYGREEN ENERGIES SOLAR SAVINGS REPORT", 110, 17, { align: "center" });

   // ---- Report ID (below header, above first section) ----
pdf.setFont("helvetica", "normal");
pdf.setFontSize(11);
pdf.setTextColor(90, 90, 90);
pdf.text(`Report ID: ${userInputs.report_token}`, 14, 4);

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
    // force-clean all cell text before drawing
    const originalDrawCell = autoTable.applyStyles;
    autoTable.applyStyles = function (data) {
        if (data && data.cell && typeof data.cell.text === "string") {
            data.cell.text = data.cell.text.replace(/[^\x20-\x7E]/g, "");
        }
        return originalDrawCell ? originalDrawCell.apply(this, arguments) : null;
    };
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

    // /* ===== DISCLAIMERS ===== */
    // if (Array.isArray(results.disclaimer) && results.disclaimer.length) {
    //     // Start just after last table — no extra blank page unless needed
    //     let yPos = pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 8 : 20;
    //     if (yPos > 250) { pdf.addPage(); yPos = 20; }

    //     pdf.setFont("helvetica", "bold");
    //     pdf.setFontSize(13);
    //     pdf.setTextColor(0, 0, 0);
    //     pdf.text("Disclaimers & Guidelines", 14, yPos);

    //     yPos += 6;
    //     pdf.setFont("helvetica", "normal");
    //     pdf.setFontSize(10);
    //     pdf.setTextColor(60);

    //     const paragraphs = cleanDisclaimerBlocks(results.disclaimer);
    //     for (const para of paragraphs) {
    //         const lines = pdf.splitTextToSize(para, 180);
    //         pdf.text(lines, 15, yPos);
    //         yPos += lines.length * 5.2;
    //         if (yPos > 270) {
    //             pdf.addPage();
    //             yPos = 20;
    //         }
    //     }
    // }

    /* ===== FINAL BRAND PAGE ===== */

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    pdf.setTextColor(34, 197, 94);
    pdf.text("Powered by SKYGREEN Energies", 105, 130, { align: "center" });

    // Tagline / Mission Statement
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(15);
    pdf.setTextColor(40);
    pdf.text(
        "We don't believe in promises — we believe in concrete results.",
        105,
        145,
        { align: "center" }
    );
    pdf.text(
        "Every panel we deliver stands for performance, trust and truth.",
        105,
        155,
        { align: "center" }
    );

    // Small closing credit
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(80);
    pdf.text("Together, we light up a sustainable India.", 105, 215, {
        align: "center",
    });


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
