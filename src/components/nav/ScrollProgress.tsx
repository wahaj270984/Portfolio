import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useExperience } from '@/store/useExperience'

/** Thin gradient progress rail pinned to the very top of the viewport. */
export function ScrollProgress() {
  const progress = useExperience((s) => s.scrollProgress)
  const scaleX = useSpring(0, { stiffness: 180, damping: 30, mass: 0.4 })

  useEffect(() => {
    scaleX.set(progress)
  }, [progress, scaleX])

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-primary via-accent to-violet"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
