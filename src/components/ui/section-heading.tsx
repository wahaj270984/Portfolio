import { type ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "03". */
  index?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/** Consistent section header: index + eyebrow, large gradient title, blurb. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal from="up">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {index && <span className="text-muted-foreground">{index}</span>}
          <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal from="up" delay={1}>
        <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal from="up" delay={2}>
          <p
            className={cn(
              'max-w-2xl text-base text-muted-foreground md:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
