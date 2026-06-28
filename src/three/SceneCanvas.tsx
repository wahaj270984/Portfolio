import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import { useExperience } from '@/store/useExperience'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { qualitySettings } from './config'
import { AnimationRunner } from './animation/AnimationManager'
import { PerformanceManager } from './performance/PerformanceManager'
import { Scene } from './scene/Scene'

/**
 * The single, persistent R3F canvas that lives behind the DOM for the entire
 * app lifetime. Section objects mount into it and animate off shared scroll
 * state — the canvas itself is never remounted.
 *
 * This component owns only the canvas-level concerns: DPR/quality gating, the
 * tone-mapping + colour pipeline, the global animation loop and the adaptive
 * performance helpers. The actual scene graph lives in {@link Scene}.
 */
export function SceneCanvas() {
  const quality = useExperience((s) => s.quality)
  const { dpr } = qualitySettings(quality)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <CanvasErrorBoundary>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
          gl={{
            antialias: false, // SMAA in the post stack handles AA
            powerPreference: 'high-performance',
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
        >
          {/* Adaptive quality: sample FPS and step the tier up/down. */}
          <PerformanceManager />
          {/* Single frame loop driving every registered animation tick. */}
          <AnimationRunner />

          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>

          {/* Drop DPR while moving, throttle raycasts under load. */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
