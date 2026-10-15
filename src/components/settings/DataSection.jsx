import { useState } from 'react'
import { FileJson, FileSpreadsheet, LogOut } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig.js'
import { downloadBackup, downloadExcel } from '../../data/archive.js'
import { saveProfile } from '../../data/actions/index.js'
import { AmountInput, Button, Card, Field, useToast } from '../ui/index.js'
import pkg from '../../../package.json'

export default function DataSection({ hid, me, profile }) {
  const toast = useToast()
  const [busy, setBusy] = useState(null)
  const [rate, setRate] = useState(profile?.exchangeRateDefault ?? null)

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
        <Button variant="danger" icon={LogOut} loading={busy === 'out'} onClick={() => run('out', () => signOut(auth))}>
          Cerrar sesión
        </Button>
      </Card>

      <p className="tnum px-1 text-small text-muted">clear-books v{pkg.version}</p>
    </div>
  )
}
