import { useEffect } from 'react'
import { ContactShadows } from '@react-three/drei'
import { useExperience } from '@/store/useExperience'
import { qualitySettings } from '../config'
import { setAnimationsPaused } from '../animation/AnimationManager'
import { SceneEnvironment } from '../environment/SceneEnvironment'
import { Lighting } from '../lighting/Lighting'
import { CameraRig } from '../rig/CameraRig'
import { TestObject } from '../objects/TestObject'
import { PostProcessing } from '../effects/PostProcessing'

/**
 * Composition root for everything that lives inside the persistent `<Canvas>`.
 *
 * Order of concerns:
 *   1. atmosphere — exponential fog tints depth and hides the far plane,
 *   2. environment + lights — image-based reflections and directional shape,
 *   3. camera rig — scroll/parallax-driven camera (renders no geometry),
 *   4. content — the section objects (just the test object for now),
 *   5. grounding — a soft contact shadow,
 *   6. post — the effect composer, last so it captures the full frame.
 *
 * Reduced-motion preference is bridged here into the animation manager, which
 * freezes every registered tick at once.
 */
export function Scene() {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const quality = useExperience((s) => s.quality)
  const { contactShadowResolution } = qualitySettings(quality)

  useEffect(() => {
    setAnimationsPaused(reducedMotion)
    return () => setAnimationsPaused(false)
  }, [reducedMotion])

  return (
    <>
      <fogExp2 attach="fog" args={['#05060a', 0.06]} />

      <SceneEnvironment />
      <Lighting />
      <CameraRig />

      <TestObject />

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={5}
        resolution={contactShadowResolution}
        color="#000000"
      />

      <PostProcessing />
    </>
  )
}
