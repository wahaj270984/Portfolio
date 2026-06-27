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

// One cinematic stop per section (scroll order). The rig orbits the origin at
// varying height/angle so scrolling reads as travelling through one world.
const STOPS: [number, number, number][] = [
  [0, 0, 6], // hero
  [-2.5, 0.8, 5.2], // about
  [2.6, 1.2, 5], // skills
  [3.2, -0.6, 4.8], // projects
  [-3.2, -0.4, 5], // experience
  [-1.4, 1.6, 4.4], // research
  [2.0, 1.0, 5.4], // education
  [0.4, -1.4, 5.6], // achievements
  [-2.2, 0.2, 5.2], // certifications
  [0, 0.6, 4.4], // contact
]

const WAYPOINTS: Waypoint[] = STOPS.map((pos, i) => ({
  at: i / (STOPS.length - 1),
  pos,
  look: [0, 0, 0],
}))

// Where the camera flies in *from* on first load.
const INTRO_POS: [number, number, number] = [0, 2.4, 15]
const INTRO_SECONDS = 2.6

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
  const introStart = useRef(new Vector3(...INTRO_POS)).current
  const intro = useRef(0)

  // Priority 100: run after object animations so the camera reads final state.
  useAnimationTick(({ state, delta, elapsed }) => {
    const { scrollProgress, reducedMotion } = useExperience.getState()

    samplePath(scrollProgress, targetPos, targetLook)

    // Cinematic fly-in: ease the target from a pushed-back start to the path.
    if (intro.current < 1) {
      intro.current = Math.min(intro.current + delta / INTRO_SECONDS, 1)
      const e = 1 - Math.pow(1 - intro.current, 3) // easeOutCubic
      targetPos.lerpVectors(introStart, targetPos, e)
    }

    if (!reducedMotion) {
      // Idle vertical float + pointer parallax for a sense of life (scaled in
      // once the intro settles so it doesn't fight the fly-in).
      const life = intro.current
      targetPos.y += Math.sin(elapsed * 0.6) * FLOAT_AMPLITUDE * life
      targetPos.x += state.pointer.x * PARALLAX * life
      targetPos.y += state.pointer.y * PARALLAX * life
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
