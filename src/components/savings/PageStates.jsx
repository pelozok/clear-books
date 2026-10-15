import { AlertCircle, RotateCw } from 'lucide-react'
import { Button, Card, EmptyState, Skeleton } from '../ui/index.js'

/** Skeleton con la forma final: una tarjeta protagonista y dos listas. */
export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Cargando">
      <Card>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-12 w-56" />
        <Skeleton className="mt-3 h-4 w-48" />
      </Card>
      {[0, 1].map((i) => (
        <Card key={i}>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-3 h-10 w-full" />
        </Card>
      ))}
    </div>
  )
}

/** Error con el texto del problema y reintentar. */
export function PageError({ error }) {
  return (
    <EmptyState
      icon={AlertCircle}
      title="No pudimos cargar tus datos"
      body={error?.message || 'Revisá la conexión y probá de nuevo.'}
      action={<Button variant="secondary" icon={RotateCw} onClick={() => window.location.reload()}>Reintentar</Button>}
    />
  )
}
