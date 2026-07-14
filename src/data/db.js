import { doc, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

// Toda la data vive bajo users/{uid}/ (ver reglas de Firestore).
export const profileRef = (uid) => doc(db, "users", uid, "config", "profile");
export const fixedTemplateCol = (uid) => collection(db, "users", uid, "fixedTemplate");
export const fixedItemRef = (uid, id) => doc(db, "users", uid, "fixedTemplate", id);
export const periodRef = (uid, key) => doc(db, "users", uid, "periods", key);
export const expensesCol = (uid) => collection(db, "users", uid, "expenses");
export const expenseRef = (uid, id) => doc(db, "users", uid, "expenses", id);
export const expensesQuery = (uid, periodKey) =>
  query(expensesCol(uid), where("periodKey", "==", periodKey));
