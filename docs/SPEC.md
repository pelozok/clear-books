# clear-books v4 — Especificación de construcción

Fuente de verdad para construir la nueva plataforma. Si algo aquí contradice código viejo, gana esto.
Leer también `PRODUCT.md` (verdad del producto) y `docs/DESIGN-TOKENS.md` (tokens y primitivos).

## 0. Reglas de ingeniería

- Vite 6 + React 18 + Tailwind 3.4 + Firebase 12 + vitest. JavaScript (JSX), sin TypeScript.
- **Máximo ~400 líneas por archivo.** Si un módulo crece, dividirlo.
- Toda la matemática vive en `src/lib/` como funciones puras con tests. Los componentes NO calculan: llaman a la lib.
- Español de Costa Rica en la UI (vos, "Pasa. Ajustemos."), formato es-CR (₡1.234.567, 14/10/2026). Sin em-dashes (—) en textos visibles.
- Moneda: todo monto se guarda con su `currency` ('CRC' | 'USD'). La moneda de presentación es CRC. La conversión usa el TC del mes (`month.exchangeRate.venta`) salvo donde se indique.
- Fechas: strings ISO locales `YYYY-MM-DD` (nunca `toISOString()`, corre el día en CR). Mes: `YYYY-MM`.
- Nunca editar meses cerrados (`status: 'closed'`); la corrección vive en el mes actual.
- Sin backend, sin Cloud Functions, sin push. Firestore con caché offline persistente.
- Íconos: `lucide-react` únicamente, `strokeWidth` 1.75, nunca emojis como íconos.
- No usar las cifras del machote (500/300, fijos de 1) en tests ni demos. Cifras de prueba: ingresos ₡1.000.000 / ₡600.000, fijos ₡930.000, ahorro ₡50.000 por quincena por persona.

## 1. Modelo de datos (Firestore, todo bajo `users/{uid}/`)

Reglas: dueño (`request.auth.uid == uid`) o pareja (`request.auth.token.email == get(users/{uid}/config/profile).data.partnerEmail`). Ver `firestore.rules`.

### `config/profile` (doc único)
```js
{
  schemaVersion: 3,
  mode: 'solo' | 'pareja',
  frequency: 'mensual' | 'quincenal',
  people: [{ id: 'p1', name: 'Kevin', incomeCRC: 1000000, incomeUSD: 0,
             savingsPerPeriod: 50000,            // por quincena si quincenal, por mes si mensual (en CRC)
             payrollSavings: null | { label: 'Solidarista', amount: 56000, currency: 'CRC' } }],
  partnerEmail: null | 'correo@gmail.com',       // la pareja entra con su Google
  partnerOf: null | 'uidDueño',                  // en el perfil de la pareja: a qué hogar entra
  splitRule: 'igual_sobrante' | 'proporcional',
  categories: [{ id, label, icon, color, budget: null | number }],   // 'otros' siempre existe y no se borra
  exchangeRateDefault: 455,
  onboardingComplete: true,
  startedAt: '2026-10-14',
  lastOpenedBy: { 'correo@gmail.com': Timestamp },
}
```

### `savingsPlaces/{id}` — lugares de ahorro con saldo real
```js
{ name: 'Cuenta de ahorro BAC', currency: 'CRC' | 'USD', kind: 'cuenta' | 'cdp' | 'cooperativa' | 'efectivo' | 'otro',
  openingAmount: 290000, openingAsOf: '2026-10-14', order: 0, active: true }
```
Saldo del lugar = `openingAmount + Σ ledger.aporte(placeId) − Σ ledger.retiro(placeId)` en su moneda.

### `recurring/{id}` — plantilla de fijos
```js
{ name: 'Alquiler', amount: 350000, currency: 'CRC', half: 1 | 2 | 'ambas', isDebt: false,
  cuotasRestantes: null | 8, order: 0, active: true }
```
`half` se ignora en frecuencia mensual. 'ambas' = se paga en las dos quincenas (monto por quincena = amount/2).

### `annual/{id}` — reserva anual (marchamo, Navidad, …)
```js
{ name: 'Marchamo', amount: 180000, currency: 'CRC', month: 11,          // mes en que se paga (1-12)
  startsFrom: '2027-01', firstYear: 'cubierto-aparte' | 'reservar' | null, lastPaidYear: null | 2026, active: true }
```
Apartado de una reserva = `Σ ledger.aporte(reserveId) − Σ ledger.retiro(reserveId)`.

