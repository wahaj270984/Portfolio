import type { QualityTier } from '@/store/useExperience'

/**
 * Per-tier rendering budget. Everything GPU-expensive in the scene reads its
 * settings from here so a single quality value (set by the user or stepped
 * automatically by the {@link PerformanceManager}) consistently scales DPR,
 * shadows, environment resolution and post-processing across the whole app.
 */
export interface QualitySettings {
  /** Clamp range for the canvas device-pixel-ratio. */
  dpr: [number, number]
  /** Master toggle for the post-processing composer. */
  postprocessing: boolean
  /** Enable the (expensive) bloom pass. */
  bloom: boolean
  /** MSAA sample count for the composer (0 disables, relies on SMAA). */
  msaaSamples: number
  /** Cube-render resolution for the procedural environment. */
  envResolution: number
  /** Texture resolution for the soft contact shadow. */
  contactShadowResolution: number
  /** Geometry detail level for procedural meshes (icosa subdivisions). */
  geometryDetail: number
}

export const QUALITY_PRESETS: Record<QualityTier, QualitySettings> = {
  low: {
    dpr: [1, 1],
    postprocessing: false,
    bloom: false,
    msaaSamples: 0,
    envResolution: 64,
    contactShadowResolution: 256,
    geometryDetail: 3,
  },
  medium: {
    dpr: [1, 1.5],
    postprocessing: true,
    bloom: false,
    msaaSamples: 2,
    envResolution: 128,
    contactShadowResolution: 512,
    geometryDetail: 6,
  },
  high: {
    dpr: [1, 2],
    postprocessing: true,
    bloom: true,
    msaaSamples: 4,
    envResolution: 256,
    contactShadowResolution: 1024,
    geometryDetail: 12,
  },
}

export function qualitySettings(tier: QualityTier): QualitySettings {
  return QUALITY_PRESETS[tier]
}

/** Tier ordering used for stepping quality up/down under load. */
export const QUALITY_ORDER: QualityTier[] = ['low', 'medium', 'high']
