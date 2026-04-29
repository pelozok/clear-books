import { useState } from "react";
import { T, fontMono, fontBody } from "../lib/constants.js";
import { todayISO, monthKey } from "../lib/helpers.js";
import { Field, Modal } from "./ui.jsx";

export function AddExpenseModal({ onAdd, onClose, currentMonth, categories }) {
  const [amount,      setAmount]      = useState("");
  const [currency,    setCurrency]    = useState("CRC");
  const [category,    setCategory]    = useState(categories[0]?.id || "");
  const defaultDate = monthKey(todayISO()) === currentMonth ? todayISO() : `${currentMonth}-01`;
  const [date,        setDate]        = useState(defaultDate);
  const [description, setDescription] = useState("");

  const valid = parseFloat(amount) > 0;

  const submit = () => {
    if (!valid) return;
    onAdd({
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      amount: parseFloat(amount), currency, category, date,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Modal onClose={onClose} title="Nuevo gasto">
      <div className="space-y-5">
        <Field label="Monto">
          <div className="flex gap-2 mb-3">
            {["CRC", "USD"].map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                style={{
                  background: currency === c ? T.accent : "white",
                  color: currency === c ? "white" : T.ink2,
                  borderColor: currency === c ? T.accent : T.line,
                }}
                className="px-4 py-1.5 border rounded-lg text-xs font-semibold tracking-wide transition">
                {c === "CRC" ? "₡ Colones" : "$ Dólares"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span style={{ ...fontMono, color: T.muted }} className="text-2xl">{currency === "USD" ? "$" : "₡"}</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0" autoFocus
              style={{ background: "transparent", borderColor: T.line, color: T.ink, ...fontMono }}
              className="flex-1 px-3 py-2 border-b-2 text-2xl font-semibold focus:outline-none transition"
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
        </Field>

        <Field label="Categoría">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map(c => {
              const sel = category === c.id;
              return (
                <button key={c.id} onClick={() => setCategory(c.id)}
                  style={{ borderColor: sel ? c.color : T.line, background: sel ? c.color + "12" : "white", color: sel ? c.color : T.ink2 }}
                  className="flex flex-col items-center gap-1.5 p-3 border rounded-xl text-xs font-medium transition">
                  <span className="text-lg leading-none">{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Fecha">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
        </Field>

        <Field label="Descripción" hint="Opcional">
          <input type="text" value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Supermercado, gasolina…"
            style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
            onKeyDown={e => e.key === "Enter" && submit()} />
        </Field>

        <button onClick={submit} disabled={!valid}
          style={{ background: valid ? T.accent : T.line, color: valid ? "white" : T.muted, cursor: valid ? "pointer" : "not-allowed" }}
          className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition">
          Guardar gasto
        </button>
      </div>
    </Modal>
  );
}
