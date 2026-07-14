import { useState } from "react";
import { Download } from "lucide-react";
import { Card, Btn } from "../../components/ui.jsx";
import { downloadBackup } from "../../data/archive.js";

export default function DataSettings({ uid, showToast }) {
  const [busy, setBusy] = useState(false);

  const backup = async () => {
    setBusy(true);
    try {
      await downloadBackup(uid);
      showToast("Respaldo descargado");
    } catch {
      showToast("No se pudo descargar el respaldo");
    }
    setBusy(false);
  };

  return (
    <Card
      title="Datos"
      subtitle="Descargá una copia de todo (perfil, gastos fijos, períodos y gastos) en un archivo JSON."
    >
      <Btn variant="ghost" onClick={backup} disabled={busy} className="flex items-center gap-1.5">
        <Download size={15} />
        {busy ? "Preparando…" : "Descargar respaldo"}
      </Btn>
    </Card>
  );
}
