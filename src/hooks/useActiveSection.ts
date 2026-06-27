import { useEffect } from 'react'
import { sectionOrder } from '@/config/navigation'
import { useExperience } from '@/store/useExperience'

/**
 * Tracks which section is centred in the viewport and writes its id into the
 * experience store. The 3D `WorldDirector` and the nav scrollspy both key off
 * `activeSection`. Uses a single IntersectionObserver and keeps a visibility
 * map so the *most* visible section wins (not just the last to cross a line).
 */
export function useActiveSection() {
  const setActiveSection = useExperience((s) => s.setActiveSection)

  useEffect(() => {
    const els = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (els.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActiveSection(best)
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], rootMargin: '-10% 0px -10% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [setActiveSection])
}
