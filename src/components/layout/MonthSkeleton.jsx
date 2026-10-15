import { Skeleton } from '../ui/index.js'

/** Forma final de la pantalla del mes mientras carga el hogar (no spinner). */
export default function MonthSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando el mes" className="pt-safe-t">
      <div className="flex h-14 items-center gap-3">
        <Skeleton className="h-6 w-40" />
        <div className="flex-1" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="mt-2 rounded-2xl bg-surface p-4 shadow-card sm:p-5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-11 w-56" />
        <Skeleton className="mt-3 h-4 w-40" />
      </div>
      {[3, 4].map((rows, i) => (
        <div key={i} className="mt-6 rounded-2xl bg-surface shadow-card">
          <div className="px-4 pb-2 pt-4 sm:px-5">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="divide-y divide-line">
            {Array.from({ length: rows }, (_, j) => (
              <div key={j} className="flex min-h-row items-center gap-3 px-4 sm:px-5">
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
