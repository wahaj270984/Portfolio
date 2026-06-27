import { useFrame } from '@react-three/fiber'
import { runTicks } from './manager'

/**
 * Drives every registered animation tick from a single frame loop. Mount once,
 * inside the `<Canvas>`. Renders nothing — it only schedules work.
 */
export function AnimationRunner() {
  useFrame((state, delta) => runTicks(state, delta))
  return null
}
