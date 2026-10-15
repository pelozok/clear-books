// Lista de calculadoras: ruta, título, descripción de una línea, ícono y componente.
import { ArrowLeftRight, CalendarRange, CreditCard, Gift, HandCoins, LifeBuoy, Target, Wallet } from 'lucide-react'
import NetSalaryTool from './NetSalaryTool.jsx'
import AguinaldoTool from './AguinaldoTool.jsx'
import SavingsGoalTool from './SavingsGoalTool.jsx'
import EmergencyFundTool from './EmergencyFundTool.jsx'
import LoanTool from './LoanTool.jsx'
import FxTool from './FxTool.jsx'
import CreditCardTool from './CreditCardTool.jsx'
import ProrateTool from './ProrateTool.jsx'

export const TOOLS = [
  { id: 'salario-neto', title: 'Salario neto', desc: 'De bruto a neto con CCSS e impuesto 2026.', icon: Wallet, Component: NetSalaryTool },
  { id: 'aguinaldo', title: 'Aguinaldo', desc: 'Cuánto te llega en diciembre.', icon: Gift, Component: AguinaldoTool },
  { id: 'meta-ahorro', title: 'Meta de ahorro', desc: 'A este ritmo, cuándo llegás.', icon: Target, Component: SavingsGoalTool },
  { id: 'fondo-emergencia', title: 'Fondo de emergencia', desc: 'Cuántos meses de gastos tenés cubiertos.', icon: LifeBuoy, Component: EmergencyFundTool },
  { id: 'prestamo', title: 'Préstamo con abonos extra', desc: 'Cuota, intereses y cuánto ahorrás abonando.', icon: HandCoins, Component: LoanTool },
  { id: 'convertidor', title: 'Convertidor ₡/$', desc: 'Con el TC del mes y el costo real con tarjeta.', icon: ArrowLeftRight, Component: FxTool },
  { id: 'tarjeta', title: 'Tarjeta: mínimo vs fijo', desc: 'Cuánto cuesta pagar solo el mínimo.', icon: CreditCard, Component: CreditCardTool },
  { id: 'anuales', title: 'Gastos anuales prorrateados', desc: 'Marchamo, Navidad o seguros, por mes.', icon: CalendarRange, Component: ProrateTool },
]

export const toolById = (id) => TOOLS.find((t) => t.id === id) || null
