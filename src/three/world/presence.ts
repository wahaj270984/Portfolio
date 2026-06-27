import { sectionOrder } from '@/config/navigation'

/** Index of a section id in scroll order (0 if unknown/null). */
export function sectionIndex(id: string | null): number {
  if (!id) return 0
  const i = sectionOrder.indexOf(id)
  return i < 0 ? 0 : i
}

/**
 * Target presence (0..1) for a motif "homed" on a set of sections: 1 when the
 * active section is one of its homes, falling off smoothly for neighbours so
 * motifs cross-fade as you travel rather than popping. Used inside ticks with
 * `MathUtils.damp` for frame-rate-independent smoothing.
 */
export function presenceFor(activeId: string | null, homes: string[]): number {
  const active = sectionIndex(activeId)
  let best = 0
  for (const home of homes) {
    const dist = Math.abs(sectionIndex(home) - active)
    const p = dist === 0 ? 1 : dist === 1 ? 0.35 : 0
    best = Math.max(best, p)
  }
  return best
}
