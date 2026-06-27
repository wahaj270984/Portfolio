import { Container } from '@/components/ui/container'

/**
 * The single scroll-driven page. Portfolio sections (Hero, About, Projects,
 * Contact) will be composed here in a later phase; for now it renders a
 * placeholder so the architecture is verifiable end-to-end.
 */
export function HomePage() {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-primary">Phase 1 · architecture</p>
      <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
        Immersive Portfolio
      </h1>
      <p className="max-w-md text-muted-foreground">
        Foundation is live — theme system, routing, error boundaries, loading,
        and a persistent 3D canvas. Sections come next.
      </p>
    </Container>
  )
}
