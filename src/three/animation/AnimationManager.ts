/**
 * Public entry point for the animation system. The registry/hook live in
 * {@link ./manager} and the frame-loop driver in {@link ./AnimationRunner};
 * this barrel re-exports both so consumers import from one place.
 */
export {
  useAnimationTick,
  setAnimationsPaused,
  setAnimationTimeScale,
  runTicks,
  type AnimationTick,
  type AnimationContext,
} from './manager'

export { AnimationRunner } from './AnimationRunner'
