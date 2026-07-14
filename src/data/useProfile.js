import { useEffect, useState } from "react";
import { onSnapshot, setDoc, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { profileRef, fixedTemplateCol } from "./db.js";

// profile: undefined = cargando, null = no existe (→ onboarding), objeto = listo.
export function useProfile(uid) {
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    return onSnapshot(
      profileRef(uid),
      (snap) => setProfile(snap.exists() ? snap.data() : null),
      () => setProfile(null)
    );
  }, [uid]);

  const saveProfile = (patch) => setDoc(profileRef(uid), patch, { merge: true });

  return { profile, saveProfile };
}

// Escribe el perfil y la plantilla de gastos fijos inicial en un solo batch.
export async function createProfile(uid, profileData, fixedItems) {
  const batch = writeBatch(db);
  batch.set(profileRef(uid), {
    ...profileData,
    onboardingComplete: true,
    createdAt: serverTimestamp(),
  });
  fixedItems.forEach((item, i) => {
    batch.set(doc(fixedTemplateCol(uid)), {
      name: item.name,
      amount: Number(item.amount) || 0,
      currency: item.currency || "CRC",
      categoryId: item.categoryId,
      order: i,
      createdAt: serverTimestamp(),
    });
  });
  await batch.commit();
}
