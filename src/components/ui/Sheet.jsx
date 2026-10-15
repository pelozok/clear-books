import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'
import IconButton from './IconButton.jsx'
import { cx } from './cx.js'

const CLOSE_MS = 180 // --dur-sheet-out
const DRAG_RATIO = 0.25 // cierra si se arrastra más de 1/4 del alto
const DRAG_VELOCITY = 0.11 // px/ms: un gesto rápido cierra aunque sea corto

const isMobile = () => typeof window !== 'undefined' && !window.matchMedia('(min-width: 640px)').matches

/**
 * Hoja inferior en móvil, diálogo centrado en ≥ 640px, sobre <dialog> nativo.
 * Cierra con Escape, tocando el fondo o arrastrando hacia abajo (umbral o velocidad).
 * Entra 260ms y sale 180ms (transiciones en components.css, data-state).
 */
export default function Sheet({ open, onClose, title, children, footer, className }) {
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const drag = useRef(null)
  const [mounted, setMounted] = useState(open)
  const [state, setState] = useState('closed')
  const [dragging, setDragging] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    if (open) {
      if (!dialog.open) dialog.showModal()
      // Doble rAF: el estado cerrado se pinta primero para que la entrada transicione
      let raf2
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setState('open'))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }
    if (panelRef.current) panelRef.current.style.transform = '' // suelta el arrastre: la salida parte de ahí
    setState('closed')
    const t = setTimeout(() => {
      if (dialog.open) dialog.close()
      setMounted(false)
    }, CLOSE_MS)
    return () => clearTimeout(t)
  }, [open, mounted])

  const handleCancel = (e) => {
    e.preventDefault() // Escape: cerramos nosotros para animar la salida
    onClose?.()
  }

  const setOffset = (y) => {
    if (panelRef.current) panelRef.current.style.transform = y == null ? '' : `translateY(${y}px)`
  }

  const onPointerDown = (e) => {
    if (!isMobile() || e.button > 0) return
    drag.current = { startY: e.clientY, lastY: e.clientY, lastT: performance.now(), v: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const now = performance.now()
    const dt = Math.max(1, now - d.lastT)
    d.v = (e.clientY - d.lastY) / dt
    d.lastY = e.clientY
    d.lastT = now
    const dy = e.clientY - d.startY
    // Hacia arriba con resistencia; hacia abajo 1:1
    setOffset(dy < 0 ? -Math.sqrt(-dy) * 2 : dy)
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d) return
    drag.current = null
    setDragging(false)
    const dy = e.clientY - d.startY
    const height = panelRef.current?.offsetHeight || 1
    // Si cierra, el offset se suelta junto con data-state="closed" y la salida parte desde el dedo
    if (dy > height * DRAG_RATIO || (dy > 8 && d.v > DRAG_VELOCITY)) onClose?.()
    else setOffset(null)
  }

  if (!mounted) return null

  const dragHandlers = { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp }

  return (
    <dialog
      ref={dialogRef}
      className="cb-sheet"
      data-state={state}
      data-dragging={dragging || undefined}
      aria-labelledby={title ? titleId : undefined}
      onCancel={handleCancel}
      onClose={() => open && onClose?.()}
    >
      <div className="cb-sheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className={cx('cb-sheet-panel', className)}>
        <div className="cb-sheet-handle shrink-0 pt-2 sm:pt-0" {...dragHandlers}>
          <div className="mx-auto h-1 w-9 rounded-full bg-ink/15 sm:hidden" aria-hidden="true" />
          <div className="flex items-center gap-2 px-4 pb-1 pt-2 sm:px-5 sm:pt-4">
            <h2 id={titleId} className="min-w-0 flex-1 truncate text-heading text-ink">
              {title}
            </h2>
            <IconButton label="Cerrar" icon={X} size="sm" className="-mr-1.5" onClick={onClose} />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
          {children}
        </div>
        {footer && <div className="shrink-0 border-t border-line px-4 py-3 sm:px-5">{footer}</div>}
      </div>
    </dialog>
  )
}
