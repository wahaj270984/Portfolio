import { cn } from '@/lib/utils'

/** Centered, max-width content column with responsive gutters. */
export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-6xl px-6 md:px-8', className)}
      {...props}
    />
  )
}