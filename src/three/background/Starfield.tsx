import { useMemo, useRef } from 'react'
import { AdditiveBlending, type Points } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, type ThreeElement } from '@react-three/fiber'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
import { qualitySettings } from '../config'

/** Round, depth-attenuated, twinkling point sprites. */
export const StarsMaterial = shaderMaterial(
  { uTime: 0, uSize: 5.5, uColor: [0.7, 0.85, 1] },
  /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    attribute float aScale;
    attribute float aPhase;
    varying float vTwinkle;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mv;
      vTwinkle = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase * 6.2831);
      gl_PointSize = uSize * aScale * (320.0 / -mv.z);
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    varying float vTwinkle;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      float d = length(c);
      float alpha = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(uColor * (0.6 + vTwinkle), alpha * vTwinkle);
    }
  `,
)

extend({ StarsMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    starsMaterial: ThreeElement<typeof StarsMaterial>
  }
}

interface Buffers {
  positions: Float32Array
  scales: Float32Array
  phases: Float32Array
  count: number
}

/** Generate stars in a spherical shell (kept stable across renders via a ref). */
function generate(count: number): Buffers {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // Uniform direction on a sphere, radius in a shell.
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = 12 + Math.random() * 22
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    scales[i] = 0.4 + Math.random() * 1.6
    phases[i] = Math.random()
  }
  return { positions, scales, phases, count }
}

export function Starfield() {
  const quality = useExperience((s) => s.quality)
  const count = quality === 'low' ? 1400 : quality === 'medium' ? 2600 : 4200

  // Regenerated only when the quality-driven count changes.
  const { positions, scales, phases } = useMemo(() => generate(count), [count])

  const pointsRef = useRef<Points>(null)
  const matRef = useRef<InstanceType<typeof StarsMaterial>>(null)

  useAnimationTick(({ elapsed }) => {
    if (matRef.current) matRef.current.uTime = elapsed
    const pts = pointsRef.current
    if (pts) {
      const { hyperdrive } = useExperience.getState()
      pts.rotation.y = elapsed * (hyperdrive ? 0.05 : 0.012)
      pts.rotation.x = Math.sin(elapsed * 0.05) * 0.05
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <starsMaterial
        ref={matRef}
        uSize={qualitySettings(quality).dpr[1] * 3.2}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        fog={false}
      />
    </points>
  )
}
