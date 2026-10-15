import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { cx } from './cx.js'

const MAX = 3
const CLOSE_MS = 180
const ToastContext = createContext(null)

const VARIANTS = {
  neutral: { icon: null, cls: 'text-ink' },
  success: { icon: CheckCircle2, cls: 'text-good' },
  error: { icon: AlertCircle, cls: 'text-bad' },
}

/** Un toast. Entra con transición (no keyframes), se pausa con la pestaña oculta. */
export function Toast({ id, message, variant = 'neutral', duration = 4000, closing, action, onDismiss, onRemove }) {
  const [state, setState] = useState('closed')
  const { icon: Icon, cls } = VARIANTS[variant] || VARIANTS.neutral

  useEffect(() => {
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setState('open'))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  // Temporizador con pausa cuando la pestaña se oculta
  useEffect(() => {
    if (closing || !duration) return undefined
    let remaining = duration
    let start = 0
    let timer = null
    const run = () => {
      start = Date.now()
      timer = setTimeout(() => onDismiss(id), remaining)
    }
    const pause = () => {
      clearTimeout(timer)
      remaining -= Date.now() - start
    }
    const onVis = () => (document.hidden ? pause() : run())
    if (!document.hidden) run()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [id, duration, closing, onDismiss])

  useEffect(() => {
    if (!closing) return undefined
    setState('closing')
    const t = setTimeout(() => onRemove(id), CLOSE_MS)
    return () => clearTimeout(t)
  }, [closing, id, onRemove])

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      data-state={state}
      className="cb-toast pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl bg-surface py-2.5 pl-4 pr-2 shadow-card ring-1 ring-line"
    >
      {Icon && <Icon size={20} strokeWidth={1.75} aria-hidden="true" className={cx('shrink-0', cls)} />}
      <p className="tnum min-w-0 flex-1 text-body text-ink">{message}</p>
      {action && (
        <button
          type="button"
          className="cb-press cb-hover h-9 shrink-0 rounded-xl px-3 text-small font-medium text-accent"
          onClick={() => {
            action.onClick?.()
            onDismiss(id)
          }}
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Cerrar aviso"
        className="cb-press cb-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted"
        onClick={() => onDismiss(id)}
      >
        <X size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  )
}

/** Cola propia de toasts: máximo 3 visibles, el más viejo se va primero. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const seq = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, closing: true } : t)))
  }, [])
  const remove = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const show = useCallback((input, opts = {}) => {
    const data = typeof input === 'string' ? { message: input, ...opts } : input
    const id = ++seq.current
    setToasts((list) => {
      const live = list.filter((t) => !t.closing)
      const overflow = live.length - (MAX - 1)
      const toClose = new Set(overflow > 0 ? live.slice(0, overflow).map((t) => t.id) : [])
      return [...list.map((t) => (toClose.has(t.id) ? { ...t, closing: true } : t)), { id, ...data }]
    })
    return id
  }, [])

  const api = useMemo(
    () => ({
      show,
      dismiss,
      success: (message, opts) => show(message, { ...opts, variant: 'success' }),
      error: (message, opts) => show(message, { ...opts, variant: 'error' }),
    }),
    [show, dismiss],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="cb-toaster" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onDismiss={dismiss} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** useToast() → { show(message | { message, variant, duration, action }), success, error, dismiss } */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast necesita <ToastProvider>')
  return ctx
}
