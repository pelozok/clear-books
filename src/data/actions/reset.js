// Empezar de cero: borra todo el hogar (lo mismo que exporta archive.js).
// El perfil va de último: si algo falla a medio camino, el hogar sigue en pie y se
// puede reintentar; al borrarlo, la app manda al onboarding.
import { deleteDoc, getDocs } from "firebase/firestore";
import { profileRef, placesCol, recurringCol, annualCol, monthsCol, ledgerCol, entriesCol } from "../db.js";
import { newBatch, isOffline } from "../snap.js";

const BATCH_MAX = 450; // límite de Firestore: 500 operaciones por batch

export async function wipeHousehold(hid, me) {
  if (!hid || hid !== me?.uid) throw new Error("Solo quien creó el hogar puede borrarlo");
  if (isOffline()) throw new Error("Necesitás conexión para borrar tus datos");

  const cols = [entriesCol, ledgerCol, monthsCol, recurringCol, annualCol, placesCol];
  const snaps = await Promise.all(cols.map((c) => getDocs(c(hid))));
  const refs = snaps.flatMap((s) => s.docs.map((d) => d.ref));

  for (let i = 0; i < refs.length; i += BATCH_MAX) {
    const batch = newBatch();
    refs.slice(i, i + BATCH_MAX).forEach((r) => batch.delete(r));
    await batch.commit();
  }
  await deleteDoc(profileRef(hid));
  return refs.length + 1;
}
