import { type PointerEvent, type ReactNode } from 'react'
import { Container } from '@/components/ui/container'
import { SectionGlow } from '@/components/background/SectionGlow'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Full-viewport-height section (hero/contact). */
  full?: boolean
  /** Disable the inner container (section manages its own width). */
  bare?: boolean
  /** Interactive ambient backdrop. Defaults on for non-bare sections. */
  fx?: boolean
  'aria-label'?: string
}

/**
 * Semantic section wrapper with consistent rhythm. Transparent by design so the
 * persistent 3D canvas shows through behind the content. Non-bare sections get
 * an interactive ambient backdrop (drifting grid + cursor spotlight) — the
 * section publishes the pointer position as --mx/--my for {@link SectionGlow} to
 * read, and lifts its content above the glow on a `z-10` layer.
 */
export function Section({ id, children, className, full, bare, fx, ...rest }: SectionProps) {
  const showGlow = fx ?? !bare

  const onPointerMove = showGlow
    ? (e: PointerEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
      }
    : undefined

  const inner = bare ? children : <Container className="relative z-10">{children}</Container>

  return (
    <section
      id={id}
      onPointerMove={onPointerMove}
      className={cn(
        'relative w-full',
        showGlow && 'group/section',
        full ? 'flex min-h-svh flex-col justify-center py-28' : 'py-24 md:py-32',
        className,
      )}
      {...rest}
    >
      {showGlow && <SectionGlow />}
      {inner}
    </section>
  )
}
