import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  Color,
  MathUtils,
  Object3D,
  type Group,
  type InstancedMesh,
  type LineSegments,
  type MeshBasicMaterial,
} from 'three'
import { useAnimationTick } from '../animation/AnimationManager'
import { useExperience } from '@/store/useExperience'
import { presenceFor } from '../world/presence'

const LAYERS = [4, 7, 7, 5]
const SPREAD_X = 5
const COLOR_BASE = new Color('#1e3a8a')
const COLOR_HOT = new Color('#22d3ee')
const HOMES = ['skills', 'research']

interface NetData {
  nodes: { x: number; y: number; z: number; layer: number }[]
  edges: Float32Array
}

function build(): NetData {
  const nodes: NetData['nodes'] = []
  const layerStart: number[] = []
  LAYERS.forEach((n, li) => {
    layerStart[li] = nodes.length
    const x = MathUtils.lerp(-SPREAD_X / 2, SPREAD_X / 2, li / (LAYERS.length - 1))
    for (let i = 0; i < n; i++) {
      const y = (i - (n - 1) / 2) * 0.85
      const z = Math.sin(i * 1.7 + li) * 0.5
      nodes.push({ x, y, z, layer: li })
    }
  })

  const edgePos: number[] = []
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const a0 = layerStart[li]
    const b0 = layerStart[li + 1]
    for (let a = 0; a < LAYERS[li]; a++) {
      for (let b = 0; b < LAYERS[li + 1]; b++) {
        const na = nodes[a0 + a]
        const nb = nodes[b0 + b]
        edgePos.push(na.x, na.y, na.z, nb.x, nb.y, nb.z)
      }
    }
  }
  return { nodes, edges: new Float32Array(edgePos) }
}

/**
 * Animated MLP-style neural graph: instanced node spheres with a travelling
 * activation pulse across layers, plus additive connection lines. Cross-fades
 * in around the Skills / Research sections via the shared presence helper.
 */
export function NeuralNetwork() {
  // Built once for stable geometry/edge buffers across renders.
  const { nodes, edges } = useMemo(() => build(), [])

  const group = useRef<Group>(null)
  const inst = useRef<InstancedMesh>(null)
  const lines = useRef<LineSegments>(null)
  const presence = useRef(0)

  useEffect(() => {
    const mesh = inst.current
    if (!mesh) return
    const dummy = new Object3D()
    nodes.forEach((n, i) => {
      dummy.position.set(n.x, n.y, n.z)
      dummy.scale.setScalar(0.07)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, COLOR_BASE)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [nodes])

  useAnimationTick(({ elapsed, delta }) => {
    const { activeSection, hyperdrive } = useExperience.getState()
    const target = presenceFor(activeSection, HOMES)
    presence.current = MathUtils.damp(presence.current, target, 4, delta)
    const p = presence.current

    if (group.current) {
      group.current.visible = p > 0.01
      group.current.scale.setScalar(MathUtils.lerp(0.6, 1, p))
      group.current.rotation.y = Math.sin(elapsed * 0.15) * 0.4 + elapsed * 0.02
    }

    const mesh = inst.current
    if (mesh && p > 0.01) {
      const wave = elapsed * (hyperdrive ? 4 : 2)
      const tmp = new Color()
      nodes.forEach((n, i) => {
        const activation = 0.5 + 0.5 * Math.sin(wave - n.layer * 1.2 + n.y)
        tmp.copy(COLOR_BASE).lerp(COLOR_HOT, activation * p)
        mesh.setColorAt(i, tmp)
      })
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    if (lines.current) {
      const mat = lines.current.material as MeshBasicMaterial
      mat.opacity = 0.14 * p
    }
  })

  return (
    <group ref={group} visible={false} position={[0, 0, -1]}>
      <instancedMesh ref={inst} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} fog={false} />
      </instancedMesh>

      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4d8dff"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </lineSegments>
    </group>
  )
}
