import { useRef } from 'react'
import type { Mesh } from 'three'
import { useExperience } from '@/store/useExperience'
import { useAnimationTick } from '../animation/AnimationManager'
import { qualitySettings } from '../config'
import {
  HolographicMaterial,
} from '../shaders/holographic/HolographicMaterial'

/**
 * The single object in the verification scene. It deliberately exercises every
 * subsystem at once so a glance confirms the pipeline is healthy:
 *
 *  - the **custom GLSL material** (Fresnel + animated bands),
 *  - the **animation manager** (rotation + `uTime` driven from a registered
 *    tick, priority 0 so the camera rig at priority 100 reacts to it),
 *  - **quality scaling** (geometry subdivisions track the tier),
 *  - and, via the surrounding scene, lighting, environment reflections and the
 *    bloom pass picking up the bright Fresnel rim.
 */
export function TestObject() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<InstanceType<typeof HolographicMaterial>>(null)

  const quality = useExperience((s) => s.quality)
  const { geometryDetail } = qualitySettings(quality)

  useAnimationTick(({ elapsed }) => {
    const mesh = meshRef.current
    if (mesh) {
      mesh.rotation.y = elapsed * 0.4
      mesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2
    }
    if (materialRef.current) materialRef.current.uTime = elapsed
  }, 0)

  return (
    <mesh ref={meshRef} position={[0, 0.25, 0]}>
      <icosahedronGeometry args={[1.2, geometryDetail]} />
      <holographicMaterial ref={materialRef} />
    </mesh>
  )
}
