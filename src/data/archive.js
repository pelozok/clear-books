import { getDoc, getDocs } from "firebase/firestore";
import { profileRef, fixedTemplateCol, periodsCol, expensesCol } from "./db.js";

// Lee todos los datos del usuario de una vez (historial y respaldo).
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

// Descarga un respaldo completo como archivo JSON.
export async function downloadBackup(uid) {
  const data = await fetchAllData(uid);
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob(
    [JSON.stringify({ exportedAt: new Date().toISOString(), ...data }, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `clear-books-respaldo-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
