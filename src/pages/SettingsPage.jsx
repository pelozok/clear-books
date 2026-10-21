import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarClock, ChevronRight, Database, Heart, PiggyBank, Receipt, Tags, UserRound } from 'lucide-react'
import { useHousehold } from '../data/HouseholdContext.jsx'
import { Card, PageHeader, Row, RowGroup } from '../components/ui/index.js'
import ProfileSection from '../components/settings/ProfileSection.jsx'
import FixedSection from '../components/settings/FixedSection.jsx'
import AnnualSection from '../components/settings/AnnualSection.jsx'
import PlacesSection from '../components/settings/PlacesSection.jsx'
import CategoriesSection from '../components/settings/CategoriesSection.jsx'
import PartnerSection from '../components/settings/PartnerSection.jsx'
import DataSection from '../components/settings/DataSection.jsx'

const SECTIONS = [
  { key: 'perfil', title: 'Perfil', subtitle: 'Modo, frecuencia, ingresos, ahorro y reparto', icon: UserRound, Comp: ProfileSection },
  { key: 'fijos', title: 'Gastos fijos', subtitle: 'La plantilla de cada mes', icon: Receipt, Comp: FixedSection },
  { key: 'anuales', title: 'Gastos anuales', subtitle: 'Marchamo, Navidad y otros', icon: CalendarClock, Comp: AnnualSection },
  { key: 'lugares', title: 'Lugares de ahorro', subtitle: 'Cuentas, CDP, cooperativa', icon: PiggyBank, Comp: PlacesSection },
  { key: 'categorias', title: 'Categorías', subtitle: 'Para los gastos del mes', icon: Tags, Comp: CategoriesSection },
  { key: 'pareja', title: 'Pareja', subtitle: 'Compartir el hogar', icon: Heart, Comp: PartnerSection },
  { key: 'datos', title: 'Datos y cuenta', subtitle: 'Exportar, tipo de cambio, sesión, borrar todo', icon: Database, Comp: DataSection },
]

export default function SettingsPage() {
  const { section } = useParams()
  const { hid, me, profile } = useHousehold()

  if (section) {
    const sec = SECTIONS.find((x) => x.key === section)
    if (!sec) return <Navigate to="/ajustes" replace />
    const { Comp } = sec
    return (
      <>
        <PageHeader title={sec.title} back="/ajustes" />
        <Comp hid={hid} me={me} profile={profile} />
      </>
    )
  }

  return (
    <>
      <PageHeader title="Ajustes" />
      <Card padded={false}>
        <RowGroup>
          {SECTIONS.map(({ key, title, subtitle, icon: Icon }) => (
            <Row
              key={key}
              as={Link}
              to={`/ajustes/${key}`}
              leading={<Icon size={20} strokeWidth={1.75} aria-hidden="true" />}
              title={title}
              subtitle={subtitle}
              trailing={<ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" className="text-muted" />}
            />
          ))}
        </RowGroup>
      </Card>
      <p className="mt-4 px-1 text-small text-muted">
        Los cambios de perfil y plantillas aplican a los meses nuevos. El mes en curso solo cambia si lo pedís.
      </p>
    </>
  )
}
