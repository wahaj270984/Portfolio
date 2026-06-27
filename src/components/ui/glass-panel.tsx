import { type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassVariants = cva('relative rounded-2xl transition-colors', {
  variants: {
    tone: {
      default: 'glass',
      strong: 'glass-strong',
    },
    glow: {
      none: '',
      primary: 'ring-glow',
    },
    pad: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: { tone: 'default', glow: 'none', pad: 'md' },
})

export interface GlassPanelProps
  extends ComponentProps<'div'>,
    VariantProps<typeof glassVariants> {}

/** Frosted glass surface — the base material for cards, panels and consoles. */
export function GlassPanel({ className, tone, glow, pad, ...props }: GlassPanelProps) {
  return <div className={cn(glassVariants({ tone, glow, pad, className }))} {...props} />
}
