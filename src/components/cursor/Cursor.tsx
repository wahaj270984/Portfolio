import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useExperience } from '@/store/useExperience'

/**
 * Custom cursor: a precise dot plus a soft, spring-trailing glow ring that
 * swells over interactive targets. Rendered additively over the native cursor
 * (we keep the OS cursor for accessibility). Disabled under reduced motion and
 * on coarse-pointer devices.
 */
export function Cursor() {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  // Coarse-pointer probe runs once; combined with reduced motion it derives
  // `enabled` without an effect (no setState-in-effect cascade).
  const [coarsePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )
  const enabled = !reducedMotion && !coarsePointer
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement | null
      setHovering(!!target?.closest('a, button, [data-cursor="hover"], input, textarea'))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden>
      <motion.div
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary"
        style={{ x, y }}
      />
      <motion.div
        className="absolute rounded-full border border-primary/60 mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -28 : -16,
          marginTop: hovering ? -28 : -16,
          opacity: hovering ? 1 : 0.6,
          scale: down ? 0.8 : 1,
          backgroundColor: hovering
            ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
            : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </div>
  )
}
