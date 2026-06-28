import { useEffect, useMemo, useRef } from 'react'
import {
  Color,
  MathUtils,
  Object3D,
  type Group,
  type InstancedMesh,
} from 'three'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
import { allSkills } from '@/data/skills'
import { presenceFor } from '../world/presence'

const HOMES = ['skills', 'about']
const ACCENTS = [new Color('#4d8dff'), new Color('#22d3ee'), new Color('#a855f7')]

interface Orb {
  x: number
  y: number
  z: number
  scale: number
  phase: number
}

/** Distribute skills on a Fibonacci sphere so they spread evenly. */
function build(): Orb[] {
  const n = allSkills.length
  const golden = Math.PI * (3 - Math.sqrt(5))
  return allSkills.map((skill, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    const r = 2.3
    return {
      x: Math.cos(theta) * radius * r,
      y: y * r,
      z: Math.sin(theta) * radius * r,
      scale: 0.08 + skill.level * 0.14,
      phase: i * 0.6,
    }
  })
}

/**
 * A constellation of glowing skill orbs orbiting a shared centre — the 3D echo
 * of the DOM skills section. Each orb pulses on its own phase; the whole field
 * cross-fades in around About / Skills.
 */
export function SkillField() {
  // Stable identity: built once, never regenerated (avoids re-uploading the
  // instanced buffers every render). Math.random() inside makes it impure, so
  // the React Compiler can't memoize it for us.
  const data = useMemo(() => build(), [])

  const group = useRef<Group>(null)
  const inst = useRef<InstancedMesh>(null)
  const presence = useRef(0)
  const dummy = useRef(new Object3D()).current

  useEffect(() => {
    const mesh = inst.current
    if (!mesh) return
    data.forEach((_, i) => {
      mesh.setColorAt(i, ACCENTS[i % ACCENTS.length])
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [data])

  useAnimationTick(({ elapsed, delta }) => {
    const { activeSection, hyperdrive } = useExperience.getState()
    const target = presenceFor(activeSection, HOMES)
    presence.current = MathUtils.damp(presence.current, target, 4, delta)
    const p = presence.current

    const mesh = inst.current
    if (!mesh) return
    group.current!.visible = p > 0.01
    if (p <= 0.01) return

    group.current!.rotation.y = elapsed * (hyperdrive ? 0.4 : 0.12)
    const beat = hyperdrive ? 5 : 2.5

    data.forEach((o, i) => {
      const pulse = 0.85 + 0.15 * Math.sin(elapsed * beat + o.phase)
      dummy.position.set(o.x, o.y, o.z)
      dummy.scale.setScalar(o.scale * pulse * MathUtils.lerp(0.2, 1, p))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group} visible={false}>
      <instancedMesh ref={inst} args={[undefined, undefined, data.length]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} fog={false} />
      </instancedMesh>
    </group>
  )
}
