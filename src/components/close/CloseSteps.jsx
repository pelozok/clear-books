import { Check } from 'lucide-react'
import { AmountInput, BigNumber, Field, Row, RowGroup, Segmented, Select, cx } from '../ui/index.js'
import { fmt, fmtAmount } from '../../lib/format.js'
import { halfLabel } from '../../lib/periods.js'
import { activePlaces, personName } from '../month/shared.js'

const FIXED_OPTIONS = [
  { value: 'paid', label: 'Pagado' },
  { value: 'skipped', label: 'No se pagó' },
  { value: 'deferred', label: 'Pasa' },
]

export function StepTitle({ title, body }) {
  return (
    <div className="mb-4">
      <h2 className="text-title text-ink">{title}</h2>
      {body && <p className="mt-1.5 text-body text-ink-2">{body}</p>}
    </div>
  )
}

export function PlaceSelect({ places, value, onChange, label = 'Lugar de ahorro' }) {
  const list = activePlaces(places)
  return (
    <Field label={label} hint={list.length ? undefined : 'Agregá un lugar de ahorro en Ajustes.'}>
      <Select value={value} onChange={(e) => onChange(e.target.value)} disabled={!list.length}>
        {list.length === 0 && <option value="">Sin lugar</option>}
        {list.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
    </Field>
  )
}

/** Paso 1: fijos que quedaron sin marcar. */
export function FixedStep({ items, decisions, onChange }) {
  return (
    <>
      <StepTitle title="Fijos sin marcar" body="Contanos qué pasó con cada uno. Lo que no se pagó puede pasar al mes siguiente." />
      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <div key={it.id} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-body font-medium text-ink">{it.name}</span>
              <span className="tnum text-body text-ink-2">{fmtAmount(it.amount, it.currency)}</span>
            </div>
            <Segmented
              aria-label={`Qué pasó con ${it.name}`}
              options={FIXED_OPTIONS}
              value={decisions[it.id] || 'deferred'}
              onChange={(v) => onChange({ ...decisions, [it.id]: v })}
            />
          </div>
        ))}
      </div>
    </>
  )
}

/** Paso 2: quincenas de ahorro que nadie tocó (quedan en 0, sin castigo). */
export function SavingsStep({ rows, profile, frequency }) {
  return (
    <>
      <StepTitle
        title="Ahorro sin confirmar"
        body="Estas quedan en ₡0. Pasa, no hay castigo. Si sí apartaste, volvé al mes y confirmalo antes de cerrar."
      />
      <RowGroup className="-mx-4 sm:-mx-5">
        {rows.map((r) => (
          <Row
            key={`${r.personId}-${r.half}`}
            title={frequency === 'quincenal' ? halfLabel(r.half) : 'Ahorro del mes'}
            subtitle={personName(profile, r.personId)}
          />
        ))}
      </RowGroup>
    </>
  )
}

const DEFICIT_OPTIONS = [
  { value: 'less_savings', title: 'Apartar menos este mes', body: 'Se baja lo que apartaron este mes para cubrirlo.' },
  { value: 'cover', title: 'Cubrirlo con el ahorro', body: 'Sale de un lugar de ahorro y el mes queda en cero.' },
  { value: 'carry', title: 'Pasarlo al mes siguiente', body: 'Se descuenta de lo que les queda el próximo mes.' },
]

/** Paso 3: déficit con tres salidas. */
export function DeficitStep({ deficit, choice, onChoice, lessCovers, places, placeId, onPlace }) {
  return (
    <>
      <StepTitle title="Faltó plata este mes" body="Pasa. Ajustemos. Elegí cómo cubrirlo:" />
      <BigNumber amount={deficit} tone="bad" size="title" className="mb-4" />
      <div role="radiogroup" aria-label="Cómo cubrir el faltante" className="-mx-4 divide-y divide-line sm:-mx-5">
        {DEFICIT_OPTIONS.map((o) => {
          const disabled = o.value === 'less_savings' && lessCovers <= 0
          const selected = choice === o.value
          const body =
            o.value === 'less_savings' && !disabled && lessCovers < deficit
              ? `El ahorro del mes cubre ${fmt(lessCovers)} de ${fmt(deficit)}.`
              : disabled
                ? 'Este mes no apartaron nada que se pueda bajar.'
                : o.body
          return (
            <Row
              key={o.value}
              role="radio"
              aria-checked={selected}
              aria-disabled={disabled || undefined}
              onClick={disabled ? undefined : () => onChoice(o.value)}
              className={cx(disabled && 'cb-disabled', selected && 'bg-surface-2')}
              title={o.title}
              subtitle={<span className="tnum whitespace-normal">{body}</span>}
              trailing={selected ? <Check size={20} strokeWidth={1.75} className="text-accent" aria-hidden="true" /> : null}
            />
          )
        })}
      </div>
      {choice === 'cover' && (
        <div className="mt-4">
          <PlaceSelect places={places} value={placeId} onChange={onPlace} label="De cuál lugar" />
        </div>
      )}
    </>
  )
}

/** Paso 4: "¿cuánto te quedó en la cuenta?" (opcional) y destino del sobrante. */
export function LeftoverStep({ planned, reported, onReported, destination, onDestination, leftover, places, placeId, onPlace, pareja }) {
  const diff = reported != null ? planned - reported : 0
  return (
    <>
      <StepTitle
        title={pareja ? '¿Cuánto les quedó en la cuenta?' : '¿Cuánto te quedó en la cuenta?'}
        body={`Es opcional. Según el plan deberían ser ${fmt(planned)}.`}
      />
      <Field label="Saldo real (opcional)">
        <AmountInput value={reported} currency="CRC" allowCurrencyToggle={false} onChange={(v) => onReported(v.amount)} />
      </Field>
      {reported != null && diff > 0 && (
        <p className="tnum mt-2 text-small text-ink-2">{fmt(diff)} se fueron en gastos sin anotar. Pasa, queda registrado.</p>
      )}
      {leftover > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          <Field label={`Qué hacemos con ${fmt(leftover)}`}>
            <Segmented
              options={[
                { value: 'libre', label: 'Queda libre' },
                { value: 'ahorro', label: 'Al ahorro' },
              ]}
              value={destination}
              onChange={onDestination}
            />
          </Field>
          {destination === 'ahorro' && <PlaceSelect places={places} value={placeId} onChange={onPlace} />}
        </div>
      )}
    </>
  )
}
