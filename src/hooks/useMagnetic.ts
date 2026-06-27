import { useEffect, useRef } from 'react'
import { useExperience } from '@/store/useExperience'

/**
 * Magnetic pointer effect: the returned ref's element drifts toward the cursor
 * while hovered, snapping back on leave. No-op under reduced motion or on
 * coarse-pointer (touch) devices. Pair with a CSS `transition-transform` on the
 * element for the smooth return.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const reducedMotion = useExperience((s) => s.reducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion, strength])

  return ref
}