### `months/{YYYY-MM}` — un doc por mes (snapshot editable; la quincena vive adentro)
```js
{
  status: 'open' | 'closed', partial: false, startedAt: null | '2026-10-16',
  frequency: 'mensual' | 'quincenal', splitRule: 'igual_sobrante' | 'proporcional',
  exchangeRate: { venta: 454.56, compra: 449.35, date: '2026-10-14' },     // congelado al materializar; editable
  incomes: { p1: { salaryCRC: 1000000, salaryUSD: 0 } },
  extras: [{ id, type: 'ingreso' | 'gasto', label: 'Aguinaldo', amount, currency, date, personId: 'p1' | null,
             inSplit: false, reserveId: null | 'annualId', source: 'corriente' | 'ahorro', ledgerId: null | 'id' }],
  savings: { perPerson: { p1: { q1: { planned: 50000, actual: null | 30000, at: null | '2026-10-15', note: null, ledgerId: null },
                                q2: { … } } } },                             // mensual: solo q1
  fixedItems: [{ id, templateId: null | 'id', fromMonth: null | '2026-09', name, amount, currency, half: 1 | 2 | 'ambas',
                 status: 'pending' | 'paid' | 'skipped' | 'deferred', paidAt: null, paidAmount: null, deferredTo: null, isDebt: false }],
  annualReserve: { quota: 28864, breakdown: [{ annualId, name, quota }], done: false, ledgerId: null, paysThisMonth: ['annualId'] },
  carryover: { in: 0, out: 0 },                                            // faltante arrastrado del mes anterior / al siguiente
  closing: null | { closedAt, leftoverPlanned, leftoverReported: null | number, unlogged: null | number,
                    deficitResolution: null | 'less_savings' | 'cover' | 'carry', destination: 'libre' | 'ahorro', seenBy: ['correo'] },
  createdAt, updatedAt,
}
```

### `savingsLedger/{id}` — el ÚNICO libro de ahorro
```js
{ date: '2026-10-15', monthKey: '2026-10', half: 1 | 2 | null, personId: 'p1' | null, placeId: 'id',
  type: 'aporte' | 'retiro', amount: 50000, currency: 'CRC', label: 'Ahorro 1ra quincena',
  kind: 'planned' | 'extra' | 'cover' | 'expense' | 'reserve' | 'reserve_pay' | 'opening_adjust',
  reserveId: null, expenseId: null, createdBy: 'correo', createdAt }
```
"Llevamos ahorrado" = Σ saldos de lugares (convertidos a CRC con el TC de hoy). Nunca suma metas.

### `entries/{id}` — gastos variables (opcionales)
```js
{ monthKey: '2026-10', date: '2026-10-14', amount: 12500, currency: 'CRC', amountCRC: 12500,
  categoryId: 'otros', description: '', source: null | 'savings', ledgerId: null, createdBy: 'correo', createdAt }
```

Datos de versiones anteriores (`periods/`, `expenses/`, `fixedTemplate/`, `data/`) no se leen ni se migran.

## 2. Lib pura (`src/lib/`) — contratos

Cada módulo exporta funciones puras, sin Firebase, sin `Date.now()` implícito (recibir `today` como parámetro cuando importe). Cada uno con su `*.test.js`.

