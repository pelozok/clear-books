# Finanzas personales

App local de finanzas personales construida con Vite + React + Tailwind CSS v3.

## Instalación y uso

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Build de producción

```bash
npm run build
```

Los archivos estáticos quedan en la carpeta `dist/`. Podés servirla con `npm run preview` o subirla a cualquier hosting estático.

## Dónde viven los datos

Los datos se guardan en el **localStorage del navegador** bajo estas claves:

| Clave | Contenido |
|---|---|
| `finance:config` | Configuración: ingreso, moneda, meta de ahorro |
| `finance:expenses` | Array de gastos registrados |

No hay servidor ni base de datos. Los datos nunca salen de tu computadora.

## Cómo respaldar tus datos

1. Abrí el ícono de **Ajustes** (engranaje) en la esquina superior derecha.
2. Presioná **Exportar mis datos (JSON)**.
3. Guardá el archivo descargado en iCloud Drive, Google Drive o donde prefieras.

Para restaurar un respaldo: Ajustes → **Importar datos (JSON)** → seleccioná el archivo exportado.

> **Importante:** si limpiás los datos del navegador (caché, cookies, historial) o usás modo incógnito, los datos se pierden. Exportá periódicamente para no perder tu historial.
