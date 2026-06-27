import { Button, type ButtonProps } from './button'
import { useMagnetic } from '@/hooks'
import { cn } from '@/lib/utils'

export interface MagneticButtonProps extends ButtonProps {
  /** Magnetic pull strength (0..1). */
  strength?: number
}

/**
 * A {@link Button} that drifts toward the cursor on hover. The magnetic motion
 * lives on a wrapping span (so it works regardless of how Button forwards refs)
 * and is automatically disabled under reduced motion / touch.
 */
export function MagneticButton({
  strength = 0.4,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLSpanElement>(strength)
  return (
    <span
      ref={ref}
      className="inline-flex transition-transform duration-300 ease-out [will-change:transform]"
      data-cursor="hover"
    >
      <Button className={cn(className)} {...props} />
    </span>
  )
}
