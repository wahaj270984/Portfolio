import { useGLTF } from '@react-three/drei'

/**
 * Decoder endpoints for compressed glTF assets. Using the hosted gstatic
 * decoders keeps them out of the bundle; swap to self-hosted `/draco/` paths
 * in /public if you need offline / CSP-restricted builds.
 */
export const DRACO_DECODER_PATH =
  'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'

/**
 * Preload a Draco-compressed model so it's warm before its section mounts.
 * Call from a route/section boundary, e.g. `preloadModel(assets.models.hero)`.
 */
export function preloadModel(url: string) {
  useGLTF.preload(url, true)
}
