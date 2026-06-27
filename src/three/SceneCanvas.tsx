import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useExperience } from '@/store/useExperience'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'

/**
 * The single, persistent R3F canvas that lives behind the DOM for the entire
 * app lifetime. Section objects mount into it later and animate off shared
 * scroll state — the canvas itself is never remounted.
 *
 * Phase-1 scope: scene graph shell only (camera, lights, perf + adaptive
 * quality gates, a placeholder mesh). Post-processing and section objects
 * arrive in later phases.
 */
export function SceneCanvas() {
  const quality = useExperience((s) => s.quality)
  const maxDpr = quality === 'high' ? 2 : quality === 'medium' ? 1.5 : 1

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, maxDpr]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          {import.meta.env.DEV && <Perf position="bottom-left" />}

          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.2} />

          <Suspense fallback={null}>
            <Placeholder />
            <Preload all />
          </Suspense>

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}

/** Temporary "scene is alive" marker — removed once real sections land. */
function Placeholder() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#aa3bff" wireframe />
    </mesh>
  )
}