| Módulo | Funciones |
|---|---|
| `periods.js` (reusar y extender) | `todayISO()`, `monthKey(iso)`, `shiftMonth(mKey, delta)`, `monthLabel(mKey)` ("Octubre 2026"), `halfOf(iso)` → 1\|2, `lastDayOfMonth(mKey)`, `monthsBetween(a, b)`, `halfLabel(half)` ("1ra quincena"), `halvesFor(frequency)` → [1,2] \| [1] |
| `format.js` (reusar y extender) | `fmt(n)` → "₡1.234.567", `fmtUSD(n)`, `fmtAmount(amount, currency)`, `toCRC(amount, currency, rate)`, `fmtDate(iso)` → "14 oct", `fmtRelative(ts, today)` → "hoy" / "hace 3 días", `fmtSigned(n)` |
| `exchange.js` (modificar) | `fetchExchangeRate()` → `{ venta, compra, date }` (Hacienda, fallback open.er-api con compra=venta), `DEFAULT_RATE` |
| `materialize.js` | `materializeMonth({ monthKey, profile, recurring, annual, ledger, rate, today, previousMonth, partial, startedAt })` → doc de mes listo para guardar (fijos por quincena, deferred del mes anterior con `fromMonth`, `carryover.in` desde `previousMonth.closing` si fue 'carry', `annualReserve` vía reserve.js, extras vacíos) |
| `reserve.js` | `monthsUntilInclusive(fromMonthKey, targetMonth)` (si ya pasó, salta al próximo año), `annualQuota(annualItem, monthKey, reservedSoFar)` → ₡ (0 antes de `startsFrom`; nunca Infinity/NaN), `reserveBreakdown(annualItems, monthKey, ledger)` → `{ quota, breakdown, paysThisMonth }`, `firstYearSuggestion(annualItem, monthKey, baseSavings)` → 'cubierto-aparte' \| 'reservar' |
| `savings.js` | `placeBalance(place, ledger)`, `savingsTotals({ places, ledger, annual, rate })` → `{ byPlace: [{ place, balance }], totalCRC, reservedCRC, reservedByAnnual: [{ annualId, name, amount }], freeCRC }`, `monthSavingsSummary(month)` → `{ planned, actual, pending, rows: [{ personId, half, planned, actual, state: 'pending'\|'partial'\|'done' }] }`, `monthsCovered(totalCRC, avgFixedCRC)`, `payrollSavingsCRC(profile, closedMonthsCount, rate)` |
| `plan.js` | `monthTotals(month, rate)` → `{ incomeByPerson, extrasIn, extrasOut, fixedPlanned, fixedPaid, fixedPending, fixedSkipped, variable, fromSavings, savingsPlanned, savingsActual, reserveQuota, carryIn }` (todo en CRC; variables con `source:'savings'` van a `fromSavings`, no a `variable`); `teQueda({ month, profile, entries, rate, today })` → `{ perPerson: [{ personId, libre, porQuincena, aporte, ahorro, share }], total, deficit, isPartial, since }` |
| `split.js` | `repartoPareja({ income1, income2, gastos, ahorro })` (contrato actual, intacto), `repartoProporcional({ income1, income2, gastos, ahorro })` → misma forma, `splitByRule(rule, args)`, `explainSplit({ rule, people, result })` → `{ sentence, equation }` en español |
| `close.js` | `closeChecklist(month)` → `{ pendingFixed: [...], untouchedSavings: [...], deficit: number, ready: bool }`, `resolveDeficit(month, choice, amount)` → cambios, `applyClose({ month, decisions, today })` → `{ month: cerrado, ledgerEntries: [...], nextCarryIn }` |
| `cards.js` | `looksLikeCard(name)` (tarjeta\|visa\|mastercard\|bac\|credomatic\|amex), `detectCardDoubleCount(fixedItems, entriesCount)` → `{ warn: bool, item }` |
| `constantsCR.js` | `CCSS_2026 = { sem: 0.055, ivm: 0.0433, bp: 0.01, total: 0.1083, vigenteDesde: '2026-01-01', fuente }`, `RENTA_2026 = { tramos: [...], creditoHijo: 1710, creditoConyuge: 2590, vigenteDesde: '2026-01-01', fuente }`, `TASAS_REFERENCIA` (CDP CRC 4%, USD 3%, vivienda 8%/7.25%, vehículo 9.5%/8%, personal 16%, tarjeta 36.12%/30%, TBP), `RETENCION_INTERESES = 0.15` |
| `calculators/netSalary.js` | `netSalary({ gross, frequency, children, spouse, otherDeductions })` → `{ ccss, renta, neto, breakdown }` (mensual; quincenal calcula mensual y divide /2) |
| `calculators/aguinaldo.js` | `aguinaldo({ salaries: [12 montos] })` y `aguinaldoEstimate({ monthlyGross, monthsWorked })` |
| `calculators/savingsGoal.js` | `contributionFor({ goal, initial, periods, annualRate, perYear, netOfTax })`, `periodsToReach({ goal, initial, contribution, annualRate, perYear })`, `projection({ initial, contribution, annualRate, perYear, years })` → tabla |
| `calculators/loan.js` | `payment({ principal, annualRate, months })`, `schedule({ principal, annualRate, months, extraMonthly, extraOnce, mode: 'plazo'\|'cuota' })` → `{ rows, totalInterest, monthsSaved, interestSaved }` |
| `calculators/emergencyFund.js` | `emergencyFund({ monthlyExpenses, months, current })` → `{ target, covered, missing }` |
| `calculators/fx.js` | `convert({ amount, from, to, venta, compra })`, `cardCost({ usd, venta, spread, feePct })` → `{ costCRC, vsBCCR, pct }` |
| `calculators/creditCard.js` | `payoff({ balance, annualRate, minPct, fixedPayment })` → `{ minimum: { months, totalPaid, interest }, fixed: {...}, neverEnds }` |
| `calculators/prorate.js` | `monthlyShare({ amount, dueMonth, fromMonth })` |

