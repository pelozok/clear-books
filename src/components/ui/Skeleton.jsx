import { cx } from './cx.js'

/** Bloque de carga con la forma final (línea, bloque, círculo). Brillo sutil por CSS. */
export default function Skeleton({ className }) {
  return <div aria-hidden="true" className={cx('cb-skeleton', className || 'h-4 w-full')} />
}
