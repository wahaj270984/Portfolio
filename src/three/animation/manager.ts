import { useEffect, useRef } from 'react'
import type { RootState } from '@react-three/fiber'

/**
 * Centralised per-frame animation system (registry + hook).
 *
 * Instead of every object owning its own `useFrame`, components register a tick
 * with {@link useAnimationTick}. A single `AnimationRunner` drives them all from
 * one frame loop, which gives the scene three things React's scattered
 * `useFrame` callbacks can't easily share:
 *
 *  - **Global pause / time-scale** — honour `prefers-reduced-motion` or pause
 *    when the tab is hidden by flipping one switch, not N effects.
 *  - **Deterministic ordering** — ticks run in ascending `priority`, so the
 *    camera rig (high priority) always reads object transforms after they've
 *    been updated this frame.
 *  - **A monotonic, time-scaled clock** — `elapsed` respects the time-scale, so
 *    slow-motion / fast-forward affect every animation uniformly.
 *
 * This file is component-free on purpose; the `AnimationRunner` component that
 * consumes {@link runTicks} lives in its own module.
 */

export interface AnimationContext {
  /** The live R3F root state (camera, gl, pointer, …). */
  state: RootState
  /** Time-scaled delta for this frame, in seconds. */
  delta: number
  /** Time-scaled elapsed time since the first frame, in seconds. */
  elapsed: number
}

export type AnimationTick = (ctx: AnimationContext) => void

interface Entry {
  id: number
  tick: AnimationTick
  priority: number
}

const entries: Entry[] = []
let nextId = 1
let timeScale = 1
let paused = false
let elapsed = 0

function register(tick: AnimationTick, priority: number): () => void {
  const id = nextId++
  entries.push({ id, tick, priority })
  entries.sort((a, b) => a.priority - b.priority)
  return () => {
    const i = entries.findIndex((e) => e.id === id)
    if (i !== -1) entries.splice(i, 1)
  }
}

/** Pause/resume every registered animation (e.g. on reduced-motion). */
export function setAnimationsPaused(value: boolean) {
  paused = value
}

/** Globally scale animation speed (1 = normal, 0 freezes, 2 = double-time). */
export function setAnimationTimeScale(value: number) {
  timeScale = value
}

/**
 * Advance the clock and run every registered tick once. Called by
 * `AnimationRunner` from inside a single `useFrame`.
 */
export function runTicks(state: RootState, rawDelta: number) {
  if (paused || entries.length === 0) return
  // Clamp delta so a stall (tab refocus, GC) can't teleport animations.
  const delta = Math.min(rawDelta, 1 / 30) * timeScale
  elapsed += delta
  const ctx: AnimationContext = { state, delta, elapsed }
  for (let i = 0; i < entries.length; i++) entries[i].tick(ctx)
}

/**
 * Register a per-frame callback for the lifetime of the calling component.
 *
 * The latest closure is always invoked (kept in a ref synced via an effect), so
 * the callback can freely read fresh props/state without re-subscribing every
 * render — only `priority` changes re-register.
 */
export function useAnimationTick(tick: AnimationTick, priority = 0) {
  const ref = useRef(tick)
  useEffect(() => {
    ref.current = tick
  })
  useEffect(() => register((ctx) => ref.current(ctx), priority), [priority])
}
