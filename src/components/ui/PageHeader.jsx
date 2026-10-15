import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Settings } from 'lucide-react'
import IconButton from './IconButton.jsx'
import { cx } from './cx.js'

/**
 * Header pegajoso con blur ligero sobre bg.
 * back: true (vuelve atrás) o una ruta. settings: muestra el acceso a Ajustes en móvil.
 */
export default function PageHeader({ title, back, actions, settings = false, children, className }) {
  const navigate = useNavigate()
  const backProps = typeof back === 'string' ? { as: Link, to: back } : { onClick: () => navigate(-1) }
  return (
    <header className={cx('cb-page-header -mx-gutter mb-2 px-gutter', className)}>
      <div className="flex h-14 items-center gap-1">
        {back && <IconButton label="Volver" icon={ChevronLeft} className="-ml-2.5" {...backProps} />}
        <h1 className="min-w-0 flex-1 truncate text-title text-ink">{title}</h1>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
        {settings && (
          <IconButton as={Link} to="/ajustes" label="Ajustes" icon={Settings} className="-mr-2.5 lg:hidden" />
        )}
      </div>
      {children && <div className="pb-3">{children}</div>}
    </header>
  )
}
