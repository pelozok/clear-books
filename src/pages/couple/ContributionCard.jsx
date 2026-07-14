import { Card } from "../../components/ui.jsx";
import { fmt } from "../../lib/format.js";
import { repartoPareja } from "../../lib/calc.js";

// El corazón del modo pareja: cuánto aporta cada persona a los gastos del
// hogar según su salario, de modo que a ambos les quede lo mismo al final.
export default function ContributionCard({ people, incomes, gastos, ahorro, rate, frequency }) {
  const [p1, p2] = people;
  const incomeOf = (p) => {
    const inc = incomes?.[p.id] || {};
    return (Number(inc.crc) || 0) + (Number(inc.usd) || 0) * rate;
  };
  const income1 = incomeOf(p1);
  const income2 = incomeOf(p2);
  const r = repartoPareja({ income1, income2, gastos, ahorro });
  const periodo = frequency === "quincenal" ? "quincena" : "mes";

  const Person = ({ person, income, aporte }) => (
    <div className="flex-1 bg-bg2 rounded-xl p-3.5">
      <p className="text-sm font-bold text-ink mb-2">{person.name}</p>
      <dl className="space-y-1 text-xs">
        <div className="flex justify-between">
          <dt className="text-ink2">Salario</dt>
          <dd className="font-mono font-semibold text-ink">{fmt(income)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink2">Aporta a gastos</dt>
          <dd className="font-mono font-semibold text-ink">{fmt(aporte)}</dd>
        </div>
        {ahorro > 0 && (
          <div className="flex justify-between">
            <dt className="text-ink2">Ahorra</dt>
            <dd className="font-mono font-semibold text-ink">{fmt(r.ahorroCada)}</dd>
          </div>
        )}
      </dl>
    </div>
  );

  return (
    <Card
      title="Reparto proporcional"
      subtitle={`Cada uno aporta según su salario; a ambos les queda lo mismo por ${periodo}.`}
    >
      <div className="flex gap-3 mb-4">
        <Person person={p1} income={income1} aporte={r.aporte1} />
        <Person person={p2} income={income2} aporte={r.aporte2} />
      </div>

      <div className={`rounded-xl px-4 py-3 text-center ${r.deficit ? "bg-red-50" : "bg-green-50"}`}>
        <p className="text-xs font-semibold text-ink2 mb-0.5">
          {r.deficit ? "A cada uno le falta" : "A cada uno le queda"}
        </p>
        <p className={`text-2xl font-extrabold font-mono ${r.deficit ? "text-bad" : "text-good"}`}>
          {fmt(Math.abs(r.restante))}
        </p>
      </div>

      {r.desbalance && (
        <p className="text-xs text-warn mt-3 leading-relaxed">
          ⚠️ Un salario no alcanza para cubrir su parte del ahorro; el otro cubre todos los
          gastos del hogar. Revisá los montos o bajá la meta de ahorro.
        </p>
      )}
    </Card>
  );
}
