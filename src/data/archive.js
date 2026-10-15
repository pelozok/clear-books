// Respaldo: lee todo el hogar de una vez y lo descarga como JSON o Excel.
import { getDoc, getDocs } from "firebase/firestore";
import { profileRef, placesCol, recurringCol, annualCol, monthsCol, ledgerCol, entriesCol } from "./db.js";
import { docData, colData } from "./snap.js";
import { toPlain } from "./pure/monthOps.js";
import { todayISO } from "../lib/periods.js";
import { toCRC } from "../lib/format.js";

export async function fetchAllData(hid) {
  const cols = { places: placesCol, recurring: recurringCol, annual: annualCol, months: monthsCol, ledger: ledgerCol, entries: entriesCol };
  const [profile, ...lists] = await Promise.all([
    getDoc(profileRef(hid)).then(docData),
    ...Object.values(cols).map((c) => getDocs(c(hid)).then(colData)),
  ]);
  const out = { exportedAt: todayISO(), schemaVersion: 3, profile };
  Object.keys(cols).forEach((k, i) => { out[k] = lists[i]; });
  return toPlain(out);
}

const save = (blob, name) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export async function downloadBackup(hid) {
  const data = await fetchAllData(hid);
  save(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `clear-books-${data.exportedAt}.json`);
  return data;
}

const sum = (list, f) => list.reduce((s, x) => s + (Number(f(x)) || 0), 0);

// Filas para las 4 hojas (exportada para poder probarla sin Firestore).
export function excelRows(data) {
  const months = (data.months || []).slice().sort((a, b) => a.id.localeCompare(b.id));
  const people = data.profile?.people || [];
  const name = (pid) => people.find((p) => p.id === pid)?.name || pid || "";
  const places = Object.fromEntries((data.places || []).map((p) => [p.id, p.name]));

  const Meses = months.map((m) => {
    const rate = m.exchangeRate?.venta;
    const fixed = m.fixedItems || [];
    return {
      Mes: m.id,
      Estado: m.status === "closed" ? "Cerrado" : "Abierto",
      "TC venta": rate ?? "",
      Ingresos: sum(Object.values(m.incomes || {}), (i) => (Number(i.salaryCRC) || 0) + toCRC(i.salaryUSD, "USD", rate)),
      "Fijos planeados": sum(fixed.filter((f) => f.status !== "skipped"), (f) => toCRC(f.amount, f.currency, rate)),
      "Fijos pagados": sum(fixed.filter((f) => f.status === "paid"), (f) => toCRC(f.paidAmount ?? f.amount, f.currency, rate)),
      "Sobrante planeado": m.closing?.leftoverPlanned ?? "",
      "Sobrante reportado": m.closing?.leftoverReported ?? "",
      "Faltante arrastrado": m.carryover?.in || 0,
    };
  });
  const Fijos = months.flatMap((m) => (m.fixedItems || []).map((f) => ({
    Mes: m.id, Nombre: f.name, Monto: f.amount, Moneda: f.currency, Quincena: f.half,
    Estado: f.status, "Monto pagado": f.paidAmount ?? "", "Pagado el": f.paidAt ?? "",
  })));
  const Gastos = (data.entries || []).slice().sort((a, b) => String(a.date).localeCompare(String(b.date))).map((e) => ({
    Fecha: e.date, Mes: e.monthKey, Descripción: e.description, Categoría: e.categoryId,
    Monto: e.amount, Moneda: e.currency, "Monto ₡": e.amountCRC, "Del ahorro": e.source === "savings" ? "Sí" : "",
  }));
  const Ahorro = (data.ledger || []).slice().sort((a, b) => String(a.date).localeCompare(String(b.date))).map((l) => ({
    Fecha: l.date, Mes: l.monthKey, Tipo: l.type, Monto: l.amount, Moneda: l.currency,
    Lugar: places[l.placeId] || l.placeId || "", Persona: name(l.personId), Detalle: l.label, Clase: l.kind,
  }));
  return { Meses, Fijos, Gastos, Ahorro };
}

export async function downloadExcel(hid) {
  const [XLSX, data] = await Promise.all([import("xlsx"), fetchAllData(hid)]);
  const wb = XLSX.utils.book_new();
  for (const [sheet, rows] of Object.entries(excelRows(data))) {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows.length ? rows : [{}]), sheet);
  }
  XLSX.writeFile(wb, `clear-books-${data.exportedAt}.xlsx`);
  return data;
}
