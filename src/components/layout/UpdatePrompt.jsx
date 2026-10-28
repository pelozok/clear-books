import { useEffect, useRef } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useToast } from '../ui/index.js'

/**
 * App instalada: busca versión nueva al abrirla o volver a ella (y cada hora). Si hay,
 * avisa con un toast fijo y solo recarga cuando la persona toca "Actualizar", para no
 * cortar lo que esté anotando.
 */
export default function UpdatePrompt() {
  const toast = useToast()
  const shown = useRef(null)
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_url, reg) {
      if (!reg) return
      const check = () => navigator.onLine && reg.update().catch(() => {})
      document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check())
      setInterval(check, 60 * 60 * 1000)
    },
  })

  useEffect(() => {
    if (!needRefresh || shown.current) return
    shown.current = toast.show({
      message: 'Hay una versión nueva de la app.',
      duration: 0,
      action: { label: 'Actualizar', onClick: () => updateServiceWorker(true) },
    })
  }, [needRefresh, toast, updateServiceWorker])

  return null
}
