# Capa de datos v4 — firmas para las páginas

`me` = `useHousehold().me` (o el email). Toda acción de mes recibe `month` (doc de `useMonth`, trae `id: 'YYYY-MM'`) y lanza si el mes está cerrado.

## Contexto
`import { useHousehold } from '../data/HouseholdContext.jsx'` → `{ hid, me:{uid,email,displayName,photoURL}, profile, loading, error }`

## Hooks (`src/data/hooks/index.js`) → `{ data, loading, error }`
- `useProfile(hid)` (un doc `{id,...}`)
- `useSavingsPlaces(hid)`, `useRecurring(hid)` (por order), `useAnnual(hid)` (por mes), `useLedger(hid)` (fecha desc)
- `useEntries(hid, monthKey)` (fecha desc), `useMonthsIndex(hid)` (id desc)
- `useMonth(hid, key)` → además `tooFar` (> actual+1) y `beforeStart` (antes de profile.startedAt)

## Acciones (`src/data/actions/index.js`)
- Perfil: `createProfile(hid, me, { profile, recurring, annual, places, today? })` → hid; `saveProfile(hid, me, patch)`
- Plantillas/lugares: `addRecurring|addAnnual|addPlace(hid, me, item)` → id; `updateRecurring|updateAnnual|updatePlace(hid, me, id, patch)`; `removeRecurring|removeAnnual|removePlace(hid, me, id)` (pone active:false)
- `applyToCurrentMonth(hid, me, month, recurringItem)` (llamar tras editar plantilla; para quitar del mes: `{...item, active:false}`)
- Ahorro: `confirmSavings(hid, me, month, { personId, half=1, amount, placeId, date?, note?, currency? })` → ledgerId (amount 0 = sin ledger); `clearSavings(hid, me, month, { personId, half })`; `confirmReserve(hid, me, month, { placeId, date? })`; `clearReserve(hid, me, month)`; `recordWithdrawal(hid, me, { placeId, amount, currency?, date?, label?, kind='expense', reserveId?, personId?, monthKey? })` → id; `recordExtraContribution(...)` misma forma (aporte, kind 'extra')
- Mes: `markFixed(hid, me, month, itemId, { status, paidAmount?, paidAt? })`; `updateFixedItem(hid, me, month, item)` (edita o agrega); `updateMonthField(hid, me, month, path, value)` (ej. `'incomes.p1.salaryCRC'`, `'exchangeRate'`, `'savings.perPerson.p1.q1.planned'`)
- Extras: `addExtra(hid, me, month, extra)` → id (source 'ahorro' requiere `extra.placeId`); `removeExtra(hid, me, month, extraId)`; `payAnnual(hid, me, month, { annualId, amount, currency?, date?, fromSavings?, placeId?, label? })`
- Gastos: `addEntry(hid, me, data, rate)` → id; `updateEntry(hid, me, entry, patch, rate)`; `removeEntry(hid, me, entry)` (`rate` = TC del mes)
- Cierre: `closeMonth(hid, me, month, applyCloseResult, { placeId? })`; `markCloseSeen(hid, me, month)`
- Archivo (`src/data/archive.js`): `fetchAllData(hid)`, `downloadBackup(hid)`, `downloadExcel(hid)`

Escrituras offline resuelven al instante y llegan por los listeners.

## UI (`src/components/ui/index.js`)
cx, renderIcon, AmountInput, formatTyping, BigNumber, Button, Card, Chip, EmptyState, Field, IconButton, Input, Select, Textarea, PageHeader (props extra: `back` true|ruta, `settings`), ProgressBar, Row, RowGroup, Segmented, Sheet, Skeleton, StatusPill, Toast, ToastProvider, useToast (`{ show(msg|{message,variant,duration,action}), success, error, dismiss }`).
Layout: `src/components/layout/AppShell.jsx`, `MonthSkeleton.jsx`.
