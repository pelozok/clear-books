// Utilidades de presentación compartidas por el plan del mes, el gasto y el cierre.
// Nada de matemática de dinero: eso vive en src/lib.
import { useCallback, useEffect, useState } from 'react'

const LAST_PLACE = 'cb.lastPlaceId'
const LAST_CATEGORY = 'cb.lastCategoryId'

const readLS = (k) => {
  try {
    return window.localStorage.getItem(k)
  } catch {
    return null
  }
}
const writeLS = (k, v) => {
  try {
    if (v == null) window.localStorage.removeItem(k)
    else window.localStorage.setItem(k, v)
  } catch {
    /* almacenamiento bloqueado: se ignora */
  }
}

export const getLastCategory = () => readLS(LAST_CATEGORY)
export const setLastCategory = (id) => writeLS(LAST_CATEGORY, id)

/** Lugares activos, en su orden. */
export const activePlaces = (places) => (places || []).filter((p) => p && p.active !== false)

/** Lugar de ahorro preseleccionado: el último usado si sigue activo, si no el primero. */
export function useLastPlace(places) {
  const list = activePlaces(places)
  const stored = readLS(LAST_PLACE)
  const fallback = list.find((p) => p.id === stored)?.id || list[0]?.id || ''
  const remember = useCallback((id) => writeLS(LAST_PLACE, id || null), [])
  return [fallback, remember]
}

/** Nombre de una persona del perfil por id. */
export const personName = (profile, id) =>
  (profile?.people || []).find((p) => p.id === id)?.name || (id ? 'Persona' : 'Hogar')

export const isPareja = (profile) => profile?.mode === 'pareja' && (profile?.people || []).length > 1

/** Categorías del perfil; 'otros' siempre existe. */
export const categoriesOf = (profile) => {
  const list = (profile?.categories || []).filter(Boolean)
  return list.some((c) => c.id === 'otros') ? list : [...list, { id: 'otros', label: 'Otros', budget: null }]
}

export const categoryLabel = (profile, id) => categoriesOf(profile).find((c) => c.id === id)?.label || 'Otros'

/** true sin conexión; escucha online/offline. */
export function useOnline() {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine !== false))
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  return online
}

/** Mensaje legible de un error de escritura. */
export const errorText = (e) => e?.message || 'No se pudo guardar. Probá de nuevo.'
