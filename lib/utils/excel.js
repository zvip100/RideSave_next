import * as XLSX from "xlsx";

/**
 * Generate an Excel (.xlsx) buffer containing trip data
 * @param {Array} trips - Array of trip objects from the database
 * @param {string} weekStart - Formatted start date string (e.g. "Mar 9, 2026")
 * @returns {{ buffer: Buffer, filename: string }}
 */
export function generateTripsExcel(trips, weekStart) {
  const rows = trips.map((trip) => {
    const date = new Date(trip.time);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      Date: dateStr,
      Time: timeStr,
      From: trip.from,
      To: trip.to,
      Type: trip.type,
      "Payment Method": trip.paymentMethod || "",
      "Clock Only": trip.clockOnly ? "Yes" : "",
      "Stops Price": trip.stopsPrice
        ? `$${(trip.stopsPrice / 100).toFixed(2)}`
        : "",
      "Stops Payment": trip.stopsPaymentMethod || "",
      "Waiting Price": trip.waitingPrice
        ? `$${(trip.waitingPrice / 100).toFixed(2)}`
        : "",
      "Waiting Payment": trip.waitingPaymentMethod || "",
      Notes: trip.notes || "",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");

  // Auto-size columns based on content
  const colWidths = Object.keys(rows[0] || {}).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...rows.map((r) => String(r[key] || "").length),
    );
    return { wch: Math.min(maxLen + 2, 40) };
  });
  worksheet["!cols"] = colWidths;

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  const safeName = `Trip_Report_${weekStart}`.replace(/[\s,]+/g, "_");
  const filename = `${safeName}.xlsx`;

  return { buffer, filename };
}
