import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import { useExperience } from '@/store/useExperience'
import { useAnimationTick } from '../animation/AnimationManager'

/**
 * Scroll-driven camera manager.
 *
 * A list of waypoints defines where the camera sits and looks at given points
 * in the page's scroll progress (0 → 1). Each frame the rig samples the path at
 * the current `scrollProgress`, layers in a subtle idle float and pointer
 * parallax, then critically-damps the real camera toward that target so motion
 * stays smooth regardless of frame rate.
 *
 * Everything reads from the experience store via `getState()` inside the tick,
 * so the rig never triggers React re-renders — it just nudges the camera.
 */

interface Waypoint {
  /** Scroll progress this waypoint anchors to, 0..1. */
  at: number
  /** Camera position. */
  pos: [number, number, number]
  /** Point the camera looks at. */
  look: [number, number, number]
}

const WAYPOINTS: Waypoint[] = [
  { at: 0, pos: [0, 0, 6], look: [0, 0, 0] },
  { at: 1, pos: [2.5, 1.2, 5], look: [0, 0, 0] },
]

// Higher = snappier follow. Damping is frame-rate independent.
const POSITION_LAMBDA = 3
const LOOK_LAMBDA = 4
const PARALLAX = 0.4
const FLOAT_AMPLITUDE = 0.15

/** Linearly sample the waypoint path at `progress`, writing into `out*`. */
function samplePath(progress: number, outPos: Vector3, outLook: Vector3) {
  const p = MathUtils.clamp(progress, 0, 1)

  let a = WAYPOINTS[0]
  let b = WAYPOINTS[WAYPOINTS.length - 1]
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i].at && p <= WAYPOINTS[i + 1].at) {
      a = WAYPOINTS[i]
      b = WAYPOINTS[i + 1]
      break
    }
  }

  const span = b.at - a.at
  const t = span <= 0 ? 0 : (p - a.at) / span

  outPos.set(
    MathUtils.lerp(a.pos[0], b.pos[0], t),
    MathUtils.lerp(a.pos[1], b.pos[1], t),
    MathUtils.lerp(a.pos[2], b.pos[2], t),
  )
  outLook.set(
    MathUtils.lerp(a.look[0], b.look[0], t),
    MathUtils.lerp(a.look[1], b.look[1], t),
    MathUtils.lerp(a.look[2], b.look[2], t),
  )
}

export function CameraRig() {
  // Scratch vectors, allocated once and reused every frame (no GC churn).
  const targetPos = useRef(new Vector3()).current
  const targetLook = useRef(new Vector3()).current
  const dampedLook = useRef(new Vector3(0, 0, 0)).current

  // Priority 100: run after object animations so the camera reads final state.
  useAnimationTick(({ state, delta, elapsed }) => {
    const { scrollProgress, reducedMotion } = useExperience.getState()

    samplePath(scrollProgress, targetPos, targetLook)

    if (!reducedMotion) {
      // Idle vertical float + pointer parallax for a sense of life.
      targetPos.y += Math.sin(elapsed * 0.6) * FLOAT_AMPLITUDE
      targetPos.x += state.pointer.x * PARALLAX
      targetPos.y += state.pointer.y * PARALLAX
    }

    const cam = state.camera
    cam.position.x = MathUtils.damp(cam.position.x, targetPos.x, POSITION_LAMBDA, delta)
    cam.position.y = MathUtils.damp(cam.position.y, targetPos.y, POSITION_LAMBDA, delta)
    cam.position.z = MathUtils.damp(cam.position.z, targetPos.z, POSITION_LAMBDA, delta)

    dampedLook.x = MathUtils.damp(dampedLook.x, targetLook.x, LOOK_LAMBDA, delta)
    dampedLook.y = MathUtils.damp(dampedLook.y, targetLook.y, LOOK_LAMBDA, delta)
    dampedLook.z = MathUtils.damp(dampedLook.z, targetLook.z, LOOK_LAMBDA, delta)
    cam.lookAt(dampedLook)
  }, 100)

  return null
}
