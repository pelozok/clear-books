import { Clock } from 'lucide-react'
import { EmptyState, PageHeader } from '../components/ui/index.js'

/** Pantalla provisoria: header + estado vacío "Pronto". */
export default function Placeholder({ title, back, settings }) {
  return (
    <>
      <PageHeader title={title} back={back} settings={settings} />
      <EmptyState icon={Clock} title="Pronto" body="Esta pantalla está en construcción." />
    </>
  )
}
