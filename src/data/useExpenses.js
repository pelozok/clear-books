import { useEffect, useState } from "react";
import { onSnapshot, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { expensesQuery, expensesCol, expenseRef } from "./db.js";

// Gastos variables del período. null = cargando.
export function useExpenses(uid, periodKey) {
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    setExpenses(null);
    return onSnapshot(expensesQuery(uid, periodKey), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Más recientes primero; el orden se resuelve en cliente para no requerir índice compuesto.
      list.sort(
        (a, b) =>
          b.date.localeCompare(a.date) ||
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
      setExpenses(list);
    });
  }, [uid, periodKey]);

  const addExpense = (data) =>
    addDoc(expensesCol(uid), {
      periodKey,
      date: data.date,
      description: data.description || "",
      amount: Number(data.amount) || 0,
      currency: data.currency || "CRC",
      categoryId: data.categoryId,
      createdAt: serverTimestamp(),
    });

  const removeExpense = (id) => deleteDoc(expenseRef(uid, id));

  return { expenses, addExpense, removeExpense };
}
