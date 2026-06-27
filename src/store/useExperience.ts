import { create } from 'zustand'

export type QualityTier = 'low' | 'medium' | 'high'

/**
 * Shared bridge between the DOM/scroll layer and the R3F scene.
 *
 * Lenis + GSAP ScrollTrigger write `scrollProgress` / `activeSection`; the
 * camera rig and DOM reveals read from here. GPU tier + reduced-motion gate
 * the heavy post-processing / shader work.
 */
interface ExperienceState {
  scrollProgress: number // 0..1 across the whole page
  activeSection: string | null
  quality: QualityTier
  reducedMotion: boolean
  useR3FHero: boolean // false = Spline hero, true = native R3F hero
  /** Konami / terminal easter-egg state: amps up the 3D world when on. */
  hyperdrive: boolean

  setScrollProgress: (value: number) => void
  setActiveSection: (id: string | null) => void
  setQuality: (tier: QualityTier) => void
  setReducedMotion: (value: boolean) => void
  setUseR3FHero: (value: boolean) => void
  toggleHyperdrive: () => void
}

export const useExperience = create<ExperienceState>((set) => ({
  scrollProgress: 0,
  activeSection: null,
  quality: 'high',
  reducedMotion: false,
  useR3FHero: true,
  hyperdrive: false,

  setScrollProgress: (value) => set({ scrollProgress: value }),
  setActiveSection: (id) => set({ activeSection: id }),
  setQuality: (tier) => set({ quality: tier }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setUseR3FHero: (value) => set({ useR3FHero: value }),
  toggleHyperdrive: () => set((s) => ({ hyperdrive: !s.hyperdrive })),
}))
