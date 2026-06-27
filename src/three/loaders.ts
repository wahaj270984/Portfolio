import { useGLTF } from '@react-three/drei'

/**
 * Decoder endpoints for compressed glTF assets. Using the hosted gstatic
 * decoders keeps them out of the bundle; swap to a self-hosted `/draco/` path
 * in /public if you need offline / CSP-restricted builds.
 */
export const DRACO_DECODER_PATH =
  'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'

/**
 * Load a glTF/glb model with Draco + Meshopt decompression wired in. drei
 * caches by URL, so calling this for the same asset from several components is
 * cheap. Suspends until the model is ready — render under a `<Suspense>`.
 */
export function useModel(url: string) {
  // (path, useDraco, useMeshopt) — passing the decoder path opts Draco in.
  return useGLTF(url, DRACO_DECODER_PATH, true)
}

/**
 * Warm a model into drei's cache before its section mounts so the reveal
 * doesn't stall. Call from a route/section boundary, e.g.
 * `preloadModel(assets.models.hero)`.
 */
export function preloadModel(url: string) {
  useGLTF.preload(url, DRACO_DECODER_PATH, true)
}

/** Drop a model from the cache and free its GPU resources. */
export function disposeModel(url: string) {
  useGLTF.clear(url)
}
