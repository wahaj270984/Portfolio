/**
 * Public surface of the 3D layer. The DOM/app side should import from here
 * rather than reaching into subfolders.
 */
export { SceneCanvas } from './SceneCanvas'

// Quality model
export {
  QUALITY_PRESETS,
  QUALITY_ORDER,
  qualitySettings,
  type QualitySettings,
} from './config'

// Animation manager
export {
  AnimationRunner,
  useAnimationTick,
  setAnimationsPaused,
  setAnimationTimeScale,
  type AnimationTick,
  type AnimationContext,
} from './animation/AnimationManager'

// Asset loading
export { useModel, preloadModel, disposeModel, DRACO_DECODER_PATH } from './loaders'

// Scene building blocks (for when sections start composing their own scenes)
export { Scene } from './scene/Scene'
export { CameraRig } from './rig/CameraRig'
export { Lighting } from './lighting/Lighting'
export { SceneEnvironment } from './environment/SceneEnvironment'
export { PostProcessing } from './effects/PostProcessing'
export { PerformanceManager } from './performance/PerformanceManager'
export { HolographicMaterial } from './shaders/holographic/HolographicMaterial'
