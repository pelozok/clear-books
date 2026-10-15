import { useParams } from 'react-router-dom'
import { monthLabel } from '../lib/periods.js'
import Placeholder from './Placeholder.jsx'

export default function MonthPage() {
  const { key } = useParams()
  return <Placeholder title={monthLabel(key)} settings />
}
