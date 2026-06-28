import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'
import { site } from '@/config/site'
import { useExperience } from '@/store/useExperience'
import { cn } from '@/lib/utils'

// Code-split: the Spline runtime (~heavy) only loads when the hero needs it.
const Spline = lazy(() => import('@splinetool/react-spline'))

// If the scene hasn't reported `onLoad` by now, assume it won't and fall back to
// the native R3F core so the hero is never left empty.
const LOAD_TIMEOUT_MS = 10_000

/**
 * Interactive Spline scene that serves as the landing centerpiece.
 *
 * It renders as an ambient, full-bleed layer behind the hero copy. The scene is
 * lazy-loaded so its runtime never blocks first paint, fades in with Framer
 * Motion once ready, and — crucially — degrades gracefully: any load/runtime
 * failure, a slow/dead scene URL, or a reduced-motion preference flips the
 * experience store back to the native R3F hero core so the landing always has a
 * centerpiece.
 *
 * pointer-events stay off so the scene animates ambiently without ever stealing
 * clicks from the hero CTAs layered on top.
 */
export function SplineHero({ className }: { className?: string }) {
  const useR3FHero = useExperience((s) => s.useR3FHero)
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const setUseR3FHero = useExperience((s) => s.setUseR3FHero)
  const [ready, setReady] = useState(false)

  const active = !useR3FHero && !reducedMotion && Boolean(site.splineHeroUrl)

  // Safety net: bail to the R3F core if the scene never finishes loading.
  useEffect(() => {
    if (!active || ready) return
    const id = window.setTimeout(() => setUseR3FHero(true), LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [active, ready, setUseR3FHero])

  // R3F core requested, motion reduced, or no scene configured → defer entirely.
  if (!active) return null

  const fallBackToR3F = () => setUseR3FHero(true)

  return (
    <ErrorBoundary fallbackRender={() => null} onError={fallBackToR3F}>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden',
          // Soft radial mask so the scene melts into the page rather than
          // sitting in a hard rectangle.
          '[mask-image:radial-gradient(120%_120%_at_60%_45%,#000_55%,transparent_100%)]',
          className,
        )}
        aria-hidden
      >
        <Suspense fallback={null}>
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Spline
              scene={site.splineHeroUrl}
              onLoad={() => setReady(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
