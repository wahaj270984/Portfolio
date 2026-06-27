import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useExperience } from '@/store/useExperience'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger index — multiplies the entrance delay. */
  delay?: number
  /** Travel direction for the entrance. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  as?: 'div' | 'li' | 'span'
}

const OFFSET = 28

/**
 * Scroll-triggered entrance wrapper. Honors reduced motion by rendering its
 * children immediately with no transform. Built on framer-motion's whileInView
 * so it fires once when the element enters the viewport.
 */
export function Reveal({ children, className, delay = 0, from = 'up' }: RevealProps) {
  const reducedMotion = useExperience((s) => s.reducedMotion)

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const dx = from === 'left' ? -OFFSET : from === 'right' ? OFFSET : 0
  const dy = from === 'up' ? OFFSET : from === 'down' ? -OFFSET : 0

  const variants: Variants = {
    hidden: { opacity: 0, x: dx, y: dy, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay * 0.08 },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
