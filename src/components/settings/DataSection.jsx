import { useState } from 'react'
import { FileJson, FileSpreadsheet, LogOut, Trash2 } from 'lucide-react'
import { downloadBackup, downloadExcel } from '../../data/archive.js'
import { saveProfile, wipeHousehold } from '../../data/actions/index.js'
import { clearLocalPrefs, signOutAndForget } from '../../data/session.js'
import { AmountInput, Button, Card, Field, Input, Sheet, useToast } from '../ui/index.js'
import pkg from '../../../package.json'

const CONFIRM_WORD = 'BORRAR'

export default function DataSection({ hid, me, profile }) {
  const toast = useToast()
  const [busy, setBusy] = useState(null)
  const [rate, setRate] = useState(profile?.exchangeRateDefault ?? null)
  const [wipeOpen, setWipeOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const isOwner = !!me?.uid && hid === me.uid
  const confirmed = confirmText.trim().toUpperCase() === CONFIRM_WORD

  // Al borrar el perfil, RequireHousehold manda solo al onboarding.
  const wipe = () =>
    run('wipe', async () => {
      await wipeHousehold(hid, me)
      clearLocalPrefs()
    }, 'Listo, empezás de cero')

  const closeWipe = () => {
    if (busy === 'wipe') return
    setWipeOpen(false)
    setConfirmText('')
  }

  const run = async (key, fn, msg) => {
    setBusy(key)
    try {
      await fn()
      if (msg) toast.success(msg)
    } catch (e) {
      toast.error(`No se pudo: ${e.message || e}`)
    } finally {
      setBusy(null)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Card title="Exportar" subtitle="Todos tus datos: meses, ahorro, gastos y plantillas.">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" icon={FileSpreadsheet} loading={busy === 'xlsx'} onClick={() => run('xlsx', () => downloadExcel(hid))}>
              Descargar Excel
            </Button>
            <Button variant="secondary" icon={FileJson} loading={busy === 'json'} onClick={() => run('json', () => downloadBackup(hid))}>
              Descargar respaldo JSON
            </Button>
          </div>
        </Card>

        <Card title="Tipo de cambio de respaldo" subtitle="Se usa solo si no podemos traer el del BCCR al abrir un mes nuevo.">
          <div className="space-y-3">
            <Field label="Colones por dólar">
              <AmountInput value={rate} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setRate(amount)} />
            </Field>
            <Button
              variant="secondary"
              disabled={!(Number(rate) > 0) || Number(rate) === profile?.exchangeRateDefault}
              loading={busy === 'rate'}
              onClick={() => run('rate', () => saveProfile(hid, me, { exchangeRateDefault: Number(rate) }), 'Tipo de cambio guardado')}
            >
              Guardar
            </Button>
          </div>
        </Card>

        <Card title="Cuenta" subtitle={me?.email || undefined}>
          <p className="mb-3 text-small text-muted">Al salir se borra la copia guardada en este aparato. Tus datos siguen en la nube.</p>
          <Button variant="danger" icon={LogOut} loading={busy === 'out'} onClick={() => run('out', signOutAndForget)}>
            Cerrar sesión
          </Button>
        </Card>

        <Card
          title="Empezar de cero"
          subtitle={
            isOwner
              ? 'Borra todos tus meses, gastos, ahorro, plantillas y perfil. Después arrancás la configuración desde el principio.'
              : 'Solo quien creó el hogar puede borrarlo.'
          }
        >
          {isOwner && (
            <Button variant="secondary" icon={Trash2} onClick={() => setWipeOpen(true)}>
              Borrar mis datos
            </Button>
          )}
        </Card>

        <p className="tnum px-1 text-small text-muted">Clear Books v{pkg.version}</p>
      </div>

      <Sheet
        open={wipeOpen}
        onClose={closeWipe}
        title="¿Borrar todos tus datos?"
        footer={
          <div className="flex gap-3">
            <Button variant="ghost" disabled={busy === 'wipe'} onClick={closeWipe}>Cancelar</Button>
            <Button full variant="danger" icon={Trash2} disabled={!confirmed} loading={busy === 'wipe'} onClick={wipe}>
              Borrar todo
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-body">
            Se borran para siempre tus meses, gastos, movimientos de ahorro, gastos fijos y anuales, lugares de ahorro y tu perfil.
            {profile?.partnerEmail ? ` ${profile.partnerEmail} también deja de ver el hogar.` : ''} No se puede deshacer.
          </p>
          <Button variant="secondary" icon={FileJson} loading={busy === 'json'} disabled={busy === 'wipe'} onClick={() => run('json', () => downloadBackup(hid))}>
            Descargar respaldo antes
          </Button>
          <Field label={`Escribí ${CONFIRM_WORD} para confirmar`}>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoCapitalize="characters"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              disabled={busy === 'wipe'}
            />
          </Field>
        </div>
      </Sheet>
    </>
  )
}
