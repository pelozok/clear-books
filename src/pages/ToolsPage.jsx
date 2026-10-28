import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card, PageHeader, Row, RowGroup } from '../components/ui/index.js'
import { TOOLS } from '../components/tools/registry.js'

export default function ToolsPage() {
  return (
    <>
      <PageHeader title="Herramientas" settings />
      {/* Móvil: lista. Escritorio: tarjetas en grilla. */}
      <Card padded={false} className="mb-6 overflow-hidden lg:hidden">
        <RowGroup>
          {TOOLS.map((t) => (
            <Row
              key={t.id}
              as={Link}
              to={`/herramientas/${t.id}`}
              leading={<t.icon size={20} strokeWidth={1.75} aria-hidden="true" />}
              title={t.title}
              subtitle={t.desc}
              trailing={<ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" className="text-muted" />}
            />
          ))}
        </RowGroup>
      </Card>
      <ul className="mb-6 hidden gap-4 lg:grid lg:grid-cols-3">
        {TOOLS.map((t) => (
          <li key={t.id}>
            <Link
              to={`/herramientas/${t.id}`}
              className="group flex h-full flex-col rounded-2xl bg-surface p-5 shadow-card transition-colors hover:bg-surface-2 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                <t.icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="mt-4 text-heading text-ink">{t.title}</span>
              <span className="mt-1 text-small text-ink-2">{t.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