Test de aceptación obligatorio: `src/lib/primerDiciembre.test.js` recorre 2026-10 → 2027-01 (arranque parcial, marchamo 'cubierto-aparte', aguinaldo en dic, Navidad, retiro) y verifica: sin Infinity/NaN, cuota 0 hasta enero, "Llevamos ahorrado" = banco simulado (₡290.000 → ₡400.000 → ₡450.000), "Terminamos con" de diciembre cuadra.

## 3. Capa de datos (`src/data/`)

- `db.js`: refs (`profileRef(uid)`, `placesCol`, `recurringCol`, `annualCol`, `monthRef(uid, key)`, `monthsCol`, `ledgerCol`, `entriesCol`, queries por `monthKey`) y `initializeFirestore` con `persistentLocalCache({ tabManager: persistentMultipleTabManager() })` en `firebaseConfig.js`.
- `HouseholdContext.jsx`: resuelve el `uid` del hogar: si `profile.partnerOf` existe, el hogar es ese uid; si no, el propio. Expone `{ hid, me: { email, uid }, profile, loading }`. Escribe `lastOpenedBy[email]` una vez por sesión.
- Hooks (onSnapshot + escrituras): `useProfile(hid)`, `useSavingsPlaces(hid)`, `useRecurring(hid)`, `useAnnual(hid)`, `useMonth(hid, key)` (materializa si no existe, usando `materializeMonth`), `useLedger(hid)`, `useEntries(hid, monthKey)`, `useMonthsIndex(hid)` (solo `status`, `closing`, totales guardados). Cada hook devuelve `{ data, loading, error, ...acciones }`.
- Acciones de alto nivel (`src/data/actions/*.js`): `confirmSavings`, `recordWithdrawal`, `markFixed`, `addEntry`, `addExtra`, `closeMonth`, `payAnnual`. Cada acción escribe en batch (mes + ledger) y es idempotente por `ledgerId`.

## 4. Rutas (HashRouter) y navegación

| Ruta | Pantalla |
|---|---|
| `/` | redirige al mes actual `/mes/YYYY-MM` |
| `/mes/:key` | **Plan del mes**: "Te queda", ahorro de la quincena, fijos por quincena, extras, reserva, gastos |
| `/gasto/nuevo?mes=` | Anotar gasto (pantalla completa en móvil) |
| `/ahorro` | Lugares de ahorro, "Llevamos ahorrado", reservas, libro de movimientos, retiro |
| `/cerrar/:key` | Cierre del mes (checklist, déficit, resultado) |
| `/historial` | Meses cerrados, acumulado real, exportar |
| `/herramientas` y `/herramientas/:tool` | Calculadoras |
| `/ajustes` (+ `/ajustes/perfil`, `/fijos`, `/anuales`, `/categorias`, `/pareja`, `/datos`) | Ajustes |
| `/onboarding` | Wizard (modo → frecuencia → personas → ahorro → fijos → lugares de ahorro → qué ya pasó este mes) |

Barra inferior fija en móvil (4): Mes, Ahorro, Historial, Herramientas. Ajustes en el header (ícono). En escritorio (≥ 1024px): barra lateral izquierda con las mismas entradas y contenido centrado a `max-w-3xl`.

