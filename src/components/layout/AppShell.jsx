import { Link, Outlet, useLocation } from 'react-router-dom'
import { CalendarDays, Calculator, History, PiggyBank, Settings } from 'lucide-react'
import { cx } from '../ui/cx.js'

// Mes también queda activo en sus pantallas hijas (gasto nuevo, cierre)
const NAV = [
  { to: '/', label: 'Mes', icon: CalendarDays, match: ['/mes', '/gasto', '/cerrar'] },
  { to: '/ahorro', label: 'Ahorro', icon: PiggyBank, match: ['/ahorro'] },
  { to: '/historial', label: 'Historial', icon: History, match: ['/historial'] },
  { to: '/herramientas', label: 'Herramientas', icon: Calculator, match: ['/herramientas'] },
]
const SETTINGS = { to: '/ajustes', label: 'Ajustes', icon: Settings, match: ['/ajustes'] }

const isActive = (pathname, match) => match.some((m) => pathname === m || pathname.startsWith(`${m}/`))

function NavBar({ pathname }) {
  return (
    <nav aria-label="Principal" className="cb-navbar fixed inset-x-0 bottom-0 z-30 border-t border-line lg:hidden">
      <ul className="mx-auto flex h-nav max-w-3xl">
        {NAV.map(({ to, label, icon: Icon, match }) => {
          const active = isActive(pathname, match)
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'cb-press flex h-full flex-col items-center justify-center gap-1 text-micro no-underline',
                  active ? 'text-accent' : 'text-muted',
                )}
              >
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SideItem({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cx(
        'cb-press cb-hover flex h-11 items-center gap-3 rounded-xl px-3 text-body font-medium no-underline [--press-scale:0.98]',
        active ? 'bg-accent-soft text-accent-ink' : 'text-ink-2',
      )}
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </Link>
  )
}

function SideNav({ pathname }) {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-y-0 left-0 z-30 hidden w-side flex-col border-r border-line bg-surface px-3 pb-4 pt-5 lg:flex"
    >
      <p className="mb-6 px-3 text-heading text-ink">clear-books</p>
      <ul className="flex flex-col gap-1">
        {NAV.map((item) => (
          <li key={item.to}>
            <SideItem {...item} active={isActive(pathname, item.match)} />
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <SideItem {...SETTINGS} active={isActive(pathname, SETTINGS.match)} />
      </div>
    </nav>
  )
}

// Pantallas que en escritorio usan todo el ancho, en columnas (Ajustes y formularios quedan angostos).
const WIDE = ['/mes', '/ahorro', '/historial', '/herramientas']

/** Marco de la app: barra inferior en móvil, barra lateral ≥ 1024px, contenido a max-w-3xl
 *  (mes, ahorro, historial y herramientas se abren a max-w-6xl en escritorio). */
export default function AppShell({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-dvh lg:pl-side">
      <SideNav pathname={pathname} />
      <main className={`mx-auto ${WIDE.some((w) => pathname.startsWith(w)) ? 'max-w-3xl lg:max-w-6xl' : 'max-w-3xl'} px-gutter pb-[calc(var(--nav-h)+env(safe-area-inset-bottom)+24px)] lg:pb-12`}>
        {children ?? <Outlet />}
      </main>
      <NavBar pathname={pathname} />
    </div>
  )
}
