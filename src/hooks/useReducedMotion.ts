import { useEffect, useState } from 'react'
import { useExperience } from '@/store/useExperience'

/**
 * Tracks the user's `prefers-reduced-motion` setting and mirrors it into the
 * experience store so the 3D scene and animations can degrade gracefully.
 */
export function useReducedMotion() {
  const setReducedMotion = useExperience((s) => s.setReducedMotion)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReduced(media.matches)
      setReducedMotion(media.matches)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [setReducedMotion])

  return reduced
}
