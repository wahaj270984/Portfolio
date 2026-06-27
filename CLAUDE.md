# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check (`tsc -b`) then produce a production build. The build fails on any type error.
- `npm run lint` — run ESLint over the repo.
- `npm run preview` — serve the built `dist/` locally.

No test runner is configured. `tsc -b` (via `npm run build`) is the type-correctness gate; `noUnusedLocals` / `noUnusedParameters` are on, so dead locals/params break the build.

## Toolchain

- **Vite 8** with the Rolldown bundler. **React 19**, **TypeScript 6**.
- **React Compiler is enabled** ([vite.config.ts](vite.config.ts)) via the Rolldown Babel hook — components are auto-memoized. Do not hand-add `useMemo`/`useCallback`/`memo` for memoization that the compiler already provides; reserve them for semantic needs (stable identity across renders).
- **Tailwind CSS v4**, CSS-first — there is no `tailwind.config.js`. Theme tokens and the `dark` variant are declared in [src/styles/globals.css](src/styles/globals.css) with `@theme` / `@custom-variant`.
- Path alias `@/*` → `src/*`, defined in both [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json). Keep them in sync.
- GLSL files are importable as strings via `vite-plugin-glsl`. `.glb`/`.gltf`/`.hdr`/`.exr`/`.ktx2` are treated as assets (hashed + emitted).

## Architecture

This is an immersive, scroll-driven 3D portfolio. The defining structural idea is a **single persistent R3F canvas living behind the DOM**, with DOM content and 3D scene synchronized through a shared Zustand store rather than direct prop-passing.

**Render tree** ([src/App.tsx](src/App.tsx) → [src/app/](src/app/)):
`App` → `AppProviders` (error boundary + theme + tooltip context, plus global side-effect hooks) → `RouterProvider`. Routing is `react-router` with a single `RootLayout` that renders the shared chrome (the 3D canvas, preloader, theme toggle, toaster) around a routed `<Outlet>`.

**The 3D layer** ([src/three/](src/three/)):
[SceneCanvas.tsx](src/three/SceneCanvas.tsx) mounts the one `<Canvas>` for the entire app lifetime — it is never remounted. Section objects are intended to mount *into* this canvas and animate off shared scroll state. DPR/quality is gated off the experience store; `Perf` and adaptive quality helpers are wired in. Subfolders `objects/`, `rig/`, `shaders/` are placeholders for section meshes, camera rig, and GLSL. Compressed-model loading helpers live in [loaders.ts](src/three/loaders.ts) (Draco decoders are loaded from gstatic by default).

**State bridge** ([src/store/](src/store/), Zustand):
- [useExperience.ts](src/store/useExperience.ts) is the contract between the DOM/scroll layer and the scene. Lenis + GSAP ScrollTrigger (planned) write `scrollProgress` / `activeSection`; the camera rig and reveals read them. `quality` and `reducedMotion` gate heavy GPU work. `useR3FHero` is a feature flag for swapping the Spline hero for a native R3F hero in a later phase.
- [useTheme.ts](src/store/useTheme.ts) persists only the user *preference*; the resolved light/dark value is derived at runtime.

**Theming**:
[ThemeProvider](src/app/providers/ThemeProvider.tsx) resolves `light`/`dark`/`system` and writes it to `<html data-theme>`. The CSS token layer in [globals.css](src/styles/globals.css) reads that attribute — utilities like `bg-background` reference CSS vars (not snapshots), so switching is runtime-live. Add new themeable colors by declaring the var in both `:root` and `[data-theme='dark']` and mapping it under `@theme inline`.

**Reduced motion** is sourced once in [useReducedMotion.ts](src/hooks/useReducedMotion.ts) (called in `AppProviders`), mirrored into the experience store, and also enforced via a CSS media query in globals.css. Honor it when adding animations.

## Conventions

- **Config over hardcoding**: site metadata ([src/config/site.ts](src/config/site.ts)), navigation, and the 3D asset manifest ([src/config/assets.ts](src/config/assets.ts)) are centralized. Reference public-folder assets through `asset()` so the app survives a non-root base path.
- UI primitives in [src/components/ui/](src/components/ui/) follow the shadcn/Radix + `cva` + `cn()` ([src/lib/utils.ts](src/lib/utils.ts)) pattern. Section components belong in `src/sections/`.
- The project is built in numbered **phases** (see commit history and the phase notes in code comments, e.g. SceneCanvas / `useR3FHero`). Much of the structure is intentionally scaffolding ahead of the feature work — placeholder meshes and empty `objects/`/`rig/`/`shaders/`/`sections/` dirs are expected, not missing pieces.