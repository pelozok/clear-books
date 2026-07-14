import { useEffect, useState } from "react";
import { onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { fixedTemplateCol, fixedItemRef } from "./db.js";

// items: null = cargando; [] = plantilla vacía.
export function useFixedTemplate(uid) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    return onSnapshot(fixedTemplateCol(uid), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setItems(list);
    });
  }, [uid]);

  const addItem = (data) =>
    addDoc(fixedTemplateCol(uid), {
      name: data.name,
      amount: Number(data.amount) || 0,
      currency: data.currency || "CRC",
      categoryId: data.categoryId,
      order: data.order ?? (items?.length || 0),
      createdAt: serverTimestamp(),
    });

  const updateItem = (id, patch) => updateDoc(fixedItemRef(uid, id), patch);
  const removeItem = (id) => deleteDoc(fixedItemRef(uid, id));

  return { items, addItem, updateItem, removeItem };
}
