---
version: 1
slug: "src-pages-monthpage-jsx"
primary_target: "src/pages/MonthPage.jsx"
related_targets: ["src/App.jsx"]
---

# Plan del mes (/mes/:key) — surface brief

Scope: la pantalla principal de la app (Operate). Audiencia: Kevin en el teléfono el día de pago o al pagar un fijo. Tarea: ver cuánto le queda, confirmar ahorro y fijos, anotar un gasto. Prueba: los números cuadran con el banco; estados parciales en ámbar; nunca reproche.

## Direction contract

THESIS: una sola cifra viva ("Te queda ₡X este mes") sobre la que todo lo demás son confirmaciones de lo que ya pasó en el banco. Rechaza el tablero de métricas múltiples con anillos y gráficos que compiten; rechaza el machote estático sin dinero real.

OWN-WORLD: la salida estándar de la categoría ejecutada a fondo (vara: Monarch, Copilot, YNAB). Fondo gris frío casi blanco, tarjetas blancas con sombra suave teñida, una línea fina para separar listas, un solo acento azul tinta para acciones y selección, verde/ámbar/rojo solo como estado sobre el mismo número. Una familia tipográfica (Geist) con numerales tabulares; display 3rem para la cifra. Radio 16px tarjetas, 12px controles, chips pastilla. Modo claro y oscuro desde los tokens.

STORY: Kevin entiende en un segundo cuánto tiene libre, confía porque la cifra dice "actualizado hoy" y los parciales se muestran en ámbar sin regaño; confirma con un toque y ve el ahorro crecer.

FIRST VIEWPORT (390px): header con mes y flechas; tarjeta "Te queda ₡487.500 este mes" en display, debajo "≈ ₡243.750 por quincena · actualizado hoy"; inmediatamente la fila de Ahorro de la quincena con el botón primario "Apartar ₡50.000"; después los fijos de la quincena en curso. Botón flotante "+" abajo a la derecha para anotar gasto; barra inferior de 4 destinos.

FORM: salida estándar de la categoría (canon), elegida por el usuario sobre la tirada; candidato asignado era el 5 de 7 (pantalla de cajero y comprobante SINPE); seed cd8e9915.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
