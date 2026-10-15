# clear-books v4 — Tokens de diseño y primitivos

Dirección: la salida estándar de la categoría ejecutada a fondo. Vara de acabado: Monarch Money, Copilot Money, YNAB. Modo "Operate": la app desaparece dentro de la tarea; la marca vive en los detalles precisos. Ver `docs/SPEC.md` para rutas y comportamiento.

## Tipografía

- Una sola familia: **Geist Variable** (`import '@fontsource-variable/geist'` en `src/main.jsx`), fallback `system-ui, -apple-system, 'Segoe UI', sans-serif`.
- Numerales tabulares en TODO número: clase `tnum` (`font-variant-numeric: tabular-nums`). Montos siempre con `tnum`.
- Escala fija en rem (no fluida):

| Rol | Tamaño | Peso | Line-height | Tracking |
|---|---|---|---|---|
| display (la cifra "Te queda") | 3rem (48px); 2.5rem en < 360px | 600 | 1.05 | -0.02em |
| title (nombre del mes, títulos de pantalla) | 1.375rem (22px) | 600 | 1.2 | -0.01em |
| heading (título de sección/tarjeta) | 1.0625rem (17px) | 600 | 1.3 | 0 |
| body | 0.9375rem (15px) | 400/500 | 1.5 | 0 |
| small (metadatos, ayudas) | 0.8125rem (13px) | 400/500 | 1.45 | 0 |
| micro (solo pastillas de estado) | 0.75rem (12px) | 500 | 1.3 | 0 |

- Prohibido: eyebrows/kickers en mayúsculas sobre títulos, texto en gradiente, monospace como "look", serif.

## Color (variables CSS en `src/index.css`, mapeadas en `tailwind.config.js` como `rgb(var(--c-x) / <alpha-value>)`)

Estrategia: Restrained. Neutros fríos + un acento azul tinta para acciones y selección. Verde/ámbar/rojo son ESTADO, nunca decoración, y siempre acompañan a un texto (no solo color).

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | #F4F5F7 | #0F1217 | fondo de página |
| `surface` | #FFFFFF | #161A21 | tarjetas, hojas |
| `surface-2` | #F8F9FB | #1C2129 | áreas hundidas (inputs, filas seleccionadas) |
| `line` | #E5E7EB | #262C36 | líneas finas de 1px |
| `ink` | #15181E | #EEF1F5 | texto principal |
| `ink-2` | #4B5565 | #B3BAC6 | texto secundario |
| `muted` | #8B93A3 | #7C8594 | metadatos, placeholders (≥ 4.5:1 sobre surface) |
| `accent` | #2F56D9 | #6B8BFF | acción primaria, selección, enlace |
| `accent-ink` | #2446B8 | #86A0FF | hover/pressed del acento |
| `accent-soft` | #E9EEFC | #1E2A4A | fondo suave del acento |
| `on-accent` | #FFFFFF | #0F1217 | texto sobre acento |
| `good` / `good-soft` | #178A4D / #E3F5EA | #4CCB80 / #16301F | completo, positivo |
| `warn` / `warn-soft` | #B86E00 / #FFF1D6 | #F2B950 / #3A2B0E | parcial, pendiente con aviso (nunca "error") |
| `bad` / `bad-soft` | #C62828 / #FCE8E8 | #F0716F / #3B1716 | déficit real, errores |

Modo oscuro: `@media (prefers-color-scheme: dark)` sobre `:root`, más `:root[data-theme="dark"]` y `:root[data-theme="light"]` para forzar. `color-scheme: light dark` en `:root`. `body` con `background: rgb(var(--c-bg))`.

## Superficies, radios, sombras

- Radios (un solo sistema, documentado): tarjetas y hojas 16px (`rounded-2xl`); botones, inputs, filas tocables 12px (`rounded-xl`); chips y pastillas de estado `rounded-full`.
- Sombra de tarjeta (teñida, con offset y blur): claro `0 1px 2px rgb(21 24 30 / 0.04), 0 8px 24px -12px rgb(21 24 30 / 0.12)`; oscuro `0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px -12px rgb(0 0 0 / 0.5)`. Sin halos, sin sombras duras.
- Las listas dentro de una tarjeta se separan con `line` de 1px (`divide-y`), nunca tarjetas anidadas. Sin `border-left` de color.
- Espaciado base 4px. Gutter de página 16px (móvil) / 24px (escritorio). Separación entre secciones 24px. Padding de tarjeta 16px (20px en ≥ 640px). Más espacio arriba de un título que abajo.
- Contenido centrado a `max-w-3xl` en escritorio; barra lateral de 240px en ≥ 1024px; barra inferior de 64px + safe-area en móvil.

## Movimiento (reglas de Emil Kowalski)

