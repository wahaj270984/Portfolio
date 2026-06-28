import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * Full-screen boot overlay with simulated load progress. Fades out after
 * a brief delay to let the neural background initialize.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const duration = 1500
    const steps = 60
    const increment = 100 / steps
    const interval = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= 100) {
        setProgress(100)
        clearInterval(timer)
        // Hold briefly then fade out
        setTimeout(() => setVisible(false), 400)
      } else {
        setProgress(current)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  const active = progress < 100

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center gap-6',
        'bg-background transition-opacity duration-500',
        active ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!active}
    >
      <span className="font-heading text-lg tracking-tight">{site.name}</span>
      <div className="h-px w-48 overflow-hidden bg-border">
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
