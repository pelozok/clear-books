import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig.js";

const docRef = (key) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  return doc(db, "users", uid, "data", key.replace(/:/g, "_"));
};

export const storage = {
  async get(key) {
    try {
      const snap = await getDoc(docRef(key));
      if (!snap.exists()) return null;
      return { key, value: snap.data().value };
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      await setDoc(docRef(key), { value });
      return { key, value };
    } catch {
      return null;
    }
  },
  async delete(key) {
    try {
      await deleteDoc(docRef(key));
      return { key, deleted: true };
    } catch {
      return null;
    }
  },
};
