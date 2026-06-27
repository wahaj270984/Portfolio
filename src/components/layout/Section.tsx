import { type ReactNode } from 'react'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Full-viewport-height section (hero/contact). */
  full?: boolean
  /** Disable the inner container (section manages its own width). */
  bare?: boolean
  'aria-label'?: string
}

/**
 * Semantic section wrapper with consistent rhythm. Transparent by design so the
 * persistent 3D canvas shows through behind the content.
 */
export function Section({ id, children, className, full, bare, ...rest }: SectionProps) {
  const inner = bare ? children : <Container>{children}</Container>
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        full ? 'flex min-h-svh flex-col justify-center py-28' : 'py-24 md:py-32',
        className,
      )}
      {...rest}
    >
      {inner}
    </section>
  )
}
