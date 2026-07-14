import { getDoc, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { profileRef, fixedTemplateCol, periodsCol, expensesCol } from "./db.js";
import { sumCRC } from "../lib/calc.js";
import { periodLabel } from "../lib/periods.js";
import { DEFAULT_RATE } from "../lib/exchange.js";

// Lee todos los datos del usuario de una vez (historial y export).
export async function fetchAllData(uid) {
  const [profileSnap, templateSnap, periodsSnap, expensesSnap] = await Promise.all([
    getDoc(profileRef(uid)),
    getDocs(fixedTemplateCol(uid)),
    getDocs(periodsCol(uid)),
    getDocs(expensesCol(uid)),
  ]);
  return {
    profile: profileSnap.exists() ? profileSnap.data() : null,
    fixedTemplate: templateSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    periods: periodsSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    expenses: expensesSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
  };
}

// Resumen por período (mismo cálculo del machote), más reciente primero.
export function summarizePeriods(periods, expenses) {
  return periods
    .map((p) => {
      const rate = p.exchangeRate || DEFAULT_RATE;
      const income = Object.values(p.incomes || {}).reduce(
        (s, inc) => s + (Number(inc.crc) || 0) + (Number(inc.usd) || 0) * rate,
        0
      );
      const fixed = sumCRC(p.fixedItems || [], rate);
      const variable = sumCRC(expenses.filter((e) => e.periodKey === p.key), rate);
      const savings = Number(p.savingsGoal) || 0;
      return {
        key: p.key,
        income,
        fixed,
        variable,
        gastos: fixed + variable,
        savings,
        sobrante: income - fixed - variable,
        final: income - fixed - variable - savings,
      };
    })
    .sort((a, b) => b.key.localeCompare(a.key));
}

const byPeriodDesc = (a, b) => b.key.localeCompare(a.key);

// Exporta todo a un Excel legible (como el machote): 3 hojas.
export async function downloadExcel(uid) {
  const { profile, periods, expenses } = await fetchAllData(uid);
  const cats = profile?.categories || [];
  const catLabel = (id) => cats.find((c) => c.id === id)?.label || id || "";

  const resumen = summarizePeriods(periods, expenses).map((r) => ({
    "Período": periodLabel(r.key),
    "Ingresos ₡": r.income,
    "Gastos fijos ₡": r.fixed,
    "Gastos variables ₡": r.variable,
    "Sobrante ₡": r.sobrante,
    "Ahorro ₡": r.savings,
    "Terminamos con ₡": r.final,
  }));

  const fijos = [...periods].sort(byPeriodDesc).flatMap((p) =>
    (p.fixedItems || []).map((it) => ({
      "Período": periodLabel(p.key),
      "Gasto": it.name,
      "Monto": it.amount,
      "Moneda": it.currency === "USD" ? "$" : "₡",
      "Pagado": it.paid ? "Sí" : "No",
    }))
  );

  const variables = [...expenses]
    .sort((a, b) => b.periodKey.localeCompare(a.periodKey) || b.date.localeCompare(a.date))
    .map((e) => ({
      "Fecha": e.date,
      "Período": periodLabel(e.periodKey),
      "Descripción": e.description || "",
      "Categoría": catLabel(e.categoryId),
      "Monto": e.amount,
      "Moneda": e.currency === "USD" ? "$" : "₡",
    }));

  const wb = XLSX.utils.book_new();
  const addSheet = (rows, name, widths) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = widths.map((wch) => ({ wch }));
    XLSX.utils.book_append_sheet(wb, ws, name);
  };
  addSheet(resumen, "Resumen", [26, 14, 14, 16, 14, 12, 16]);
  addSheet(fijos, "Gastos fijos", [26, 28, 12, 8, 8]);
  addSheet(variables, "Gastos variables", [12, 26, 28, 18, 12, 8]);

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `clear-books-${stamp}.xlsx`);
}
