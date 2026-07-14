# clear-books — Presupuesto del hogar

App web para llevar el presupuesto mensual o quincenal, inspirada en el "machote" familiar de Excel:
**ingresos → gastos fijos → gastos variables → sobrante → "Terminamos el período con"**.

**Producción:** https://pelozok.github.io/clear-books/

## Qué hace

- **Dos modos con páginas separadas**
  - **Individual**: un salario, tu presupuesto personal.
  - **Pareja**: dos salarios y **reparto proporcional** — la app calcula cuánto aporta cada
    persona a los gastos del hogar según su salario, de modo que después de gastos y ahorro
    (50/50) a ambos les quede exactamente lo mismo.
- **Frecuencia mensual o quincenal**: todo (períodos, presupuestos, aportes) se ve según cómo
  recibís el salario. Quincena 1 = día 1–15, quincena 2 = día 16 a fin de mes.
- **Gastos fijos como plantilla**: se definen una vez y aparecen en cada período nuevo con su
  checkbox de "pagado" (se marcan en verde, como en el Excel). El monto se puede editar en un
  período sin afectar los demás.
- **Gastos variables** por período, con categoría y fecha.
- **Categorías personalizables** con ícono, color y presupuesto por período (barras de progreso).
- **Soporte ₡ / $** con el tipo de cambio oficial del BCCR (venta), actualizado automáticamente
  cada día vía la API pública del Ministerio de Hacienda. El período en curso usa el valor del
  día; los pasados conservan el valor con el que se vivieron.
- **Historial**: con cuánto terminó cada período y el ahorro acumulado.
- **Exportar a Excel**: resumen por período, gastos fijos y variables en un `.xlsx`.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Vite + React 18 + Tailwind CSS v3 |
| Íconos | lucide-react (flat, monocromo) |
| Base de datos | Firebase Firestore (documentos reales por período y por gasto) |
| Auth | Google Sign-In (Firebase Authentication) |
| Hosting | GitHub Pages (rama `gh-pages`) |
| Tests | Vitest (lógica de cálculo y períodos) |

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # tests de la lógica (reparto, períodos)
```

Necesitás un archivo `.env.local` con las credenciales de Firebase (ver `.env.example`).
Sin él, la app no carga.

## Deploy

```bash
npm run deploy   # build + publica en GitHub Pages
```

## Modelo de datos (Firestore, bajo `users/{uid}/`)

| Ruta | Contenido |
|---|---|
| `config/profile` | Modo, frecuencia, personas y salarios, meta de ahorro, categorías, tipo de cambio |
| `fixedTemplate/{id}` | Plantilla de gastos fijos (nombre, monto, moneda) |
| `periods/{key}` | Un documento por período (`2026-07` o `2026-07-Q1`): snapshot editable de fijos, ingresos y ahorro |
| `expenses/{id}` | Un documento por gasto variable, consultable por período |

Cada usuario solo puede leer y escribir sus propios datos (reglas de Firestore por `uid`,
con lista de correos autorizados).

## La matemática del reparto (modo pareja)

Con ingresos `I1`, `I2`, gastos del hogar `G` y ahorro `S` (dividido 50/50):

```
restante  = (I1 + I2 − G − S) / 2     ← igual para ambos
aporte_i  = I_i − S/2 − restante      ← invariante: aporte1 + aporte2 = G
```

La lógica vive en `src/lib/calc.js` y está cubierta por tests (`npm test`).
