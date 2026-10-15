# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Kevin (Costa Rica), asalariado, usa la app en el teléfono y a veces en escritorio. Hoy en modo individual (un salario); el modo pareja (dos salarios, un hogar) debe estar listo para activarse después sin migrar nada. Sus hermanas usan la misma app cada una en su propio hogar (modo individual). Situación de uso: el día de pago (15 y 30, o fin de mes), al pagar un fijo, al apartar el ahorro, y una vez al mes para cerrar. Estado de ánimo: quiere una respuesta rápida ("¿cuánto me queda?", "¿cuánto llevo ahorrado?"), no una tarea contable.

## Product Purpose

Plataforma personal de ahorro y control de finanzas mes a mes. Sustituye un "machote" familiar de Excel (ingresos − fijos − ahorro = restante) y tres versiones anteriores de la misma app que no funcionaron porque eran un plan estático sin dinero real. Éxito: que Kevin vuelva cada quincena, que el "Llevamos ahorrado" coincida con lo que hay en el banco, y que al cerrar el año sepa cuánto ahorró de verdad.

## Positioning

Es el machote tico (plan del mes + "restante igual para los dos") convertido en un sistema con memoria: confirmación por quincena de lo que ya pasó en el banco (pagué, aparté, cobré, saqué), un solo libro de ahorro que cuadra con el saldo real, reserva anual para marchamo y Navidad dentro del mismo ahorro, aguinaldo y extras del período, cierre de mes sin reproches, y reparto en pareja explicado en una frase. Ninguna app genérica modela quincena + aguinaldo + marchamo + ₡/$ + reparto de pareja; las apps de sobres (YNAB, Actual) exigen integración bancaria que en Costa Rica no existe.

## Operating Context

- Entrada 100% manual: no hay open banking ni API bancaria para personas en CR. La app no mueve dinero y lo dice.
- Ciclo: el mes es la unidad de plan; la quincena es la unidad de confirmación (fijos con quincena, ahorro por quincena).
- Economía bimonetaria: ingresos, fijos, gastos y lugares de ahorro en ₡ o $; tipo de cambio BCCR (compra y venta) vía api.hacienda.go.cr, congelado al abrir el mes, editable.
- Eventos anuales: aguinaldo (≤ 20 dic), salario escolar (enero, solo algunos), marchamo (cobro desde inicios de noviembre, vence 31 dic), Navidad.
- Pagos pequeños por SINPE Móvil; gastos variables son opcionales de registrar.
- Pareja: entra con su propio Google (campo partnerEmail + regla de Firestore con get()), misma pantalla, sin privacidad por gasto ni IOUs.

## Capabilities and Constraints

- Modos: individual (1 persona) y pareja (2 personas, reparto "a los dos les queda lo mismo" por defecto, "mismo % del salario" alternativo; ahorro 50/50).
- Plan del mes materializado desde perfil + plantilla de fijos + anuales; "Te queda ₡X este mes (≈ ₡X/2 por quincena)" por persona.
- Ahorro: lugares con nombre, moneda y saldo real (cuenta ₡, cuenta $, CDP, cooperativa); aportes confirmados por quincena con monto real (parcial en ámbar); retiros con motivo; ahorro de planilla (solidarista) como línea aparte que crece sola.
- Fijos: plantilla con quincena (1ra/2da/ambas), estado pending/paid/skipped/deferred, monto ajustable al pagar, isDebt para cuotas financiadas, hint anti doble conteo de tarjeta.
- Reserva anual (marchamo, Navidad, otros apagados) como etiquetas dentro del ahorro; cuota = faltante / meses restantes incluyendo el actual; regla de primer año.
- Extras del período (aguinaldo, bono, salario escolar, gasto extra) con switch "entra al reparto".
- Cierre de mes: checklist, déficit con tres salidas (apartar menos / cubrir del ahorro / pasar al siguiente), pregunta opcional "¿cuánto te quedó en la cuenta?" que registra la diferencia como gasto sin anotar.
- Gasto variable rápido (monto + categoría; descripción y fecha opcionales; "lo pagué del ahorro").
- Historial honesto (solo meses cerrados), acumulado real, exportar Excel/JSON.
- Herramientas: calculadoras bruto→neto 2026 (CCSS 10,83% + tramos renta Decreto 45333-H), aguinaldo, meta de ahorro / "a este ritmo", fondo de emergencia, préstamo con abonos extra, convertidor ₡/$ con costo real de tarjeta, reparto de pareja "qué pasaría si", anuales prorrateados. Constantes anuales en un archivo con vigencia y fuente.
- Stack fijo: Vite + React 18 + Tailwind + Firebase (Google Sign-In, Firestore con caché offline) en el proyecto clear-books-56595, GitHub Pages, vitest. Sin backend, sin Cloud Functions, sin push. PWA instalable.
- Archivos de ~400 líneas máximo. Toda la matemática en lib/ pura con tests.
- Datos de las versiones anteriores no se migran; colecciones nuevas bajo users/{uid}/ con schemaVersion 3.
- Decididamente fuera: sobres base cero, importación bancaria, notificaciones push, módulo de deudas/tarjetas con saldo vivo, gamificación, tasa de ahorro como KPI, IOUs, saldos diarios de cuenta corriente.

## Brand Commitments

Nombre actual del producto: clear-books (URL pelozok.github.io/clear-books). Español de Costa Rica (vos), formato es-CR (₡1.234.567, dd/mm), tono "Pasa. Ajustemos." sin reproche. Íconos lucide-react (decisión previa). Sin otros activos de marca.

Preferencia de dirección visual (decidida por Kevin el 2026-10-14 en la ronda de dirección de Impeccable): la salida estándar de la categoría, ejecutada derecha y a fondo. La vara de acabado son Monarch Money, Copilot Money y YNAB: una sola cifra protagonista, tarjetas blancas sobrias con un solo acento, recurrentes separados de variables, colores de estado (verde/ámbar/rojo) sobre el mismo número, lenguaje sin culpa, animaciones suaves y tipografía grande con numerales tabulares.

## Evidence on Hand

- Machote familiar: /Users/kevinpelozo/Documents/Machote de PPTO mensual FINAL.xlsx (estructura real; sus cifras son placeholders, no usarlas en demos).
- Investigación 2026-10-14 (6 investigadores + verificación adversarial + 5 huecos): scratchpad research/brief.json, recs.md, research-summaries.md, calculadoras-cr-2026.md.
- Código reutilizable probado: src/lib/calc.js (repartoPareja), src/lib/periods.js, src/lib/exchange.js, con tests.
- No hay datos de uso ni entrevistas a las hermanas; no fabricar testimonios ni cifras de uso.

## Product Principles

1. Solo se pide lo que ya ocurrió en el banco: pagué, aparté, cobré, saqué. Nada de reconciliar.
2. Un solo ahorro, un solo libro: "Llevamos ahorrado" nunca suma metas; cuadra con el saldo real.
3. El plan se rompe por diseño: parcial es ámbar, rojo solo para déficit real y siempre con un verbo al lado.
4. Una cifra protagonista por persona, honesta sobre su frescura.
5. Todo cálculo se explica en una frase en lenguaje llano; la ecuación va en un expandible.

## Accessibility & Inclusion

Uso principal en teléfono con una mano; números grandes legibles; contraste AA; sin depender del color para el estado (ámbar/verde/rojo siempre con texto).
