import { useParams } from 'react-router-dom'
import { monthLabel } from '../lib/periods.js'
import Placeholder from './Placeholder.jsx'

export default function ClosePage() {
  const { key } = useParams()
  return <Placeholder title={`Cerrar ${monthLabel(key)}`} back={`/mes/${key}`} />
}
