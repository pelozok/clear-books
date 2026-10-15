// Bruto → neto para asalariados en Costa Rica (2026).
// Reglas: CCSS (cuota obrera) y renta se calculan ambas sobre el BRUTO mensual;
// la renta NO se calcula sobre bruto − CCSS. Los créditos por hijo y cónyuge se
// restan del impuesto y nunca lo dejan negativo. Todo se redondea a colón entero.
import { CCSS_2026, RENTA_2026 } from "../constantsCR.js";

// Solo números o strings numéricos; booleanos, arrays, null, NaN e Infinity → 0.
const num = (v) => ((typeof v === "number" || typeof v === "string") && Number.isFinite(Number(v)) ? Number(v) : 0);
// "false" (string de un formulario o de Firestore) NO es cónyuge.
const yes = (v) => v === true || v === "true" || v === 1 || v === "1";

// Reparte `total` (ya redondeado) entre partes proporcionales con el método del
// mayor residuo, para que el desglose sume exactamente el total.
const apportion = (total, raws) => {
  const floors = raws.map(Math.floor);
  let left = total - floors.reduce((a, b) => a + b, 0);
  const order = raws.map((r, i) => [r - floors[i], i]).sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) {
    if (left <= 0) break;
    floors[i] += 1;
    left -= 1;
  }
  return floors;
};
const pct = (r) => `${(r * 100).toFixed(2).replace(".", ",")}%`;

// Impuesto mensual bruto (antes de créditos) aplicando los tramos progresivos.
export const rentaMensual = (grossMonthly, tramos = RENTA_2026.tramos) => {
  const bruto = Math.max(0, num(grossMonthly));
  let tax = 0;
  let piso = 0;
  for (const { hasta, tasa } of tramos) {
    const techo = hasta == null ? Infinity : hasta;
    if (bruto <= piso) break;
    tax += (Math.min(bruto, techo) - piso) * tasa;
    piso = techo;
  }
  return tax;
};

export const netSalary = ({
  gross,
  frequency = "mensual",
  children = 0,
  spouse = false,
  otherDeductions = 0,
} = {}) => {
  const quincenal = frequency === "quincenal";
  const brutoPeriodo = Math.max(0, num(gross));
  // En quincenal el impuesto es mensual: se calcula con gross×2 y se divide entre 2.
  const brutoMensual = quincenal ? brutoPeriodo * 2 : brutoPeriodo;
  const divisor = quincenal ? 2 : 1;

  const ccssM = brutoMensual * CCSS_2026.total;
  const rentaBrutaM = rentaMensual(brutoMensual);
  const creditosDisp = Math.max(0, Math.floor(num(children))) * RENTA_2026.creditoHijo + (yes(spouse) ? RENTA_2026.creditoConyuge : 0);
  const creditosM = Math.min(rentaBrutaM, creditosDisp);
  const rentaM = rentaBrutaM - creditosM;

  const ccss = Math.round(ccssM / divisor);
  const rentaBruta = Math.round(rentaBrutaM / divisor);
  const creditos = Math.round(creditosM / divisor);
  const renta = Math.round(rentaM / divisor);
  // otherDeductions viene en la misma frecuencia que gross (ej: solidarista por quincena).
  const otras = Math.round(Math.max(0, num(otherDeductions)));
  const restante = brutoPeriodo - ccss - renta - otras;
  const neto = Math.max(0, restante);
  // Si las deducciones no caben en el salario, el neto queda en 0 y el faltante
  // se informa aparte (no se esconde).
  const deficit = Math.max(0, -restante);

  // El desglose de CCSS suma exactamente `ccss` (cada parte redondeada por
  // separado no siempre suma el total redondeado).
  const [sem, ivm, bp] = apportion(
    ccss,
    [CCSS_2026.sem, CCSS_2026.ivm, CCSS_2026.bp].map((t) => (brutoMensual * t) / divisor),
  );
  const breakdown = [
    { label: `SEM ${pct(CCSS_2026.sem)}`, amount: sem },
    { label: `IVM ${pct(CCSS_2026.ivm)}`, amount: ivm },
    { label: `Banco Popular ${pct(CCSS_2026.bp)}`, amount: bp },
    { label: "Impuesto al salario", amount: renta },
  ];
  if (otras > 0) breakdown.push({ label: "Otras deducciones", amount: otras });

  return { gross: brutoPeriodo, ccss, renta, rentaBruta, creditos, neto, deficit, breakdown };
};
