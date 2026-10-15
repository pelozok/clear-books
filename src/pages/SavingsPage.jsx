import { useState } from 'react'
import { PageHeader } from '../components/ui/index.js'
import SavingsHero from '../components/savings/SavingsHero.jsx'
import PlacesCard from '../components/savings/PlacesCard.jsx'
import ReservesCard from '../components/savings/ReservesCard.jsx'
import LedgerCard from '../components/savings/LedgerCard.jsx'
import MoveSheet from '../components/savings/MoveSheet.jsx'
import { PageError, PageSkeleton } from '../components/savings/PageStates.jsx'
import { useSavingsOverview } from '../components/savings/useSavingsOverview.js'

export default function SavingsPage() {
  const s = useSavingsOverview()
  const [mode, setMode] = useState('extra') // se conserva al cerrar para no cambiar el título en la salida
  const [open, setOpen] = useState(false)
  const openSheet = (m) => { setMode(m); setOpen(true) }
  const couple = s.profile?.mode === 'pareja'
  const payrollLabel = (s.profile?.people || []).map((p) => p.payrollSavings?.label).filter(Boolean).join(', ')

  return (
    <>
      <PageHeader title="Ahorro" settings />
      {s.error ? (
        <PageError error={s.error} />
      ) : s.loading ? (
        <PageSkeleton />
      ) : (
        <div className="flex flex-col gap-6 pb-6">
          <SavingsHero
            couple={couple}
            totals={s.totals}
            covered={s.covered}
            milestone={s.milestone}
            payroll={s.payroll}
            payrollLabel={payrollLabel}
            onExtra={() => openSheet('extra')}
            onWithdraw={() => openSheet('retiro')}
          />
          <PlacesCard byPlace={s.totals.byPlace} rate={s.rate} />
          <ReservesCard annual={s.annual} reservedByAnnual={s.totals.reservedByAnnual} rate={s.rate} />
          <LedgerCard ledger={s.ledger} places={s.places} />
        </div>
      )}
      <MoveSheet
        mode={mode}
        open={open}
        onClose={() => setOpen(false)}
        hid={s.hid}
        me={s.me}
        places={s.places}
        annual={s.annual}
        totals={s.totals}
        rate={s.rate}
      />
    </>
  )
}
