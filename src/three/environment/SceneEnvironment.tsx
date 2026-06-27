import { Environment, Lightformer } from '@react-three/drei'
import { useExperience } from '@/store/useExperience'
import { qualitySettings } from '../config'

/**
 * Image-based lighting for the scene — built procedurally from
 * {@link Lightformer} emitters rather than a downloaded HDRI. That keeps the
 * app fully self-contained (no network fetch, no CORS surprises) while still
 * giving materials something interesting to reflect.
 *
 * `frames={1}` bakes the environment cube map once instead of every frame; the
 * emitters are static, so re-rendering it continuously would be wasted GPU.
 * Resolution scales with the quality tier.
 */
export function SceneEnvironment() {
  const quality = useExperience((s) => s.quality)
  const { envResolution } = qualitySettings(quality)

  return (
    <Environment frames={1} resolution={envResolution} background={false}>
      {/* Soft overhead key reflection. */}
      <Lightformer
        intensity={1.4}
        color="#ffffff"
        position={[0, 5, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      />
      {/* Cool side accent. */}
      <Lightformer
        intensity={2}
        color="#22d3ee"
        position={[-5, 1, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 4, 1]}
      />
      {/* Warm rim accent on the opposite side. */}
      <Lightformer
        intensity={1.6}
        color="#f59e0b"
        position={[5, 0, 1]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6, 4, 1]}
      />
    </Environment>
  )
}
