import { useEffect } from 'react'
import { useExperience } from '@/store/useExperience'
import { setAnimationsPaused } from '../animation/AnimationManager'
import { SceneEnvironment } from '../environment/SceneEnvironment'
import { Lighting } from '../lighting/Lighting'
import { CameraRig } from '../rig/CameraRig'
import { WorldRoot } from '../world/WorldRoot'
import { PostProcessing } from '../effects/PostProcessing'

/**
 * Composition root for everything inside the persistent `<Canvas>`.
 *
 * Order of concerns:
 *   1. atmosphere — light exponential fog tints depth toward the background,
 *   2. environment + lights — image-based reflections and directional shape,
 *   3. camera rig — scroll/parallax-driven camera (renders no geometry),
 *   4. world — the cohesive 3D universe (background + section motifs),
 *   5. post — the effect composer, last so it captures the full frame.
 *
 * Reduced-motion preference is bridged here into the animation manager, which
 * freezes every registered tick at once.
 */
export function Scene() {
  const reducedMotion = useExperience((s) => s.reducedMotion)

  useEffect(() => {
    setAnimationsPaused(reducedMotion)
    return () => setAnimationsPaused(false)
  }, [reducedMotion])

  return (
    <>
      {/* Light fog for depth without swallowing the nebula backdrop. */}
      <fogExp2 attach="fog" args={['#05070e', 0.02]} />

      <SceneEnvironment />
      <Lighting />
      <CameraRig />

      <WorldRoot />

      <PostProcessing />
    </>
  )
}
