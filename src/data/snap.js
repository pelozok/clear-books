// Utilidades de snapshots y escritura compartidas por hooks y acciones.
import { writeBatch } from "firebase/firestore";
import { db } from "./db.js";

export const docData = (snap) => (snap?.exists() ? { id: snap.id, ...snap.data() } : null);
export const colData = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

const isOffline = () => typeof navigator !== "undefined" && navigator.onLine === false;

// Sin conexión, commit() no resuelve hasta sincronizar: la escritura ya quedó en la
// caché local (los onSnapshot la ven), así que no bloqueamos la UI esperándola.
export const commit = (batch) => {
  const p = batch.commit();
  if (isOffline()) {
    p.catch((e) => console.error("Escritura offline falló al sincronizar", e));
    return Promise.resolve();
  }
  return p;
};

export const newBatch = () => writeBatch(db);
export { isOffline };
