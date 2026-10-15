import { useState } from 'react'
import { Button, Card, Field, Input, useToast } from '../ui/index.js'
import { saveProfile } from '../../data/actions/index.js'

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export default function PartnerSection({ hid, me, profile }) {
  const toast = useToast()
  const [email, setEmail] = useState(profile?.partnerEmail || '')
  const [busy, setBusy] = useState(false)
  const clean = email.trim().toLowerCase()
  const changed = clean !== (profile?.partnerEmail || '')
  const error = clean && !isEmail(clean) ? 'Revisá el correo, parece incompleto.' : null

  const save = async () => {
    setBusy(true)
    try {
      await saveProfile(hid, me, { partnerEmail: clean || null })
      toast.success(clean ? 'Correo guardado' : 'Ya no compartís el hogar')
    } catch (e) {
      toast.error(`No se pudo guardar: ${e.message || e}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="Compartir el hogar">
        <div className="space-y-4">
          <p className="text-body text-ink-2">
            Tu pareja entra con su propia cuenta de Google. Con su correo aquí, puede ver y anotar en este mismo hogar: el mismo plan, el mismo ahorro.
          </p>
          <Field label="Correo de Google de tu pareja" error={error}>
            <Input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Button full loading={busy} disabled={!changed || !!error} onClick={save}>
            {clean ? 'Guardar correo' : 'Dejar de compartir'}
          </Button>
          {profile?.mode !== 'pareja' && (
            <p className="text-small text-muted">Para ver el reparto entre los dos, cambiá el modo a "Somos dos" en Perfil.</p>
          )}
        </div>
      </Card>
      <Card title="Unirse desde el teléfono de tu pareja" subtitle="Próximamente">
        <p className="text-body text-ink-2">
          Todavía no existe el paso para que tu pareja se una desde su teléfono. Mientras tanto, dejá su correo guardado y lo activamos en cuanto esté listo.
        </p>
      </Card>
    </div>
  )
}
