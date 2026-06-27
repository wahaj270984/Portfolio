/**
 * App shell.
 *
 * Phase-0 placeholder: a minimal layout that verifies Tailwind v4, the `@`
 * alias, and the font pipeline are wired. The persistent <SceneCanvas /> and
 * scroll-driven sections land in later phases (see architecture plan).
 */
export default function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-[var(--text-h)] md:text-7xl">
        Immersive Portfolio
      </h1>
      <p className="max-w-md text-balance text-[var(--text)]">
        Phase&nbsp;0 foundation is live — Tailwind&nbsp;v4, the{' '}
        <code className="font-mono text-[var(--accent)]">@</code> alias, and
        fonts are wired. The 3D experience is next.
      </p>
    </main>
  )
}
