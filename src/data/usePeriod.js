import { useEffect, useRef, useState } from "react";
import { onSnapshot, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { periodRef } from "./db.js";
import { parsePeriodKey } from "../lib/periods.js";

// Suscribe al doc del período; si no existe, lo materializa copiando
// la plantilla de fijos y los datos del perfil (snapshot editable).
export function usePeriod(uid, key, profile, template) {
  const [period, setPeriod] = useState(null); // null = cargando
  const [missing, setMissing] = useState(false);
  const creating = useRef(null);

  useEffect(() => {
    setPeriod(null);
    setMissing(false);
    return onSnapshot(periodRef(uid, key), (snap) => {
      if (snap.exists()) {
        setMissing(false);
        setPeriod(snap.data());
      } else {
        setMissing(true);
      }
    });
  }, [uid, key]);

  useEffect(() => {
    if (!missing || !profile || !template || creating.current === key) return;
    creating.current = key;
    const { month, half } = parsePeriodKey(key);
    setDoc(periodRef(uid, key), {
      key,
      month,
      half,
      fixedItems: template.map((t) => ({
        templateId: t.id,
        name: t.name,
        amount: t.amount,
        currency: t.currency,
        categoryId: t.categoryId,
        paid: false,
        paidAt: null,
      })),
      incomes: Object.fromEntries(
        profile.people.map((p) => [p.id, { crc: p.incomeCRC || 0, usd: p.incomeUSD || 0 }])
      ),
      savingsGoal: profile.savingsGoal || 0,
      exchangeRate: profile.exchangeRate,
      createdAt: serverTimestamp(),
    });
  }, [missing, profile, template, uid, key]);

  const updatePeriod = (patch) => updateDoc(periodRef(uid, key), patch);

  const patchFixedItem = (index, patch) =>
    updatePeriod({
      fixedItems: period.fixedItems.map((it, i) => (i === index ? { ...it, ...patch } : it)),
    });

  const togglePaid = (index) => {
    const paid = !period.fixedItems[index].paid;
    return patchFixedItem(index, { paid, paidAt: paid ? new Date().toISOString() : null });
  };

  return { period, updatePeriod, patchFixedItem, togglePaid };
}
