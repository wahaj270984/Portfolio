/**
 * Interactive ambient backdrop shared by every content section. Two layers:
 *
 *  1. a faint, theme-aware wireframe grid that slowly drifts — echoing the hero
 *     mesh so the whole page reads as one continuous immersive surface;
 *  2. a cursor-following spotlight (primary + a tighter accent core) that lights
 *     the grid up under the pointer.
 *
 * Pure CSS and `pointer-events-none`: the parent <section> publishes the pointer
 * position as `--mx` / `--my` custom properties (see Section.tsx) and toggles the
 * spotlight via the `group/section` hover state — this layer just reads them, so
 * there are no React re-renders or rAF loops per section. The grid drift is gated
 * behind `motion-safe`, so reduced-motion users get a calm static texture.
 */
export function SectionGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Drifting wireframe grid, faded at the top/bottom edges. */}
      <div className="bg-grid mask-fade-y absolute inset-0 opacity-70 motion-safe:animate-grid-drift" />

      {/* Wide primary spotlight that tracks the cursor. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-primary) 13%, transparent), transparent 65%)',
        }}
      />

      {/* Tighter accent core for depth at the pointer. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          background:
            'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)',
        }}
      />
    </div>
  )
}