## 5. Pantallas (comportamiento)

**Plan del mes.** Header: nombre del mes con ‹ › (no permite ir a más de +1 mes futuro), chip "TC ₡454,56" tocable. Tarjeta protagonista por persona: "Te queda ₡X este mes", "≈ ₡Y por quincena", "actualizado hoy"; en pareja dos tarjetas y la frase del reparto. Si `partial`: "desde el 16 de octubre". Secciones: Ahorro (fila por persona y quincena con botón "Apartar ₡50.000" o estado), Fijos (agrupados 1ra / 2da quincena, estado, total "pagado / falta"), Extras (lista + "Agregar extra"), Reserva anual (una línea con desglose), Gastos del mes (lista por fecha, total, barras por categoría solo si hay presupuesto). Banner "Cerrá septiembre (2 min)" si el mes anterior sigue abierto. Botón flotante "+" para gasto.

**Apartar ahorro.** Hoja inferior (bottom sheet): monto prellenado, "Confirmar", "Otro monto…", lugar de ahorro (último usado), nota opcional. Al confirmar: toast "Apartaste ₡50.000 · Llevás ₡340.000".

**Fijo.** Tocar un fijo abre hoja: "Pagado" (monto editable, fecha), "Este mes no" (skipped), "Pasa al mes siguiente" (deferred), "Pendiente". Hint de tarjeta si `looksLikeCard`.

**Cierre.** Pasos: fijos sin marcar → quincenas de ahorro sin tocar (quedan en 0, sin castigo) → déficit (tres salidas) → "¿cuánto te quedó en la cuenta?" (opcional) → resumen "Terminaron con ₡X" → "Cerrar". En pareja, check "los dos lo vimos".

**Ahorro.** "Llevamos ahorrado ₡X" grande, "N meses de fijos cubiertos" con el siguiente hito, lista de lugares con saldo en su moneda y en ₡, reservas (apartado / meta), "incluyendo planilla ₡Y", libro de movimientos (últimos 20, filtro), botones "Aporte extra" y "Retiro".

**Historial.** Oculto hasta 2 meses cerrados (estado vacío que lo explica). Lista por mes: terminaron con, apartaron X de Y, sacaron Z (motivo), resultado. Curva del acumulado (SVG inline). Exportar Excel/JSON.

**Herramientas.** Grid de calculadoras con descripción de una línea; cada una es una pantalla con inputs arriba y resultado grande abajo, actualización en vivo, "constantes vigentes 2026 (fuente)" en un expandible, "Usar en mi plan" donde aplique (bruto→neto rellena ingreso; meta de ahorro usa el acumulado real).

**Onboarding.** ≤ 5 minutos. Pasos: 1 modo, 2 frecuencia, 3 personas e ingresos (con "¿no sabés tu neto? calculalo"), 4 ahorro por período (prellenado ₡50.000) + ahorro de planilla opcional, 5 fijos (9 sugerencias del machote con un toque, quincena por fijo), 6 lugares de ahorro (1-3 líneas con saldo), 7 "qué ya pasó este mes" (quincenal: "Empezamos limpio en la 2da quincena" por defecto; mensual: marcar fijos ya pagados y "¿ya apartaste el ahorro?"). Al terminar, materializa el mes y va a `/mes/:key`.

**Ajustes.** Perfil (modo, frecuencia, personas, regla de reparto), Fijos (plantilla; "aplicar al mes en curso"), Anuales, Categorías, Pareja (correo), Lugares de ahorro, Datos (exportar, TC, cerrar sesión).

## 6. Estados obligatorios

Cada pantalla: cargando (skeleton con la forma final, no spinner), vacío (explica cómo llenarlo), error (texto del problema + reintentar), offline (chip "sin conexión, se sincroniza al volver"). Cada control: hover (solo `@media (hover:hover)`), focus visible, active (`scale(0.97)`), disabled.

## 7. PWA

`vite-plugin-pwa` con manifest (nombre "clear-books", `start_url: /clear-books/`, `display: standalone`, íconos 192/512 generados, shortcut "Anotar gasto" → `/#/gasto/nuevo`), service worker con `registerType: 'autoUpdate'`. Firestore offline persistente.
