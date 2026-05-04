import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { T, COLOR_PALETTE, DEFAULT_CATEGORIES, fontSans, fontBody } from "../../lib/constants.js";

const EMOJI_LIST = [
  "🏠","🏡","🛋️","🔑","💡","🛁","⚡","🏗️",
  "🍽️","🍔","🍕","🛒","☕","🍷","🥗","🥩",
  "🚗","🚌","✈️","🚂","⛽","🛵","🚴","🏍️",
  "📱","📺","💻","🌐","🔧","📡","💧","📷",
  "❤️","💊","🏥","🩺","🏃","🧘","🦷","🧴",
  "📚","🎓","📖","✏️","🧠","🔬","🎒","📐",
  "🎬","🎮","🎵","🎨","⚽","🏋️","🎯","🎲",
  "👕","👗","👟","💄","🛍️","💍","👜","🧴",
  "🐕","🐈","🐾","🌿","🐠","🌱","🌸","🦋",
  "💰","💵","💳","🏦","📊","💼","📦","🎁",
];

function EmojiPicker({ onSelect, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [onClose]);

  return (
    <div ref={ref}
      style={{ background: "white", borderColor: T.line, width: "min(260px, calc(100vw - 2rem))" }}
      className="absolute z-50 top-full mt-1 left-0 border rounded-2xl shadow-xl p-3">
      <div className="grid grid-cols-8 gap-0.5 max-h-48 overflow-y-auto">
        {EMOJI_LIST.map(e => (
          <button key={e} type="button" onClick={() => onSelect(e)}
            className="w-8 h-8 flex items-center justify-center text-xl rounded-lg hover:bg-slate-100 active:bg-slate-200 transition">
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryEditor({ localCategories, setLocalCategories, setCustomBudgets, config, expenses, onReassign }) {
  const [editingCat,             setEditingCat]             = useState(null);
  const [confirmDeleteCat,       setConfirmDeleteCat]       = useState(null);
  const [reassignTo,             setReassignTo]             = useState(null);
  const [confirmRestoreDefaults, setConfirmRestoreDefaults] = useState(false);
  const [showEmojiPicker,        setShowEmojiPicker]        = useState(false);

  const saveCat = () => {
    if (!editingCat.label.trim() || !editingCat.emoji.trim()) return;
    if (editingCat.isNew) {
      const newId  = "cat_" + Date.now().toString(36);
      const newCat = { id: newId, label: editingCat.label.trim(), emoji: editingCat.emoji.trim(), type: editingCat.type, color: editingCat.color };
      setLocalCategories(prev => [...prev, newCat]);
    } else {
      setLocalCategories(prev => prev.map(c =>
        c.id === editingCat.id
          ? { ...c, label: editingCat.label.trim(), emoji: editingCat.emoji.trim(), type: editingCat.type, color: editingCat.color }
          : c
      ));
    }
    setEditingCat(null);
    setShowEmojiPicker(false);
  };

  const deleteCat = (id) => {
    if (localCategories.length <= 1) return;
    const remaining = localCategories.filter(c => c.id !== id);
    const targetId  = reassignTo ?? remaining.at(-1)?.id;
    onReassign?.(id, targetId);
    setLocalCategories(remaining);
    setCustomBudgets(prev => { const next = { ...prev }; delete next[id]; return next; });
    setConfirmDeleteCat(null);
    setReassignTo(null);
  };

  return (
    <div className="space-y-1">
      {localCategories.map(cat => {
        const expCount    = expenses.filter(e => e.category === cat.id).length;
        const isConfirming = confirmDeleteCat === cat.id;
        const remaining   = localCategories.filter(c => c.id !== cat.id);
        return (
          <div key={cat.id}>
            <div className="flex items-center gap-2.5 py-2">
              <div style={{ background: cat.color + "18" }}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                {cat.emoji}
              </div>
              <span style={{ color: T.ink }} className="flex-1 text-sm font-medium min-w-0 truncate">{cat.label}</span>
              <span style={{
                background: cat.type === "necesidad" ? T.accent + "18" : "#7c3aed18",
                color: cat.type === "necesidad" ? T.accent : "#7c3aed",
              }} className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                {cat.type === "necesidad" ? "Necesidad" : "Deseo"}
              </span>
              <button onClick={() => { setEditingCat({ isNew: false, ...cat }); setConfirmDeleteCat(null); setShowEmojiPicker(false); }}
                style={{ color: T.muted }}
                className="p-1.5 rounded-lg hover:text-indigo-500 hover:bg-indigo-50 transition shrink-0">
                <Pencil size={13} />
              </button>
              {localCategories.length > 1 && (
                <button
                  onClick={() => { setConfirmDeleteCat(isConfirming ? null : cat.id); setReassignTo(null); }}
                  style={{ color: isConfirming ? T.bad : T.muted }}
                  className="p-1.5 rounded-lg hover:text-red-500 hover:bg-red-50 transition shrink-0">
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            {isConfirming && (
              <div style={{ background: "#fef2f2", borderColor: "#fecaca" }} className="mb-1 p-3 rounded-xl border text-xs space-y-2.5">
                {expCount > 0 ? (
                  <div className="space-y-2">
                    <p style={{ color: T.bad }}>Hay {expCount} gasto{expCount !== 1 ? "s" : ""} en esta categoría.</p>
                    <div>
                      <div style={{ color: T.ink2 }} className="text-xs mb-1.5 font-medium">Mover los gastos a:</div>
                      <select
                        value={reassignTo ?? remaining.at(-1)?.id ?? ""}
                        onChange={e => setReassignTo(e.target.value)}
                        style={{ background: "white", borderColor: "#fecaca", color: T.ink }}
                        className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none">
                        {remaining.map(c => (
                          <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: T.ink2 }}>¿Eliminar "{cat.label}"?</p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => deleteCat(cat.id)} style={{ background: T.bad, color: "white" }}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold">Eliminar</button>
                  <button onClick={() => { setConfirmDeleteCat(null); setReassignTo(null); }}
                    style={{ borderColor: T.line, color: T.ink2 }}
                    className="flex-1 py-2 rounded-lg border text-xs">Cancelar</button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {editingCat === null && (
        <button onClick={() => { setEditingCat({ isNew: true, id: "", label: "", emoji: "📦", type: "necesidad", color: "#4f46e5" }); setConfirmDeleteCat(null); }}
          style={{ color: T.accent }} className="flex items-center gap-2 text-sm font-semibold hover:underline pt-1">
          <Plus size={14} /> Nueva categoría
        </button>
      )}

      {editingCat !== null && (
        <div style={{ background: T.bg2, borderColor: T.line }} className="border rounded-xl p-4 space-y-4">
          <div style={{ color: T.ink, ...fontSans, fontWeight: 700 }} className="text-xs tracking-wide uppercase">
            {editingCat.isNew ? "Nueva categoría" : "Editar categoría"}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1.5">Icono</div>
              <button type="button"
                onClick={() => setShowEmojiPicker(p => !p)}
                style={{ background: "white", borderColor: showEmojiPicker ? T.accent : T.line, fontSize: "1.35rem" }}
                className="w-14 h-11 border-2 rounded-xl flex items-center justify-center hover:border-indigo-400 transition">
                {editingCat.emoji || "📦"}
              </button>
              {showEmojiPicker && (
                <EmojiPicker
                  onSelect={e => { setEditingCat(p => ({ ...p, emoji: e })); setShowEmojiPicker(false); }}
                  onClose={() => setShowEmojiPicker(false)} />
              )}
            </div>
            <div className="flex-1">
              <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1.5">Nombre</div>
              <input type="text" value={editingCat.label}
                onChange={e => setEditingCat(p => ({ ...p, label: e.target.value }))}
                placeholder="Ej: Mascotas" autoFocus
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
                className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                onKeyDown={e => e.key === "Enter" && saveCat()} />
            </div>
          </div>

          <div>
            <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-2">Tipo</div>
            <div className="flex gap-2">
              {["necesidad", "deseo"].map(t => (
                <button key={t} onClick={() => setEditingCat(p => ({ ...p, type: t }))}
                  style={{
                    background: editingCat.type === t ? (t === "necesidad" ? T.accent : "#7c3aed") : "white",
                    color: editingCat.type === t ? "white" : T.ink2,
                    borderColor: editingCat.type === t ? (t === "necesidad" ? T.accent : "#7c3aed") : T.line,
                  }}
                  className="flex-1 py-2.5 border rounded-xl text-xs font-semibold transition">
                  {t === "necesidad" ? "Necesidad" : "Deseo"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTE.map(c => (
                <button key={c} onClick={() => setEditingCat(p => ({ ...p, color: c }))}
                  style={{ background: c, outline: editingCat.color === c ? `3px solid ${c}` : "none", outlineOffset: "2px" }}
                  className="w-7 h-7 rounded-full transition hover:scale-110 active:scale-95" />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={saveCat}
              disabled={!editingCat.label.trim() || !editingCat.emoji.trim()}
              style={{
                background: editingCat.label.trim() && editingCat.emoji.trim() ? T.accent : T.line,
                color: editingCat.label.trim() && editingCat.emoji.trim() ? "white" : T.muted,
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition">
              {editingCat.isNew ? "Agregar" : "Guardar"}
            </button>
            <button onClick={() => { setEditingCat(null); setShowEmojiPicker(false); }}
              style={{ borderColor: T.line, color: T.ink2 }}
              className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-slate-50 transition">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {!confirmRestoreDefaults ? (
        <button onClick={() => setConfirmRestoreDefaults(true)}
          style={{ color: T.muted }} className="text-xs hover:underline pt-1">
          Restaurar categorías por defecto
        </button>
      ) : (
        <div style={{ background: "#fffbeb", borderColor: "#fde68a" }} className="p-3 rounded-xl border text-xs space-y-2">
          <p style={{ color: T.warn }} className="font-semibold">Las categorías personalizadas se perderán. ¿Continuar?</p>
          <div className="flex gap-2">
            <button onClick={() => {
              setLocalCategories(DEFAULT_CATEGORIES);
              setCustomBudgets(Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c.id, config.budgets?.[c.id]?.toString() ?? ""])));
              setConfirmRestoreDefaults(false);
            }} style={{ background: T.warn, color: "white" }} className="flex-1 py-1.5 rounded-lg text-xs font-semibold">Restaurar</button>
            <button onClick={() => setConfirmRestoreDefaults(false)}
              style={{ borderColor: T.line, color: T.ink2 }} className="flex-1 py-1.5 rounded-lg border text-xs">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
