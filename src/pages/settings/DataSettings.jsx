import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { Card, Btn } from "../../components/ui.jsx";
import { downloadExcel } from "../../data/archive.js";

export default function DataSettings({ uid, showToast }) {
  const [busy, setBusy] = useState(false);

  const exportar = async () => {
    setBusy(true);
    try {
      await downloadExcel(uid);
      showToast("Excel descargado");
    } catch {
      showToast("No se pudo generar el Excel");
    }
    setBusy(false);
  };

  return (
    <Card
      title="Datos"
      subtitle="Tus datos viven en la nube. Esto descarga una copia en Excel: resumen por período, gastos fijos y variables."
    >
      <Btn variant="ghost" onClick={exportar} disabled={busy} className="flex items-center gap-1.5">
        <FileSpreadsheet size={15} />
        {busy ? "Preparando…" : "Descargar Excel"}
      </Btn>
    </Card>
  );
}
