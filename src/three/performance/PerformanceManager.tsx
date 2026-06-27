import { useRef } from 'react'
import { PerformanceMonitor } from '@react-three/drei'
import { useExperience } from '@/store/useExperience'
import { QUALITY_ORDER } from '../config'

/**
 * Closes the adaptive-quality loop. drei's {@link PerformanceMonitor} samples
 * the real frame rate and calls `onDecline` when we're consistently missing the
 * target and `onIncline` when there's headroom to spare. We translate those
 * signals into single-step changes of the shared `quality` tier, which every
 * GPU-bound part of the scene reads via {@link QUALITY_PRESETS}.
 *
 * Stepping one tier at a time (rather than jumping straight to `low`) avoids
 * visible quality "pumping", and `onFallback` is the hard floor for machines
 * that simply can't keep up.
 */
export function PerformanceManager() {
  const setQuality = useExperience((s) => s.setQuality)
  // Read the live tier without re-subscribing the component to it.
  const tierRef = useRef(useExperience.getState().quality)

  const step = (dir: 1 | -1) => {
    const i = QUALITY_ORDER.indexOf(tierRef.current)
    const next = QUALITY_ORDER[Math.min(QUALITY_ORDER.length - 1, Math.max(0, i + dir))]
    if (next !== tierRef.current) {
      tierRef.current = next
      setQuality(next)
    }
  }

  return (
    <PerformanceMonitor
      // Hysteresis: require a sustained trend before reacting.
      iterations={5}
      onDecline={() => step(-1)}
      onIncline={() => step(1)}
      // Repeated flip-flopping means we're on the boundary — settle low.
      flipflops={3}
      onFallback={() => {
        tierRef.current = 'low'
        setQuality('low')
      }}
    />
  )
}
