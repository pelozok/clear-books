import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card, PageHeader, Row, RowGroup } from '../components/ui/index.js'
import { TOOLS } from '../components/tools/registry.js'

export default function ToolsPage() {
  return (
    <>
      <PageHeader title="Herramientas" settings />
      <Card padded={false} className="mb-6 overflow-hidden">
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
    </>
  )
}
