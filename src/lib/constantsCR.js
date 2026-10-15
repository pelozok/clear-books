// Constantes de Costa Rica usadas por las calculadoras. Cada bloque trae su
// vigencia y fuente para mostrarlas en la UI ("constantes vigentes 2026").
// Valores VERIFICADOS al 2026-10-14. Al cambiar el año fiscal, actualizar aquí.

// Cuota obrera CCSS (lo que se le descuenta al trabajador sobre el bruto).
export const CCSS_2026 = {
  sem: 0.055, // Seguro de Enfermedad y Maternidad
  ivm: 0.0433, // Invalidez, Vejez y Muerte
  bp: 0.01, // Aporte al Banco Popular
  total: 0.1083,
  vigenteDesde: "2026-01-01",
  fuente: "https://blog.alegra.com/costa-rica/cargas-sociales-ccss-2026-patronos-costa-rica/",
};

// Impuesto al salario 2026 (Decreto 45333-H). Tramos MENSUALES sobre el bruto.
// `hasta: null` = sin tope (último tramo). Los créditos se restan del impuesto.
export const RENTA_2026 = {
  tramos: [
    { hasta: 918000, tasa: 0 },
    { hasta: 1347000, tasa: 0.1 },
    { hasta: 2364000, tasa: 0.15 },
    { hasta: 4727000, tasa: 0.2 },
    { hasta: null, tasa: 0.25 },
  ],
  creditoHijo: 1710, // mensual, por cada hijo
  creditoConyuge: 2590, // mensual
  vigenteDesde: "2026-01-01",
  fuente:
    "https://www.ey.com/es_ce/technical/tax/tax-alerts/costa-rica-ministerio-de-hacienda-establecio-los-tramos-del-impuesto-sobre-la-renta-para-el-periodo-fiscal-2026",
};

// Retención única sobre intereses de CDP, cuentas y fondos (art. 23 Ley 7092).
export const RETENCION_INTERESES = 0.15;

// Tasas anuales de referencia para calculadoras (no son ofertas de ningún banco).
export const TASAS_REFERENCIA = {
  cdpCRC: 0.04,
  cdpUSD: 0.03, // dato 2025
  viviendaCRC: 0.08,
  viviendaUSD: 0.0725,
  vehiculoCRC: 0.095,
  vehiculoUSD: 0.08,
  personalCRC: 0.16,
  tarjetaCRC: 0.3612,
  tarjetaUSD: 0.3,
  topeUsuraCRC: 0.3648, // tope de usura (Ley 9859), semestre vigente
  topeUsuraUSD: 0.3011,
  tbp: 0.0357, // Tasa Básica Pasiva BCCR al 13-oct-2026
  inflacionLargoPlazo: 0.03,
  actualizadoAl: "2026-10-13",
  fuente: "BCCR y promedios de mercado; CDP USD es dato 2025",
};

// Etiquetas en español para mostrar en la UI.
export const TASAS_LABELS = {
  cdpCRC: "CDP en colones",
  cdpUSD: "CDP en dólares",
  viviendaCRC: "Préstamo de vivienda en colones",
  viviendaUSD: "Préstamo de vivienda en dólares",
  vehiculoCRC: "Préstamo de vehículo en colones",
  vehiculoUSD: "Préstamo de vehículo en dólares",
  personalCRC: "Préstamo personal en colones",
  tarjetaCRC: "Tarjeta de crédito en colones",
  tarjetaUSD: "Tarjeta de crédito en dólares",
  topeUsuraCRC: "Tope de usura en colones",
  topeUsuraUSD: "Tope de usura en dólares",
  tbp: "Tasa básica pasiva",
  inflacionLargoPlazo: "Inflación de largo plazo",
};
