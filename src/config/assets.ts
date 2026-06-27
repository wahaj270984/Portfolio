/**
 * Asset path helpers + manifest.
 *
 * Files placed in /public/{models,hdri,textures} are served from BASE_URL.
 * Reference them through `asset()` so the app works under any base path.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

/** Central registry of heavy 3D assets (populated as sections are built). */
export const assets = {
  models: {
    // hero: asset('models/hero.glb'),
  },
  hdri: {
    // studio: asset('hdri/studio.hdr'),
  },
  textures: {},
} as const
