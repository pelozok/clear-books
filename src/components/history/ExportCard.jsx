import { useState } from 'react'
import { FileJson, FileSpreadsheet } from 'lucide-react'
import { Button, Card, useToast } from '../ui/index.js'
import { downloadBackup, downloadExcel } from '../../data/archive.js'

/** Exportar a Excel y respaldo JSON. */
export default function ExportCard({ hid }) {
  const toast = useToast()
  const [busy, setBusy] = useState(null)
  const run = (kind, fn) => async () => {
    setBusy(kind)
    try {
      await fn(hid)
    } catch (e) {
      toast.error(e?.message || 'No se pudo exportar. Probá de nuevo.')
    } finally {
      setBusy(null)
    }
  }
  return (
    <Card title="Exportar" subtitle="Tus datos completos, para guardarlos o abrirlos en Excel.">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button variant="secondary" icon={FileSpreadsheet} loading={busy === 'xlsx'} disabled={!!busy} onClick={run('xlsx', downloadExcel)}>
          Exportar Excel
        </Button>
        <Button variant="secondary" icon={FileJson} loading={busy === 'json'} disabled={!!busy} onClick={run('json', downloadBackup)}>
          Respaldo JSON
        </Button>
      </div>
    </Card>
  )
}
