import { useRef } from 'react'
import { BackSide } from 'three'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
import { NebulaMaterial } from '../shaders/nebula/NebulaMaterial'

/**
 * Deep-space backdrop: the nebula shader on a large inward-facing sphere. It
 * surrounds the entire scene so it fills the view from every camera angle. The
 * shader animates slowly; intensity lifts in hyperdrive.
 */
export function Nebula() {
  const matRef = useRef<InstanceType<typeof NebulaMaterial>>(null)
  // Drop the expensive second turbulence pass on the low tier.
  const quality = useExperience((s) => s.quality)
  const detail = quality === 'low' ? 0 : 1

  useAnimationTick(({ elapsed }) => {
    const mat = matRef.current
    if (!mat) return
    mat.uTime = elapsed
    const { hyperdrive } = useExperience.getState()
    mat.uIntensity += (((hyperdrive ? 1.9 : 1.0) - mat.uIntensity)) * 0.05
  })

  return (
    <mesh scale={40} frustumCulled={false}>
      <sphereGeometry args={[1, 48, 32]} />
      <nebulaMaterial ref={matRef} uDetail={detail} side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  )
}
