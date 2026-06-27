import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * Full-screen boot overlay driven by drei's asset-loading progress. Fades out
 * and unmounts once the scene's assets finish loading.
 */
export function Preloader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (active) return
    // Hold briefly so the fade-out reads, then unmount.
    const id = window.setTimeout(() => setVisible(false), 600)
    return () => window.clearTimeout(id)
  }, [active])

  if (!visible) return null

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
