import { useRef } from 'react'
import { AdditiveBlending, type Points } from 'three'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
// Reuse the registered <starsMaterial> element + its type from Starfield.
import { StarsMaterial } from './Starfield'

interface Buffers {
  positions: Float32Array
  scales: Float32Array
  phases: Float32Array
  count: number
}

function generate(count: number): Buffers {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    scales[i] = 0.3 + Math.random() * 0.9
    phases[i] = Math.random()
  }
  return { positions, scales, phases, count }
}

/**
 * Foreground dust motes drifting near the camera — adds parallax depth between
 * the viewer and the hero object. Cheap: a slow group rotation + vertical bob,
 * no per-particle CPU updates.
 */
export function Dust() {
  const quality = useExperience((s) => s.quality)
  const count = quality === 'low' ? 120 : quality === 'medium' ? 240 : 360

  const buffers = useRef<Buffers>(null)
  if (!buffers.current || buffers.current.count !== count) {
    buffers.current = generate(count)
  }
  const { positions, scales, phases } = buffers.current

  const ref = useRef<Points>(null)
  const matRef = useRef<InstanceType<typeof StarsMaterial>>(null)

  useAnimationTick(({ elapsed }) => {
    if (matRef.current) matRef.current.uTime = elapsed
    const pts = ref.current
    if (pts) {
      pts.rotation.y = elapsed * 0.03
      pts.position.y = Math.sin(elapsed * 0.2) * 0.4
    }
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <starsMaterial
        ref={matRef}
        uSize={6}
        uColor={[0.45, 0.7, 1]}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        fog={false}
      />
    </points>
  )
}