- Solo `transform` y `opacity` (y `filter: blur` ≤ 4px para cruzar estados). Nada de `transition: all`.
- Curvas: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (entradas, feedback), `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` (movimiento en pantalla), `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (hojas).
- Duraciones: press 120ms (`:active { transform: scale(0.97) }` en todo lo presionable), hover 150ms, hoja inferior 260ms entrar / 180ms salir, toast 220ms, dropdown 180ms. Nunca > 300ms en UI.
- Entradas desde `scale(0.96) + opacity 0`, nunca desde `scale(0)`. Popovers con `transform-origin` en su disparador; modales centrados.
- La cifra protagonista cambia SIN animación (se ve cientos de veces). Nada de contadores animados, nada de secuencias de carga, nada de stagger en listas de datos.
- Un solo momento de motion autoral: el comprobante/toast al confirmar un aporte (sube con `--ease-out`, 220ms, y la cifra de "Llevamos ahorrado" se actualiza al instante).
- `@media (prefers-reduced-motion: reduce)`: quitar transforms, mantener opacidad. Hover solo bajo `@media (hover: hover) and (pointer: fine)`.

## Superficies del navegador (se tematizan, no se dejan por defecto)

- `::selection { background: rgb(var(--c-accent-soft)); color: rgb(var(--c-ink)) }`
- `accent-color: rgb(var(--c-accent))` para checkbox/radio/range nativos.
- Foco visible: `outline: 2px solid rgb(var(--c-accent)); outline-offset: 2px; border-radius: inherit` con `:focus-visible`.
- Scrollbar fina en escritorio (thumb `muted` al 50%).
- `caret-color: rgb(var(--c-accent))`.
- Enlaces: `text-underline-offset: 3px`.

## Primitivos (`src/components/ui/`, un archivo por primitivo, exportados desde `index.js`)

| Primitivo | Contrato |
|---|---|
| `Card` | `{ title?, subtitle?, action?, padded = true, children, className? }` superficie blanca, radio 16, sombra de tarjeta |
| `Button` | `{ variant: 'primary' \| 'secondary' \| 'ghost' \| 'danger', size: 'sm' \| 'md' \| 'lg', loading?, icon?, full?, ...props }` 44px de alto en md; press scale |
| `IconButton` | `{ label (aria-label obligatorio), icon, variant?, size? }` |
| `Field` | `{ label, hint?, error?, children }` etiqueta ARRIBA, error ABAJO; nunca placeholder como etiqueta |
| `Input`, `Select`, `Textarea` | estilos de `surface-2` con borde `line`, foco acento |
| `AmountInput` | `{ value, currency, onChange({ amount, currency }), allowCurrencyToggle = true, autoFocus? }` formatea es-CR al escribir, `inputmode="decimal"`, toggle ₡/$ como `Segmented` pequeño |
| `Segmented` | `{ options: [{ value, label }], value, onChange }` con indicador deslizante (transform) |
| `Sheet` | `{ open, onClose, title?, children, footer? }` hoja inferior en móvil, diálogo centrado en ≥ 640px; usa `<dialog>` nativo; cierra con Escape, backdrop y arrastre hacia abajo (umbral o velocidad) |
| `Toast` + `useToast()` | cola propia, máximo 3, pausa al ocultar la pestaña; variantes neutra/éxito/error |
| `Skeleton` | `{ className }` con la forma final (líneas y bloques), shimmer sutil |
| `EmptyState` | `{ icon, title, body, action? }` enseña cómo llenar la pantalla |
| `StatusPill` | `{ state: 'pending' \| 'partial' \| 'done' \| 'skipped' \| 'deferred' \| 'deficit' }` texto + color: Pendiente (muted), Parcial (warn), Listo (good), Este mes no (muted, tachado), Pasa al siguiente (ink-2), Faltan ₡X (bad) |
| `Row` | fila de lista tocable: `{ leading?, title, subtitle?, trailing?, onClick?, as? }` 56px mínimo, línea fina entre filas |
| `BigNumber` | `{ amount, currency = 'CRC', size: 'display' \| 'title', tone?: 'ink' \| 'good' \| 'warn' \| 'bad' }` con `tnum` |
| `ProgressBar` | `{ value, max, tone? }` solo cuando el progreso es real (reservas, fondo de emergencia); altura 6px |
| `Chip` | `{ selected?, onClick?, children }` pastilla para categorías y filtros |
| `PageHeader` | `{ title, back?, actions?, children? }` sticky, fondo `bg` con blur ligero |
| `NavBar` (móvil) y `SideNav` (escritorio) | 4 destinos: Mes, Ahorro, Historial, Herramientas (íconos lucide: CalendarDays, PiggyBank, History, Calculator) + Ajustes (Settings) en el header |

Estados obligatorios de cada primitivo interactivo: default, hover (solo puntero fino), focus-visible, active, disabled, loading cuando aplique.
