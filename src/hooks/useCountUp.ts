import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useExperience } from '@/store/useExperience'

/**
 * Counts from 0 to `target` once the element scrolls into view. Returns the
 * live value plus a ref to attach to the element being observed. Honors reduced
 * motion by jumping straight to the target.
 */
export function useCountUp(target: number, durationMs = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    let frame = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      // Reduced motion jumps straight to the target on the first frame.
      const t = reducedMotion ? 1 : Math.min((now - start) / durationMs, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reducedMotion, target, durationMs])

  return { value, ref }
}
