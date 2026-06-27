import { type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useExperience } from '@/store/useExperience'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
  glare?: boolean
}

/**
 * 3D pointer-tilt wrapper with an optional moving glare. Spring-damped so it
 * feels weighted, not twitchy. Disabled (renders a plain div) under reduced
 * motion. The shimmer follows the pointer via CSS custom properties.
 */
export function TiltCard({ children, className, max = 10, glare = true }: TiltCardProps) {
  const reducedMotion = useExperience((s) => s.reducedMotion)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 18,
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    px.set(x)
    py.set(y)
    e.currentTarget.style.setProperty('--mx', `${x * 100}%`)
    e.currentTarget.style.setProperty('--my', `${y * 100}%`)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={cn('relative [transform-style:preserve-3d]', className)}
      style={{ rotateX, rotateY, perspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="hover"
    >
      {children}
      {glare && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(220px_circle_at_var(--mx,_50%)_var(--my,_50%),_color-mix(in_srgb,_var(--color-primary)_22%,_transparent),_transparent_60%)] group-hover:opacity-100"
          aria-hidden
        />
      )}
    </motion.div>
  )
}
