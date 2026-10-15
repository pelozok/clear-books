import { cx } from './cx.js'

const TONES = { accent: 'bg-accent', good: 'bg-good', warn: 'bg-warn', bad: 'bg-bad' }

/** Progreso real (reservas, fondo de emergencia). 6px de alto; el relleno escala en X. */
export default function ProgressBar({ value = 0, max = 100, tone = 'accent', label, className }) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cx('h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.08]', className)}
    >
      <div
        className={cx('cb-progress-fill h-full w-full rounded-full', TONES[tone] || TONES.accent)}
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  )
}
