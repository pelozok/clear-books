import { useParams } from 'react-router-dom'
import Placeholder from './Placeholder.jsx'

export default function SettingsPage() {
  const { section } = useParams()
  return <Placeholder title="Ajustes" back={section ? '/ajustes' : undefined} />
}
