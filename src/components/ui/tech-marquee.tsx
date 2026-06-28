import { useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useMeasure } from 'react-use'
import { useExperience } from '@/store/useExperience'
import { cn } from '@/lib/utils'

// Scroll speed in px/sec — slow enough to read, fast enough to feel alive.
const SPEED = 36

// Accent glow cycled across pills so the strip shimmers in brand colours.
const ACCENTS = ['text-primary', 'text-accent', 'text-violet'] as const

function Pill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className={cn(
        'mr-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm whitespace-nowrap backdrop-blur',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors hover:border-white/20',
      )}
    >
      <span className={cn('size-1.5 rounded-full bg-current', accent)} />
      <span className="text-foreground/80">{label}</span>
    </span>
  )
}

/**
 * Infinite, frame-rate-independent tech marquee.
 *
 * A single motion value drives the track via `useAnimationFrame`, so motion is
 * smooth regardless of FPS and costs no React re-renders. The track holds two
 * identical groups; each pill carries its gap as a right margin so the groups
 * tile seamlessly — we simply wrap the offset by one group's measured width.
 * Pauses on hover, and honours reduced-motion by standing perfectly still.
 */
export function TechMarquee({ items, className }: { items: string[]; className?: string }) {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const x = useMotionValue(0)
  const [groupRef, { width: groupWidth }] = useMeasure<HTMLDivElement>()
  const [paused, setPaused] = useState(false)

  useAnimationFrame((_, delta) => {
    if (paused || reducedMotion || !groupWidth) return
    let next = x.get() - (delta / 1000) * SPEED
    if (next <= -groupWidth) next += groupWidth
    x.set(next)
  })

  const group = (measured: boolean) => (
    <div ref={measured ? groupRef : undefined} className="flex shrink-0" aria-hidden={!measured}>
      {items.map((label, i) => (
        <Pill key={`${measured ? 'a' : 'b'}-${label}`} label={label} accent={ACCENTS[i % ACCENTS.length]} />
      ))}
    </div>
  )

  return (
    <div
      className={cn(
        'relative w-full max-w-xl overflow-hidden',
        // Fade both edges into the page.
        '[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {group(true)}
        {group(false)}
      </motion.div>
    </div>
  )
}
