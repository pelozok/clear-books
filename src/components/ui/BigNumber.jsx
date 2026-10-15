import { fmtAmount } from '../../lib/format.js'
import { cx } from './cx.js'

const SIZES = { display: 'text-display', title: 'text-title' }
const TONES = { ink: 'text-ink', good: 'text-good', warn: 'text-warn', bad: 'text-bad' }

/** Cifra protagonista. Sin animación: cambia al instante. */
export default function BigNumber({ amount, currency = 'CRC', size = 'display', tone = 'ink', className, as: As = 'p' }) {
  return (
    <As className={cx('tnum', SIZES[size] || SIZES.display, TONES[tone] || TONES.ink, className)}>
      {fmtAmount(amount ?? 0, currency)}
    </As>
  )
}
