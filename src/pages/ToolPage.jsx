import { Link, useParams } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { Button, EmptyState, PageHeader } from '../components/ui/index.js'
import { toolById } from '../components/tools/registry.js'
import { PageError, PageSkeleton } from '../components/savings/PageStates.jsx'
import { useSavingsOverview } from '../components/savings/useSavingsOverview.js'

export default function ToolPage() {
  const { tool } = useParams()
  const t = toolById(tool)
  const ctx = useSavingsOverview()

  if (!t) {
    return (
      <>
        <PageHeader title="Calculadora" back="/herramientas" />
        <EmptyState
          icon={Calculator}
          title="Esa calculadora no existe"
          body="Volvé a la lista y elegí otra."
          action={<Button as={Link} to="/herramientas" variant="secondary">Ver calculadoras</Button>}
        />
      </>
    )
  }

  return (
    <>
      <PageHeader title={t.title} back="/herramientas" />
      {ctx.error ? (
        <PageError error={ctx.error} />
      ) : ctx.loading ? (
        <PageSkeleton />
      ) : (
        <div className="flex flex-col gap-6 pb-6">
          {/* key: al cambiar de calculadora se reinician los valores por defecto */}
          <t.Component key={t.id} ctx={ctx} />
        </div>
      )}
    </>
  )
}
