// Empezar de cero: borra todo el hogar (lo mismo que exporta archive.js).
// Primero marca el perfil con `wiping` para que ninguna pestaña abierta recree el mes
// (ensureMonth lo revisa en su transacción). El perfil va de último: si algo falla a
// medio camino, se quita la marca y se puede reintentar; al borrarlo, la app manda al onboarding.
import { deleteDoc, deleteField, getDocs, updateDoc } from "firebase/firestore";
import { profileRef, placesCol, recurringCol, annualCol, monthsCol, ledgerCol, entriesCol } from "../db.js";
import { newBatch, isOffline } from "../snap.js";

const BATCH_MAX = 450; // límite de Firestore: 500 operaciones por batch

export async function wipeHousehold(hid, me) {
  if (!hid || hid !== me?.uid) throw new Error("Solo quien creó el hogar puede borrarlo");
  if (isOffline()) throw new Error("Necesitás conexión para borrar tus datos");

  await updateDoc(profileRef(hid), { wiping: true });
  const cols = [entriesCol, ledgerCol, monthsCol, recurringCol, annualCol, placesCol];
  let refs;
  try {
    const snaps = await Promise.all(cols.map((c) => getDocs(c(hid))));
    refs = snaps.flatMap((s) => s.docs.map((d) => d.ref));
    for (let i = 0; i < refs.length; i += BATCH_MAX) {
      const batch = newBatch();
      refs.slice(i, i + BATCH_MAX).forEach((r) => batch.delete(r));
      await batch.commit();
    }
  } catch (e) {
    await updateDoc(profileRef(hid), { wiping: deleteField() }).catch(() => {});
    throw e;
  }
  await deleteDoc(profileRef(hid));
  return refs.length + 1;
}
