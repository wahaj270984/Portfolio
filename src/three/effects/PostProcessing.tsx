import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'
import { useExperience } from '@/store/useExperience'
import { qualitySettings } from '../config'

/**
 * Post-processing stack, fully gated by the quality tier.
 *
 * On `low` the composer is skipped entirely and the scene renders straight to
 * the screen (cheapest path). Otherwise SMAA + vignette always run (both
 * inexpensive) and bloom — the costly pass — is added only on tiers that opt in
 * via {@link QUALITY_PRESETS}. MSAA sample count is likewise tier-driven.
 */
export function PostProcessing() {
  const quality = useExperience((s) => s.quality)
  const { postprocessing, bloom, msaaSamples } = qualitySettings(quality)

  if (!postprocessing) return null

  return (
    <EffectComposer multisampling={msaaSamples}>
      <SMAA />
      {bloom ? (
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      ) : (
        <></>
      )}
      <Vignette eskil={false} offset={0.25} darkness={0.6} />
    </EffectComposer>
  )
}
