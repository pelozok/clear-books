// Cerrar sesión sin dejar datos en el aparato: la caché offline de Firestore
// (IndexedDB) y los recordatorios locales se borran. En la nube no se toca nada.
import { signOut } from "firebase/auth";
import { clearIndexedDbPersistence, terminate, waitForPendingWrites } from "firebase/firestore";
import { auth, db } from "../firebaseConfig.js";
import { isOffline } from "./snap.js";

const PENDING_TIMEOUT_MS = 8000;

// Recordatorios locales (último lugar/categoría, borrador del onboarding).
export function clearLocalPrefs() {
  try {
    Object.keys(window.localStorage).filter((k) => k.startsWith("cb.")).forEach((k) => window.localStorage.removeItem(k));
    window.sessionStorage.clear();
  } catch {
    /* almacenamiento bloqueado: se ignora */
  }
}

// Antes de borrar la caché, los cambios hechos sin conexión tienen que haber subido:
// si no, se perderían.
export async function signOutAndForget() {
  if (isOffline()) throw new Error("Conectate antes de cerrar sesión, para que tus últimos cambios se suban");
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Tus últimos cambios no terminaron de subir. Revisá la conexión e intentá de nuevo")), PENDING_TIMEOUT_MS);
  });
  try {
    await Promise.race([waitForPendingWrites(db), timeout]);
  } finally {
    clearTimeout(timer);
  }
  await signOut(auth);
  await terminate(db);
  await clearIndexedDbPersistence(db).catch((e) => console.warn("No se pudo borrar la caché local", e));
  clearLocalPrefs();
  // Firestore queda terminado: recargar arranca una instancia nueva y limpia.
  window.location.reload();
}
