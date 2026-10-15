import { Plus, RefreshCw, WifiOff } from 'lucide-react'
import { Button, Card, EmptyState, RowGroup, Skeleton } from '../ui/index.js'

/** Lista de ajustes con sus estados: cargando, error, vacío y filas + "Agregar". */
export default function CrudList({ loading, error, count, empty, addLabel, onAdd, note, children }) {
  if (loading) {
    return (
      <Card padded={false}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-line px-4 py-4 last:border-0">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
        ))}
      </Card>
    )
  }
  if (error) {
    return (
      <EmptyState
        icon={WifiOff}
        title="No pudimos cargar esta lista"
        body={error.message || String(error)}
        action={<Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>Reintentar</Button>}
      />
    )
  }
  return (
    <div className="space-y-4">
      {count === 0 ? (
        <EmptyState icon={empty.icon} title={empty.title} body={empty.body} action={<Button icon={Plus} onClick={onAdd}>{addLabel}</Button>} />
      ) : (
        <>
          <Card padded={false}>
            <RowGroup>{children}</RowGroup>
          </Card>
          <Button variant="secondary" icon={Plus} onClick={onAdd}>
            {addLabel}
          </Button>
        </>
      )}
      {note && <p className="px-1 text-small text-muted">{note}</p>}
    </div>
  )
}
