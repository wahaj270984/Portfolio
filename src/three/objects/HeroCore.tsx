import { useRef } from 'react'
import { Color, MathUtils, type Group, type Mesh } from 'three'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
import { qualitySettings } from '../config'
import { HolographicMaterial } from '../shaders/holographic/HolographicMaterial'

// Stable uniform colours (violet core → cyan rim).
const COLOR_A = new Color('#7c3aed')
const COLOR_B = new Color('#22d3ee')

/**
 * The landing centerpiece: a holographic energy core (animated Fresnel shader)
 * inside a counter-rotating wireframe shell, ringed by three orbiting bands.
 * Always present as the world's anchor, but it recedes and slows once the
 * viewer scrolls past the hero so later sections breathe.
 */
export function HeroCore() {
  const quality = useExperience((s) => s.quality)
  const detail = Math.max(2, Math.round(qualitySettings(quality).geometryDetail / 3))

  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const shell = useRef<Mesh>(null)
  const rings = useRef<Group>(null)
  const matRef = useRef<InstanceType<typeof HolographicMaterial>>(null)

  useAnimationTick(({ elapsed, delta }) => {
    const { scrollProgress, hyperdrive } = useExperience.getState()
    const speed = hyperdrive ? 2.4 : 1

    if (matRef.current) matRef.current.uTime = elapsed * speed
    if (core.current) {
      core.current.rotation.y = elapsed * 0.25 * speed
      core.current.rotation.x = Math.sin(elapsed * 0.3) * 0.25
    }
    if (shell.current) {
      shell.current.rotation.y = -elapsed * 0.18 * speed
      shell.current.rotation.z = elapsed * 0.06
    }
    if (rings.current) rings.current.rotation.z = elapsed * 0.2 * speed

    // Recede as the page scrolls away from the hero.
    if (group.current) {
      const target = MathUtils.lerp(1, 0.55, MathUtils.clamp(scrollProgress * 3, 0, 1))
      const s = MathUtils.damp(group.current.scale.x, target, 3, delta)
      group.current.scale.setScalar(s)
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        MathUtils.lerp(0, -2.5, MathUtils.clamp(scrollProgress * 3, 0, 1)),
        3,
        delta,
      )
    }
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, detail]} />
        <holographicMaterial
          ref={matRef}
          uColorA={COLOR_A}
          uColorB={COLOR_B}
          uFresnelPower={2.2}
          transparent
        />
      </mesh>

      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe color="#4d8dff" transparent opacity={0.18} fog={false} />
      </mesh>

      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.7, i * 0.5, 0]} scale={1.9 + i * 0.35}>
            <torusGeometry args={[1, 0.012, 12, 90]} />
            <meshBasicMaterial
              color={i === 1 ? '#22d3ee' : i === 2 ? '#a855f7' : '#4d8dff'}
              transparent
              opacity={0.5}
              fog={false}
            />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 0, 0]} intensity={6} distance={6} decay={2} color="#4d8dff" />
    </group>
  )
}
